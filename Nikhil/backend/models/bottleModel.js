import mongoose from "mongoose";

const bottleSchema =  new mongoose.Schema({
    CO_ITEM_NUM:{
        type:Number,
        unique:true
    },
    FORMULA:{
        type:String
    },
    capacity:{
        type:String
    },
    NECK_DIAM:{
        type:String
    },
    available_stock:{
        type:Number
    }
})

export const bottleModel = mongoose.model('bottleData', bottleSchema);