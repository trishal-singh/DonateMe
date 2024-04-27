const express= require('express')
const app= express()
const cors = require('cors')
const { connectDB } = require('./utils/connectDB')
app.use(express.json())
app.use(cors())
require('dotenv').config()

connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Server is running")
    })
})
