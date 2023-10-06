import { Schema,model } from "mongoose";
const brandschema=new Schema({
    name:{
        type:String,
        required:true,
        uniqe:true,
        trim:true,

    },
    slug:{
        type:String,
        lowercase:true,
    },
   logo:{
    type:String,
    // required:true,
   }
},{
    timestamps:true,
})

export const brandModel=model(`brand`,brandschema)