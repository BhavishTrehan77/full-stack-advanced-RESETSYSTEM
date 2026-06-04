const express=require('express')
const { Getdata, Postdata, Patchdata, Deletedata, signup, login, reset, forget, resetPassword } = require('../Controllers/user.controllers')
const router=express.Router()

router.get("/",Getdata)
router.post("/",Postdata)
router.patch("/:id",Patchdata)
router.delete("/:id",Deletedata)
router.post("/signup",signup)
router.post("/login",login)
router.post("/reset",reset)
router.post("/forget",forget)
router.post("/reset/:token",resetPassword)



module.exports=router
