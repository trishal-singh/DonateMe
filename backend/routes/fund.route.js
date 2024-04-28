const express =require('express')
const router = express.Router()
const fundController= require("../controllers/fund.controller")

router.post("/add",fundController.addFund)
router.get("/",fundController.getFund)




module.exports=router