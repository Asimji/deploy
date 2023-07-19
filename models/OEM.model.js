const mongoose=require("mongoose");

const OEM_Schema=mongoose.Schema({
    model:{
        type:String,
        require:true
    },
    year_of_model:{
        type:Number,
        require:true
    },
    new_model_price:{
        type:Number,
        require:true
    },
    color:{
        type:'array',
        items:String
    },
 mileage:{
    type:Number,
    require:true
 },
 power:{
    type:Number,
    require:true
 },
 max_speed:{
    type:Number,
    require:true
 }
    
},{
    versionKey:false
})

const OEM_Model=mongoose.model("OEM",OEM_Schema)

module.exports=OEM_Model