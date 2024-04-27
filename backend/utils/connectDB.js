const mongoose = require('mongoose')
async function connectDB(){
    
    try{
     await mongoose.connect(process.env.DB_URL)
    console.log("Connected to Databse")
    }
    catch(e)
    {
        console.log("Unable to connect to database")
        process.exit(1)
    }
}
module.exports={connectDB}