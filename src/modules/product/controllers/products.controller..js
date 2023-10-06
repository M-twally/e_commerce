import {productModel} from "../../../../DB/models/product.model.js"
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

export const add_product=asyncHandler(
    async(req,res,next)=>{
        req.body. imgcover=req.files. imgcover[0].filename
        req.body.images=req.files.images.map((elm)=>{
            return elm.filename
        })
        console.log(req.body.imgcover,req.body.images)
       req.body.slug=slugify(req.body.title)
        const check=await productModel.find({title:req.body.title})
        if(check.length!=0){
            return next (new Error(`this product is exists `,{cause:StatusCodes.CONFLICT}))
        }
        const product=new productModel(req.body)
        await product.save()
        return res.status(201).json({message:`doone`,product})
    }
)
export const getAllproducts=asyncHandler(async(req,res,next)=>{
    let fauture=new Features(productModel.find(),req.query).paginate().fields().sort().filter().search()
    let product=await fauture.mongooseQuery
    
    return res.status(StatusCodes.OK).json({message:`done`,page:fauture.page,product})
})
export const updateproducts=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    if(req.body.title){
    req.body.slug=slugify(req.body.title)}
    const product=await productModel.findByIdAndUpdate(id,req.body,{new:true})
    if(!product){
        return next (new Error(`this product not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,product})
})
export const deleteproducts=asyncHandler(async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const product=await productModel.findByIdAndDelete(id)
    if(!product){
        return next(new Error(`this product not found`,{cause:StatusCodes.NOT_FOUND}))
    }
    return res.status(StatusCodes.OK).json({message:`deleted`,product})
})
export const get_productBYId=asyncHandler(async(req,res,next)=>{
    const{id}=req.params
    const product=await productModel.findById(id)
    if(!product){
        return next (new Error(`canot find `),{cause:StatusCodes.NOT_FOUND})
    }
    return res.status(StatusCodes.OK).json(`donne`,product)
})