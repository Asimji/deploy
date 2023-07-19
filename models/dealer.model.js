const mongoose=require("mongoose")

const dealerSchema=mongoose.Schema({
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
 },

    kms_on_odometer:Number,
    major_scratches:Number,
    original_paint:String,
    no_of_accident_reported:Number,
  no_of_previous_buyers:Number,
  registration_place:String,
  image:String,
  title:String,
  description:String,
  dealerId:String,
  dealerName:String

},{
    versionKey:false
})

const dealerModel=mongoose.model("Car_Dealer",dealerSchema)

module.exports=dealerModel