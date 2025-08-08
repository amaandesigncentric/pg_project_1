import mongoose from "mongoose";

const placticCapSchema =  new mongoose.Schema({
    ITEMCODE:{
        type:String,
        required:true,
        unique:true
    },
    ITEMNAME:{
        type:String
    },
    available_stock:{
        type:Number
    }
})

export const plasticCapModel = mongoose.model('plasticCap', placticCapSchema);