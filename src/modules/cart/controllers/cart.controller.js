import { cartModel } from "../../../../DB/models/cart.model.js";
import {couponModel} from "../../../../DB/models/coupon.model.js"
import { productModel } from "../../../../DB/models/product.model.js";
import { asyncHandler } from "../../../utils/errror.handling.js";
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import {Features} from "../../../utils/features.js"
function calctotalprice(cart){
    let totalprice=0
    cart.cartitems.forEach(elm=>{
        totalprice+=elm.quantity*elm.price
    })
    cart.totalprice=totalprice
}

export const addtoCart=asyncHandler(
    async(req,res,next)=>{
        const{product}=req.body
        console.log(product)
        let productExist=await productModel.findById({_id:req.body.product}).select(`price`)
        if(!productExist){
            return next (new Error(`this product not found `),{cause:404})
        }
        req.body.price=productExist.price
       const ExistCart=await cartModel.findOne({user:req.user._id})
       if(!ExistCart){
        const cart=new cartModel({
            user:req.user._id,
            cartitems:[req.body],

        })
       calctotalprice(cart)
        await cart.save()
        return res.status(201).json({message:`success`,cart})
    }
    let item=ExistCart.cartitems.find(elm=>elm.product==req.body.product)
    if(item){
        item.quantity+=req.body.quantity || 1
    }else{
        ExistCart.cartitems.push(req.body)
    }
    calctotalprice(ExistCart)
    if(ExistCart.discount){
    ExistCart.totalpriceAfterDiscount=ExistCart.totalprice-(ExistCart.totalprice*ExistCart.discount)/100
    }
    await ExistCart.save()
    return res.status(201).json({message:`add to cart`,cart:ExistCart})
    }
)

export const removeproductfromCart=asyncHandler(async(req,res,next)=>{
    console.log(req.user)
    const{id}=req.params
    console.log(id)
    const remove=await cartModel.findOneAndUpdate({user:req.user._id},{$pull:{cartitems:{_id:req.params.id}}},{new:true})
    if(!remove){
        return next (new Error(`this item not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    calctotalprice(remove)
    if(remove.discount){
        remove.totalpriceAfterDiscount=remove.totalprice-(remove.totalprice*remove.discount)/100
        }
    return res.status(StatusCodes.OK).json({message:`doone`,remove})
})

export const updateQuantity=asyncHandler(async(req,res,next)=>{
    let productExist=await productModel.findById(req.params.id).select(`price`)
        if(!productExist){
            return next (new Error(`this product not found `),{cause:404})
        }
        const ExistCart=await cartModel.findOne({user:req.user._id})
        let item=ExistCart.cartitems.find(elm=>elm.product==req.params.id)
        if(item){
        item.quantity=req.body.quantity 
        }
        calctotalprice(ExistCart)
        if(ExistCart.discount){
            ExistCart.totalpriceAfterDiscount=ExistCart.totalprice-(ExistCart.totalprice*ExistCart.discount)/100
            }
        await ExistCart.save()
    return res.status(201).json({message:` updatd success`,cart:ExistCart})
    

})

export const applyCoupon=asyncHandler(async(req,res,next)=>{
    let coupon= await couponModel.findOne({code:req.body.code,expires :{$gt:Date.now()}})
    let cart=await cartModel.findOne({user:req.user._id})
    calctotalprice(cart)
    cart.totalpriceAfterDiscount=cart.totalprice - (cart.totalprice * coupon.discount) / 100
    cart.discount=parseFloat(coupon.discount)
    await cart.save()
    return res.status(201).json({message:` coupon successufully applied`,cart})
})
export const getuserloggedCart=asyncHandler(async(req,res,next)=>{
    let cartitem=await cartModel.findOne({user:req.user._id}).populate(`cartitems.product`)
    if(!cartitem){
        return next (new Error(`this cart not found `),{cause:404})
    }
    calctotalprice(cartitem)
    return res.status(201).json({message:` your cart`,cartitem})
})