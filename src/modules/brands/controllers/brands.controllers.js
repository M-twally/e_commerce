import { brandModel } from "../../../../DB/models/brands.model.js";
import slugify from "slugify";
import { asyncHandler } from "../../../utils/errror.handling.js";
import { AppError } from "../../../utils/app.error.js";
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import { Features } from "../../../utils/features.js";

export const add_Brand=asyncHandler(
    async(req,res,next)=>{
        const {name}=req.body
        console.log(name)
        req.body.slag=slugify(req.body.name)
        const check=await brandModel.find({name:name})
        if(check.length!=0){
            return next (new Error(`this brand is exists `,{cause:StatusCodes.CONFLICT}))
        }
        const brand=new brandModel(req.body)
        await brand.save()
        return res.status(201).json({message:`doone`,brand})
    }
)
export const getAllBrands=asyncHandler(async(req,res,next)=>{
    let fauture=new Features(brandModel.find(),req.query).paginate().fields().sort().filter().search()
    let brand=await fauture.mongooseQuery
    
    return res.status(StatusCodes.OK).json({message:`done`,page:fauture.page,brand})
})
export const updateBrand=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const{name}=req.body
    console.log({id,name});
    const brand=await brandModel.findByIdAndUpdate(id,{name:name},{new:true})
    if(!brand){
        return next (new Error(`this brand not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,brand})
})
export const deleteBrand=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const brand=await brandModel.findByIdAndDelete(id)
    if(!brand){
        return next(new Error(`this brand not found`,{cause:StatusCodes.NOT_FOUND}))
    }
    return res.status(StatusCodes.OK).json({message:`deleted`,brand})
})