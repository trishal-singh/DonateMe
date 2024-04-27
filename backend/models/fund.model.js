const mongoose = require('mongoose')
const fundSchema = mongoose.Schema({
   title:{
     type : String,
     required : true
   },
   image:{
    type : String,
    required : true
   },
   description:{
    type : String,
    required : true
   },
   current:{
    type : Number,
    required : true
   },
   target:{
    type : Number,
    required : true
   },
   owner:{
    type : mongoose.Schema.Types.ObjectId,
    ref: "users",
    required : true
   },
   status:{
    type : String,
    required : true
   },
})
module.exports = mongoose.model('funds' , fundSchema )