import joi from "joi"
import { generalFields } from "../../middleware/validation.js"

export const addCategory={
    body:joi.object().required().keys({
    name:generalFields.name,
    }),
file:generalFields.file.required(),
}

export const updateCategory={
    body:joi.object({
    name:joi.string().min(3).max(30).required(),}).required(),
    params:joi.object().required().keys({
        id:generalFields.id,
    }),
file:generalFields.file.required(),
}



export const deleteCategory={
    params:joi.object().required().keys({
        id:generalFields.id,
    }),
}
 