require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const router = require('./Routes/user.routes')
const{body}=require('express-validator')
const cors=require('cors')
const User = require('./models/user.models')
const app=express()
app.use(express.json())
app.use(cors())

const validation=[
    body('email').isEmail().withMessage("email is required"),
    body('name').isLength(5).withMessage("name should be minimum of length 5"),
    body('password').isLength(6).withMessage("password should be minimum of length 6"),
    body('email').custom(async(val)=>{
        const user=await User.findOne({email:val})
        if(user){
            throw new Error("user already exists ")
        }
    })
]
async function connectdb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connection is done")
}
connectdb()

app.use("/api/v1/data",validation,router)
console.log("MAIL =", process.env.MAIL);
console.log("PASSI =", process.env.PASSI);
app.listen(process.env.PORT)
