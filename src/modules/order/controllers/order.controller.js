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
    const cart=await cartModel.findOne({_id:req.params.id})
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
export const createonlineorder=asyncHandler(async(request, response) => {
    const sig = request.headers['stripe-signature'].toString();
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, process.env.SIGSECRET);
    } catch (err) {
        return response.status(400).send(`Webhook Error: ${err.message}`);
      ;
    }
  
    // Handle the event
    if(event.type== 'checkout.session.completed'){
        const checkoutSessionCompleted = event.data.object;
        console.log(`create order hereee ...........`)
        cash(event.data.object)
    }else{
        console.log(`Unhandled event type ${event.type}`);
    }
    
})

 async function cash(e){
    // 1)get cart 
    const cart=await cartModel.findById(e.client_reference_id)
    if (!cart) {
        return next(new Error(`Cart not found`, { cause: StatusCodes.NOT_FOUND }));
      }
      let user=await userModel.findOne({email:e.email})
      if(!user){
        return next(new Error(`email not found`, { cause: StatusCodes.NOT_FOUND }));
      }
      // 2)create order
    const order=new orderModel({
        user:user.id,
        cartitems:cart.cartitems,
        orderTotalprice:e.amount_total/100,
        shippingAddress:e.metadata.shippingAddress,
        paymentmethod:`cash`,
        isPayed:true,
        paidAt:Date.now()
        
    })
    await order.save()
    console.log(order.shippingAddress)
  if(!order){
    return next (new Error(`No order  `),{cause:StatusCodes.NOT_FOUND})

  }
  // 3)decrement quantity product and increment sold
  let options =cart.cartitems.map(item=>({
    updateOne:{
        filter:{ _id:item.product },
        update:{$inc:{quantatity:-item.quantity,sold:item.quantity}}
    }
    }))
        await productModel.bulkWrite(options)
        await cartModel.findOneAndDelete({user:user._id})
        return res.status(201).json({message:`dooone`,order})
}