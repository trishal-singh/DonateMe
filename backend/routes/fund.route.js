const express =require('express')
const router = express.Router()
const fundController= require("../controllers/fund.controller")

router.post("/add",fundController.addFund)




module.exports=router