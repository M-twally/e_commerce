import multer from "multer";
import { nanoid } from "nanoid";


function Multer (folderName){
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,`uploads/${folderName}`)
        },
        filename:(req,file,cb)=>{
            console.log(file);
            cb(null,nanoid()+"_"+file.originalname)
        }
    })
    
    
    function fileFilter(req,file,cb){
        if(file.mimetype.startsWith(`image`)){
            cb(null,true)
        }
        else{
            cb(new Error(`image only`,401),false)
        }
    
    }
    const upload=multer({storage,fileFilter})
    return upload
}
export const uploadSingleFile=(fieldName,folderName)=>Multer(folderName).single(fieldName)

export const UploadMixofFiles=(arrayofFields,folderName)=>Multer(folderName).fields(arrayofFields)