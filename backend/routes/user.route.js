const express=require("express")
const userController = require("../controllers/user.controller.js")
const router=express.Router()

router.post("/register",userController.registerUser)


module.exports=router