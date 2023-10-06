import {categoryModel} from "../../../../DB/models/category.model.js"
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
import { Types } from 'mongoose'

export const add_category=asyncHandler(
    async(req,res,next)=>{
        const {name}=req.body
        console.log(req.file)
       req.body.image=req.file.filename
        req.body.slag=slugify(req.body.name)
        const check=await categoryModel.find({name:name})
        if(check.length!=0){
            return next (new Error(`this category is exists `,{cause:StatusCodes.CONFLICT}))
        }
        const category=new categoryModel(req.body)
        await category.save()
        return res.status(201).json({message:`doone`,category})
    }
)
export const getAllCategories=asyncHandler(async(req,res,next)=>{
    let fauture=new Features(categoryModel.find(),req.query).paginate().fields().sort().filter().search()
    let category=await fauture.mongooseQuery
    
    return res.status(StatusCodes.OK).json({message:`done`,page:fauture.page,category})
})
export const updateCategories=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const{name}=req.body
    console.log({id,name});
    console.log(Types.ObjectId.isValid(id))
    const category=await categoryModel.findOneAndUpdate({_id:id},{name:name},{new:true})
    if(!category){
        return next (new Error(`this category not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,category})
})
export const deleteCategories=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const category=await categoryModel.findByIdAndDelete(id)
    if(!category){
        return next(new Error(`this category not found`,{cause:StatusCodes.NOT_FOUND}))
    }
    return res.status(StatusCodes.OK).json({message:`deleted`,category})
})
export const get_categoryBYId=asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const category=await productModel.findById(id)
    if(!category){
        return next (new Error(`canot find `),{cause:StatusCodes.NOT_FOUND})
    }
    return res.status(StatusCodes.OK).json(`donne`,category)
})