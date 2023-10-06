import mongoose, { Schema, model } from "mongoose";

const orderSchema=new Schema({
    user:{
        type:mongoose.Types.ObjectId,ref:`user`
    },
    cartitems:[{
        product:{type:mongoose.Types.ObjectId,ref:`product`},
        quantity:{
            type:Number,
    },
        price:Number,
    }],
    totalorderprice:Number,
    
    paymentmethod:{
        type:String,
        enum:[`cash`,`card`],
        default:`cash`
    },
    shippingAddress:{
        street:String,
        city:String,
        phone:String,
        
    },
    isPayed:{
        type:Boolean,
        default:false
    },
    paidAt:Date,
    isDeleivered:{
        type:Boolean,
        default:false,
    },
    deleiveredAt:{
        type:Date,
    }




},{ timestamps:true,})
export const orderModel=model(`order`,orderSchema)