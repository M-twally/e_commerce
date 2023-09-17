import { subcategoryModel } from "../../../../DB/models/subcatogry.model.js";
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

export const add_Subcategory=asyncHandler(
    async(req,res,next)=>{
        const {name}=req.body
        console.log(name)
        req.body.slag=slugify(req.body.name)
        const check=await categoryModel.findById(req.body.category)
        if(!check){
            return next (new Error(`No category to add subcategory for it `,{cause:StatusCodes.CONFLICT}))
        }
        const check2=await subcategoryModel.find({name:name})
        if(check2.length!=0){
            return next (new Error(`this Subcategory is exists `,{cause:StatusCodes.CONFLICT}))
        }
        const Subcategory=new subcategoryModel(req.body)
        await Subcategory.save()
        return res.status(201).json({message:`doone`,Subcategory})
    }
)
export const getAllSubCategories=asyncHandler(async(req,res,next)=>{
    console.log(req.params)
    let filter={}
    if(req.params.categoryId){
        filter={category:req.params.categoryId}
    }
    // const Subcategory=await subcategoryModel.find(filter)
    // return res.status(StatusCodes.OK).json({message:`done`,Subcategory})
    let fauture=new Features(subcategoryModel.find(),req.query).paginate().fields().sort().filter().search()
    let subcategory=await fauture.mongooseQuery
    return res.status(StatusCodes.OK).json({message:`done`,page:fauture.page,subcategory})
})
export const updateSubCategory=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    const{name}=req.body
    console.log({id,name});
    const Subcategory=await subcategoryModel.findByIdAndUpdate(id,{name:name},{new:true})
    if(!Subcategory){
        return next (new Error(`this Subcategory not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,Subcategory})
})
export const deleteSubCategory=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const Subcategory=await subcategoryModel.findByIdAndDelete(id)
    if(!Subcategory){
        return next(new Error(`this Subcategory not found`,{cause:StatusCodes.NOT_FOUND}))
    }
    return res.status(StatusCodes.OK).json({message:`deleted`,Subcategory})
})