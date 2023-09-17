import mongoose, { Schema,model } from "mongoose";
import bcrypt from "bcrypt"

const userschema=new Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        uniqe:true,
        trim:true,

    },
    PasswordChangedAt:{ 
        type: Date,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:[`admin`,`user`],
        default:`user`
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    verified:{
        type:Boolean,
        default:false,
    },
    blocked:{
        type:Boolean,
        default:false,
    },
    whishlist:
        [{type:mongoose.SchemaTypes.ObjectId,ref:`product`}],
    address:[
        {
            city:String,
            street:String,
            phone:String

        }
    ],
    
},{
    timestamps:true,
})
userschema.pre(`save`,function(){
    this.password=bcrypt.hashSync(this.password,parseInt(process.env.SALT_ROUND))
    
})
userschema.pre(`findByIdAndUpdate`,function(){
    if(this._update.password){
    this._update.password=bcrypt.hashSync(this._update.password,parseInt(process.env.SALT_ROUND))}
    
})

export const userModel=model(`user`,userschema)