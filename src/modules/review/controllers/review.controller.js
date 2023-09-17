import { reviewModel } from "../../../../DB/models/review.model.js";
import { asyncHandler } from "../../../utils/errror.handling.js";
import {Features} from "../../../utils/features.js"
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

export const addreview=asyncHandler(
    async(req,res,next)=>{
        req.body.user=req.user._id
        let isreview=await reviewModel.findOne({user:req.user._id},{product:req.body.product})
        if(isreview){
            return next (new Error(`sorry you made review before `,{cause:StatusCodes.CONFLICT}))
        }
        const review=await reviewModel(req.body)
        await review.save()
        return res.status(201).json({message:`doone`,review})
    }
)

export const getAllreviews=asyncHandler(async(req,res,next)=>{
    let fauture=new Features(reviewModel.find(),req.query).paginate().fields().sort().filter().search()
    let reviews=await fauture.mongooseQuery
    
    return res.status(StatusCodes.OK).json({message:`done`,page:fauture.page,reviews})
})

export const get_reviewBYId=asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const review=await reviewModel.findById(id)
    if(!review){
        return next (new Error(`canot find `),{cause:StatusCodes.NOT_FOUND})
    }
    return res.status(StatusCodes.OK).json({message:`donne`,review})
})

export const deletereviews=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const review=await reviewModel.findByIdAndDelete(id)
    if(!review){
        return next(new Error(`this review not found`,{cause:StatusCodes.NOT_FOUND}))
    }
    return res.status(StatusCodes.OK).json({message:`deleted`,review})
})

export const updateReviews=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const review=await reviewModel.findOneAndUpdate({_id:id,user:req.user._id},req.body,{new:true})
    if(!review){
        return next (new Error(`this review not found or not authorized`,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,review})
})