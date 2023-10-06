import {couponModel} from "../../../../DB/models/coupon.model.js"
import { asyncHandler } from "../../../utils/errror.handling.js";
import {Features} from "../../../utils/features.js"
import qrcode from "qrcode"
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export const createcoupon=asyncHandler(
    async(req,res,next)=>{
        const coupon=await couponModel(req.body)
        await coupon.save()
        return res.status(201).json({message:`doone`,coupon})
    }
)

export const getAllcoupon=asyncHandler(async(req,res,next)=>{
    let fauture=new Features(couponModel.find(),req.query).paginate().fields().sort().filter().search()
    let coupon=await fauture.mongooseQuery
    
    return res.status(StatusCodes.OK).json({message:`done`,page:fauture.page,coupon})
})

export const updatecode=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const coupon=await couponModel.findOneAndUpdate({_id:id},req.body,{new:true})
    if(!coupon){
        return next (new Error(`this coupon not found or not authorized`,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,coupon})
})

export const deletecoupon=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const coupon=await couponModel.findByIdAndDelete(id)
    if(!coupon){
        return next(new Error(`this coupon not found`,{cause:StatusCodes.NOT_FOUND}))
    }
    return res.status(StatusCodes.OK).json({message:`deleted`,coupon})
})

export const getcouponbyId=asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const coupon=await couponModel.findById(id)
    let url=await qrcode.toDataURL(coupon.code)
    if(!coupon){
        return next (new Error(`canot find `),{cause:StatusCodes.NOT_FOUND})
    }
    return res.status(StatusCodes.OK).json({message:`donne`,coupon,url})
})