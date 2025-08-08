import mongoose from "mongoose";

const alluminiumCapSchema =  new mongoose.Schema({
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

export const AlluminiumModel = mongoose.model('alluminiumCapData', alluminiumCapSchema);