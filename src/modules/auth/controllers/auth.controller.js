import { userModel } from "../../../../DB/models/user.model.js"
import { asyncHandler } from "../../../utils/errror.handling.js"
import {
    NOT_FOUND,
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const signUp=asyncHandler(
    async(req,res,next)=>{
        const check=await userModel.findOne({email:req.body.email})
        console.log(check)
        if (check) {
            return next(new Error("Email Exists", { cause: StatusCodes.CONFLICT }))
        }
        const user=new userModel(req.body)
        await user.save()
        const token=jwt.sign({id:user._id,email:user.email,name:user.name,role:user.role},process.env.TOKEN_SIGNATURE)
        return res.status(StatusCodes.CREATED).json({ message: "Done", user,token })

    }
)

export const signIn=asyncHandler(
    async(req,res,next)=>{
        const{email,password}=req.body
        console.log(req.body)
        const user=await userModel.findOne({email:req.body.email})
        if (user&&bcrypt.compareSync(password,user.password)) {
         const token=jwt.sign({id:user._id,email:user.email,name:user.name,role:user.role},process.env.TOKEN_SIGNATURE)
        return res.status(StatusCodes.CREATED).json({ message: "Done", user,token })
        }else{
            return next(new Error("incorrect email or password", { cause: StatusCodes.CONFLICT }))
        }

    }
)