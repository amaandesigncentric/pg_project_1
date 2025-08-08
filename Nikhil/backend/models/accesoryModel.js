import mongoose from "mongoose";

const accessorySchema =  new mongoose.Schema({
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

export const AccessoryModel = mongoose.model('accessoryData', accessorySchema);