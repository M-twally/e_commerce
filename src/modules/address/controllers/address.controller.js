import { asyncHandler } from "../../../utils/errror.handling.js"; 
import { userModel } from "../../../../DB/models/user.model.js"; 
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
export const addAddress=asyncHandler(async(req,res,next)=>{
    const addressy=await userModel.findByIdAndUpdate(req.user._id,{$addToSet:{address:req.body}},{new:true})
    if(!addressy){
        return next (new Error(`this user not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,addressy:addressy.address})
})

export const removeaddress=asyncHandler(async(req,res,next)=>{
    const address=await userModel.findByIdAndUpdate(req.user._id,{$pull:{address:{_id:req.body.address}}},{new:true})
    if(!address){
        return next (new Error(`this address not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,address:address.address})
})
export const getalluseraddresslist=asyncHandler(async(req,res,next)=>{
    const addressy=await userModel.findOne({_id:req.user._id})
    if(!addressy){
        return next (new Error(`this address not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,address:addressy.address})
})