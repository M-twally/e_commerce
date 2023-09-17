import { asyncHandler } from "../../../utils/errror.handling.js"; 
import { userModel } from "../../../../DB/models/user.model.js"; 
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export const addtoWhishList=asyncHandler(async(req,res,next)=>{
    const {product}=req.body
    const whish=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{whishlist:product}},{new:true})
    if(!whish){
        return next (new Error(`this whish not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,whish:whish.whishlist})
})

export const removefromWhishList=asyncHandler(async(req,res,next)=>{
    const {product}=req.body
    const whish=await userModel.findByIdAndUpdate(req.user._id,{$pull:{whishlist:product}},{new:true})
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