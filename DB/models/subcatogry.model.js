import { Schema,model } from "mongoose";
const subcategoryschema=new Schema({
    name:{
        type:String,
        required:true,
        uniqe:true,
        trim:true,
        minlength:[2,`to shoort category name`]

    },
    slug:{
        type:String,
        lowercase:true,
    },
   category:{
    type:Schema.ObjectId,
    required:true,
    ref:"category"
   }
},{
    timestamps:true,
})

export const subcategoryModel=model(`subcategory`,subcategoryschema)