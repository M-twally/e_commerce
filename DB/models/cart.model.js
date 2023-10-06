import mongoose, { Schema, model } from "mongoose";

const cartSchema=new Schema({
    user:{
        type:mongoose.Types.ObjectId,ref:`user`
    },
    cartitems:[{
        product:{type:mongoose.Types.ObjectId,ref:`product`},
        quantity:{type:Number,
        default:1,
    },
        price:Number,
        totalproductDiscount:Number,
    }],
    totalprice:Number,
    totalpriceAfterDiscount:Number,
    discount:Number,




},{ timestamps:true,})
export const cartModel=model(`cart`,cartSchema)