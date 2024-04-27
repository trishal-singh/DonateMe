const User=require("../models/user.model.js")
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

const registerUser =  async (req,res)=>{
    try{
    const { username, password } = req.body
    const user= await User.findOne({username})
    if(user)
    return res.json({status:"Not Registered",message:"User Already Exists"})
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword, balance:10000,raised:0})
    await newUser.save() 
    res.json({status:"Registered",message:"User Registered Successfully",username:username})
    }
    catch(err)
    {
    console.log(err)
    res.json({status:"Not Registered",message:"Unable to register"})
    }
}
const loginUser = async (req,res)=>{
    try{
    const {username,password}=req.body
    const exists= await User.findOne({username})
    if(!exists)
    return res.json({status:"Not Logged In",message:"Wrong Username"})
    const correctPassword = await bcrypt.compare(password,exists.password)
    if(!correctPassword)
    return res.json({status:"Not Logged In",message:"Wrong Password"})
    const token = jwt.sign({userId : exists._id} , process.env.jwt_secret , {expiresIn :"1d"})
    res.json({status:"Logged In",token:token})
    }
    catch(e){
      console.log(e)
    }

}
module.exports={registerUser,loginUser}