const mongoose = require('mongoose')
const donationSchema = mongoose.Schema({
   amount:{
    type : Number,
    required : true
   },
   user_id:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "users",
    required: true
   },
   fund_id:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "funds",
    required : true
   }
   
})
module.exports = mongoose.model('donations' , donationSchema )