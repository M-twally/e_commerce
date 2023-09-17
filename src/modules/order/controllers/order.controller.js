import { asyncHandler } from "../../../utils/errror.handling.js";
import { cartModel } from "../../../../DB/models/cart.model.js";
import { orderModel } from "../../../../DB/models/order.model.js"
import { productModel } from "../../../../DB/models/product.model.js";
import Stripe from 'stripe';
import dotenv from "dotenv"
dotenv.config()
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
const stripe = new Stripe(process.env.STRIPE_KEY);

export const createCashOrder=asyncHandler(async (req,res,next)=>{
    const cart=await cartModel.findById(req.params.id)
    if (!cart) {
        return next(new Error(`Cart not found`, { cause: StatusCodes.NOT_FOUND }));
      }
    const orderTotalprice=cart.totalpriceAfterDiscount?
    cart.totalpriceAfterDiscount:cart.totalprice
    const order=new orderModel({
        user:req.user.id,
        cartitems:cart.cartitems,
        orderTotalprice,
        shippingAddress:req.body.shippingAddress,
    })
    await order.save()
    console.log(order.shippingAddress)
  if(!order){
    return next (new Error(`No order  `),{cause:StatusCodes.NOT_FOUND})

  }
  let options =cart.cartitems.map(item=>({
    updateOne:{
        filter:{ _id:item.product },
        update:{$inc:{quantatity:-item.quantity,sold:item.quantity}}
    }
    }))
        await productModel.bulkWrite(options)
        await cartModel.findByIdAndDelete(req.params.id)
        return res.status(201).json({message:`dooone`,order})

})
export const getspecificorder=asyncHandler(async (req,res,next)=>{
    const order=await orderModel.findOne({user:req.user._id}).populate(`cartitems.product`)
    console.log( order.user );
    if(!order){
        return next (new Error(`No order found`),{cause:StatusCodes.NOT_FOUND})
    }
    return res.status(201).json({message:`dooone`,order})
})
export const getallorders = asyncHandler(async (req, res, next) => {
    const orders = await orderModel.find().populate(`cartitems.product`);
     
    if (!orders) {
      return next(new Error(`No order found`), { cause: StatusCodes.NOT_FOUND });
    }
    return res.status(201).json({ message: `dooone`, orders });
  });
export const createcheckoutsession=asyncHandler(async(req,res,next)=>{
    const cart=await cartModel.findById(req.params.id)
    if (!cart) {
        return next(new Error(`Cart not found`, { cause: StatusCodes.NOT_FOUND }));
      }
    const orderTotalprice=cart.totalpriceAfterDiscount?
    cart.totalpriceAfterDiscount:cart.totalprice 
    const session=await stripe.checkout.sessions.create({
        line_items:[
            {
                price_data:{
                    currency:`egp`,
                    unit_amount: orderTotalprice *100,
                    product_data:{
                    name:req.user.name,

                    }
                },
                quantity: 1
            }
        ],
        mode:`payment`,
        success_url: `https://github.com/`,
        cancel_url:`http://193.227.14.58/#/`,
        customer_email:req.user.email,
        client_reference_id:req.params.id,
        metadata:req.body.shippingAddress

    })
    return res.status(201).json({message:`success`,session})
})