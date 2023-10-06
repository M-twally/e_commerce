import { Router } from "express";
import * as categoryRouter from "./controllers/category.controller.js";
import SubcategoryRouter from "../subcategory/sybcategory.router.js"
import {ValidationCoreFunction} from "../../middleware/validation.js"
import * as Validators from "./category.validation.js";
import { uploadSingleFile } from "../../utils/multer.js";
import { allowedTo, authentication } from "../../middleware/authentication.js";
const router=Router()

//el parent 
router.use('/:categoryId/subcategories',SubcategoryRouter)
router.post("/",authentication,/*allowedTo(`admin`),*/uploadSingleFile("image","category"),ValidationCoreFunction(Validators.addCategory),categoryRouter.add_category)
router.get("/",categoryRouter.getAllCategories)
router.patch("/:id",uploadSingleFile("image","category"),ValidationCoreFunction(Validators.updateCategory),categoryRouter.updateCategories)
router.delete("/:id",ValidationCoreFunction(Validators.deleteCategory),categoryRouter.deleteCategories)
router.get("/:id",categoryRouter.get_categoryBYId)
//////////////////////////////////////////////////////
// categoryRouter.route("/")
// .post(categoryRouter.add_category)
// .get(categoryRouter.getAllCategories)

// categoryRouter.route("/:id")
// .patch(categoryRouter.updateCategories)
// .delete(categoryRouter.deleteCategories)
//.get(categoryRouter.get_categoryBYId)



export default router