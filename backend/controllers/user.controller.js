const User=require("../models/user.model.js")
const bcrypt = require('bcrypt')

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
module.exports={registerUser}