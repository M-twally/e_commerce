import { asyncHandler } from "../../../utils/errror.handling.js"; 
import { userModel } from "../../../../DB/models/user.model.js"; 
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { productModel } from "../../../../DB/models/product.model.js";


export const addtowhishlist=asyncHandler(async(req,res,next)=>{
    const{product}=req.body
    const check=await productModel.findOne({title:req.body.product})
    if(!check){
        return next (new Error(`This book not exists `),{cause:StatusCodes.CONFLICT})
    }
    const whish=await userModel.findByIdAndUpdate({_id:req.user._id},{$addToSet:{whishlist:check._id}},{new:true}).populate({
        path:`whishlist`,
        select:` -_id name`
    })
    if(!whish){
        return next (new Error(`already in your whishlist`),{cause:StatusCodes.CONFLICT})
    }
    return res.status(StatusCodes.ACCEPTED).json({message:`MY WHISHLIST `,whish:whish.whishlist})

})
export const removefromWhishList=asyncHandler(async(req,res,next)=>{
    const {product}=req.body
    const check=await productModel.findOne({title:req.body.product})
    if(!check){
        return next (new Error(`This product not exists `),{cause:StatusCodes.CONFLICT})
    }
    const whish=await userModel.findByIdAndUpdate(req.user._id,{$pull:{whishlist:check._id}},{new:true})
    if(!whish){
        return next (new Error(`this whish not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,whish:whish.whishlist})
})
export const getalluserWhishlist=asyncHandler(async(req,res,next)=>{
    const whish=await userModel.findOne({_id:req.user._id}).populate(`whishlist`)
    if(!whish){
        return next (new Error(`this whish not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,whish:whish.whishlist})
})