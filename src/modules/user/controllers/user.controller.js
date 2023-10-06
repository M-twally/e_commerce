import { userModel } from "../../../../DB/models/user.model.js"
import { asyncHandler } from "../../../utils/errror.handling.js"
import bcrypt from "bcrypt"
import crypto from 'crypto'
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';


export const addUser=asyncHandler(
    async(req,res,next)=>{
        const{email}=req.body
        const check = await userModel.findOne({ email })
        if (check) {
            return next(new Error("Email Exists", { cause: StatusCodes.CONFLICT }))
        }
    //req.body.password=bcrypt.hashSync(req.body.password,parseInt(process.env.SALT_ROUND)) 
    const secretKey = 'YourSecretKey'; 
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    req.body.phone = cipher.update(req.body.phone, 'utf8', 'hex');
    req.body.phone += cipher.final('hex');  
        const user=new userModel(req.body)
        await user.save()
        return res.status(201).json({message:`doone`,user})
    }
)
export const getAllUsers=asyncHandler(
    async(req,res,next)=>{
        const user =await userModel.find()
        return res.status(201).json({message:`doone`,user})
    }
)
export const updateuser=asyncHandler(
    async(req,res,next)=>{
        const{id}=req.params
        const user=await userModel.findByIdAndUpdate(id,{new:true})
    if(!user){
        return next (new Error(`this user not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,user})
    }
)
export const changeUserPassword=asyncHandler(
    async(req,res,next)=>{
        const{id}=req.params
        ////////////////////////////////
        // hna h3ml el compaare bta3 el pass //
        ////////////////////////////////////////////////////////////////////
        const user=await userModel.findByIdAndUpdate(id,{password:req.body.password},{new:true})
        user.PasswordChangedAt = new Date(); // Set the PasswordChangedAt field
    await user.save();
    if(!user){
        return next (new Error(`this user not found `,{cause:StatusCodes.NOT_FOUND})) 
    }
    return res.status(StatusCodes.OK).json({message:`doone`,user})
    }
)
export const deleteuser=asyncHandler(
    async(req,res,next)=>{
    const {id}=req.params
    console.log(id)
    const user=await userModel.findByIdAndDelete(id)
    if(!user){
        return next(new Error(`this user not found`,{cause:StatusCodes.NOT_FOUND}))
    }
    return res.status(StatusCodes.OK).json({message:`deleted`,user})
    }
)