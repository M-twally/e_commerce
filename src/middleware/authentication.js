import {userModel} from "../../DB/models/user.model.js"
import { asyncHandler } from "../../src/utils/errror.handling.js"
import jwt from "jsonwebtoken"

export const authentication = asyncHandler(async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return next(new Error(`Token not provided`, {cause:401}));
    }
    const decoded = await jwt.verify(token, process.env.TOKEN_SIGNATURE);
    console.log(decoded);
    const user = await userModel.findById(decoded.id);
    if (!user) {
        return next(new Error(`invalid token`, {cause:401}));
    }
    if(user.PasswordChangedAt){
        const UserChangedpasswordTime=parseInt(user.PasswordChangedAt.getTime()/1000)
        console.log(UserChangedpasswordTime,"======",decoded.iat);
        if(UserChangedpasswordTime>decoded.iat){
            return next(new Error(`invalid token`, {cause:401}));
        }
    }
   
    req.user=user
    next()
});

export const allowedTo=(...roles)=>{
    return asyncHandler(async(req,res,next)=>{
        console.log(req.user)
        console.log(roles)
        if(!roles.includes(req.user.role)){
            return next(new Error(` Your are not allowed to acces this `,{cause:401}))
        }
        next()
    })
}
