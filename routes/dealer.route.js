const express=require("express")
const dealerAuth = require("../middleware/dealerAuth.middleware")
const auth = require("../middleware/auth.middleware")
const dealerModel = require("../models/Dealer.model")

const dealerRouter=express.Router()


dealerRouter.get("/product",auth,async(req,res)=>{
    try {
        let products=await dealerModel.find();
        res.status(200).json({products})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


dealerRouter.use(dealerAuth)

dealerRouter.post("/dealer/post",async(req,res)=>{
    try {
        const data=new dealerModel(req.body)
        await  data.save()
        res.status(200).json({data,msg:"Data Added Successfully"})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

dealerRouter.patch("/dealer/update/:id",async(req,res)=>{
   const {id}=req.params
   const dealerUserId=req.body.dealerId;
   try {
    const product=await dealerModel.findOne({_id:id});
    if(dealerUserId===product.dealerId){
        await dealerModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).json({msg:`${product.dealerName} data Updated Successfully`})
    }
   } catch (error) {
    res.status(400).json({error:error.message})
   }
})
dealerRouter.delete("/dealer/delete/:id",async(req,res)=>{
    const {id}=req.params
    const dealerUserId=req.body.dealerId;
    try {
     const product=await dealerModel.findOne({_id:id});
     if(dealerUserId===product.dealerId){
         await dealerModel.findByIdAndDelete({_id:id})
         res.status(200).json({msg:`${product.dealerName} data Deleted Successfully`})
     }
    } catch (error) {
     res.status(400).json({error:error.message})
    }
 })


module.exports=dealerRouter