const express=require("express");
const OEM_auth = require("../middleware/OEM_auth.middleware");
const OEM_Model = require("../models/OEM.model");
const OEM_Dealer_auth = require("../middleware/OEM_Dealer_auth.middleware");

const OEM_Router=express.Router();


OEM_Router.get("/original",OEM_Dealer_auth,async(req,res)=>{
    try {
        const OEM=await OEM_Model.find()
   
        res.status(200).json({OEM})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


OEM_Router.post("/original/add",OEM_auth,async(req,res)=>{
    try {
      let OEM=new OEM_Model(req.body)
      await OEM.save()
        res.status(200).json({OEM})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})


module.exports=OEM_Router