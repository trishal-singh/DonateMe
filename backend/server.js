const express= require('express')
const app= express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
require('dotenv').config()


app.listen(process.env.PORT,()=>{
    console.log("Server is running")
})