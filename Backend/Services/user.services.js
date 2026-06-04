const User = require("../models/user.models")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const Transporter = require("../utility/Email")
const Getingdata=async()=>{
    return await User.find({})
}
const Postingdata=async(data)=>{
    return await User.create(data)
}
const Patchingdata=async(id,data)=>{
    if(data.password){
        data.password=await bcrypt.hash(data.password,10)
    }
    return await User.findByIdAndUpdate(id,data,{new:true})
}
const Deletingdata=async(id)=>{
    return await User.findByIdAndDelete(id)
}
const Signup=async(data)=>{
    return await User.create(data)
}
const Login=async(email,password)=>{
    const user=await User.findOne({email})
    if(!user){
        return resp.json({
            success:false,
            message:"user not found"
        })
    }
    const isMatch=await bcrypt.hash(password,user.password)
    if(!isMatch){
        return resp.json({
            success:false,
             message:"password diddnt match"
        })
    }
    const AccessToken=jwt.sign({id:user._id,role:user.role},process.env.ACC_KEY,{expiresIn:"15s"})
    const RefreshToken=jwt.sign({id:user._id,role:user.role},process.env.SEC_KEY,{expiresIn:"3d"})

    return {
        user,RefreshToken,AccessToken
    }

}
const Forgot=async(email)=>{
    const user=await User.findOne({email})
    if(!user){
        throw new Error("user nhi mila bhai")
    }
    
    const resetToken=crypto.randomBytes(32).toString('hex')
    const resetLink=`http://localhost:5173/reset-password/${resetToken}`
    const hashedToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    await Transporter.sendMail({
       from:process.env.MAIL,
       to:user.email,
       text:`you should reset your password by clicking on this link ${resetLink}`

    })
    user.resetPasswordToken=hashedToken
    user.resetPasswordExpire=Date.now()+1000*60*60
   console.log("Reset Token:", resetToken)
console.log("Hashed Saved:", hashedToken)
    await user.save()
    return{
        resetToken,hashedToken
    }
    
}
const reset=async(req)=>{
    console.log("req.params.token =", req.params.token);
    const{newPassword}=req.body
    if(!newPassword){
        throw new Error("enter your newPassword you want to have here")
    }
     const hashedToken=crypto.createHash('sha256').update(req.params.token).digest('hex')
    if(!hashedToken){
        throw new Error("hashedToken not found")
    }
    console.log("Hashed Token:", hashedToken)
    const user=await User.findOne({
        resetPasswordToken:hashedToken,
    })
    console.log(user)
    if(!user){
        throw new Error("user not found")
    }
   
    user.password=newPassword
    user.resetPasswordToken=null
    user.resetPasswordExpire=null
    await user.save()
    return{
        message:"reset is successfully done"
    }
}

module.exports={
    Getingdata,
    Postingdata,
    Patchingdata,
    Deletingdata,
    Signup,
    Login,
    Forgot,
    reset
}