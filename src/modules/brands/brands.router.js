import { Router } from "express";
import * as BrandRouter from "./controllers/brands.controllers.js";
const router=Router()
router.post("/",BrandRouter.add_Brand)
router.get("/",BrandRouter.getAllBrands)
router.patch("/:id",BrandRouter.updateBrand)
router.delete("/:id",BrandRouter.deleteBrand)
//////////////////////////////////////////////////////
// BrandRouter.route("/")
// .post(BrandRouter.add_Brand)
// .get(BrandRouter.getAllBrands)

// BrandRouter.route("/:id")
// .patch(BrandRouter.updateBrand)
// .delete(BrandRouter.deleteBrand)



export default router