import { Schema,model } from "mongoose";
const couponschema=new Schema({
    code:{
        type:String,
        required:true,
        trim:true,

    },
    expires:{
        type:Date,
        required:true,
    },
    discount:{
        type:String,
        required:true,
        min:0,
        
    }
},{
    timestamps:true,
})

export const couponModel=model(`coupon`,couponschema)