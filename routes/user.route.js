const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const userModel = require("../models/user.model");
const blacklist = require("../blacklist");
require("dotenv").config()

const userRouter=express.Router();

userRouter.post("/signup",async(req,res)=>{

    const {email,password,role,name}=req.body;
    const existedUser=await userModel.findOne({email})
        if(existedUser){
            console.log(email)
            res.status(200).json({msg:"user already exist please login !!"})
        }
        else{
            try {
                bcrypt.hash(password, 3,async function(err, hash) {
                    // Store hash in your password DB.
                    if(hash){
                        const user=new userModel({email,password:hash,role,name});
                        await user.save()
                        res.status(200).json({user:req.body,msg:'Successfully Registered'})
                    }
                    else{
                        res.status(200).json({error:err.message})
                    }
                });
            } catch (error) {
                res.status(400).json({error:error.message})
            }
         
        }
   

})

userRouter.post("/signin",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email})
    try {
        bcrypt.compare(password, user.password,async function(err, result) {
            // result == true
            if(result){
                var token = jwt.sign({ user }, process.env.secretKey);
                res.status(200).json({msg:"Successfully Login",token})
            }
            else{
                res.status(200).json({msg:"Incorrect Password"})
            }
        });
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

userRouter.get("/logout",async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try {
            if(token){
            if(blacklist.includes(token)){
                res.status(200).json({msg:"You are Not Login"})
            }
            else{
                blacklist.push(token);
                res.status(200).json({msg:"Logout Successfully"})
            }
        }
        else{
            res.status(401).json({msg:"Unauthorised"})
        }
        } catch (error) {
            res.status(400).json({error:error.message})
        }
    
})

module.exports=userRouter