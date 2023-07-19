const blacklist = require("../blacklist");
const jwt=require("jsonwebtoken")

require("dotenv").config()

const OEM_Dealer_auth=async (req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];
    
    if(token){
        try {
            if(blacklist.includes(token)){
                res.status(200).json({msg:"You are Not Login"})
            }
            else{
                var decoded = jwt.verify(token, process.env.secretKey);
                
            if(decoded.user.role==='OEM' || decoded.user.role==="Car_Dealer"){
                next()
            }
            else{
                res.status(200).json({msg:"You are not OEM"})
            }
            }

        } catch (error) {
            res.status(400).json({error:error.message})
        }
    }
    else{
        res.status(401).json({msg:"Unauthorised"})
    }

}
module.exports=OEM_Dealer_auth