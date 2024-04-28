const Fund=require("../models/fund.model")

const addFund = async (req,res)=>{
    try{
    const {title,image,description,target,user_id}=req.body
    const status="Ongoing"
    const current=0
    const newFund= new Fund({title,image,description,target,owner:user_id,status,current})
    await newFund.save()
    res.json({"message":"New Fund Added"})
    }
    catch(e){
        res.json({"message":"Fund not added"})
    }
}





module.exports={addFund}