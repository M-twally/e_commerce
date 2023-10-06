import { Router } from "express";
import * as SubcategoryRouter from "./controllers/subcategory.controller.js"
const router=Router({mergeParams:true})
router.post("/",SubcategoryRouter.add_Subcategory)
router.get("/",SubcategoryRouter.getAllSubCategories)
router.patch("/:id",SubcategoryRouter.updateSubCategory)
router.delete("/:id",SubcategoryRouter.deleteSubCategory)
//////////////////////////////////////////////////////
// SubcategoryRouter.route("/")
// .post(SubcategoryRouter.add_Subcategory)
// .get(SubcategoryRouter.getAllSubCategories)

// SubcategoryRouter.route("/:id")
// .patch(SubcategoryRouter.updateSubCategory)
// .delete(SubcategoryRouter.deleteSubCategory)



export default router