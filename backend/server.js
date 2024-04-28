const express= require('express')
const app= express()
const cors = require('cors')
const { connectDB } = require('./utils/connectDB')
const userRouter=require('./routes/user.route.js')
const fundRouter=require('./routes/fund.route.js')

app.use(express.json())
app.use(cors())
require('dotenv').config()

app.use("/user",userRouter)
app.use("/fund",fundRouter)


connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is running")
    })
})
