import joi from 'joi'
import { Types } from 'mongoose'
const reqMethods = ['body','query','headers','file','files',`params`]

export const generalFields={
    email: joi.string().email({
    minDomainSegments:2,
    maxDomainSegments:4,
    tlds: { allow: ['com', 'net', 'org'] } })
    .required(),
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    id:joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
                return true
        }else {
            return helper.message(`invalid id`)
        }
    }).required(),
    name:joi.string().min(3).max(30).required(),
    file:joi.object({
        size:joi.number().positive().required(),
        path:joi.string().required(),
        filename:joi.string().required(),
        destination:joi.string().required(),
        mimetype:joi.string().required(),
        encoding:joi.string().required(),
        originalname:joi.string().required(),
        fieldname:joi.string().required()
    })
}
export const ValidationCoreFunction =(schema)=>{
    return(req,res,next)=>{
        const ValidationErrArray=[]
        for(const key of reqMethods){
            if(schema[key])
            {
                const ValidateResults = schema[key].validate(req[key],{
                    abortEarly:false,
                })
                if(ValidateResults.error)
                {
                    ValidationErrArray.push(ValidateResults.error.details)
                }
            }
        }

        if (ValidationErrArray.length) {
            return res
            .status(400)
            .json({ message: 'Validation Error', Errors: ValidationErrArray })
        }
    
        next()
 }
}
