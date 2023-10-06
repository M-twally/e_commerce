import { Router } from "express";
import * as ProductRouter from "./controllers/products.controller..js";
import { UploadMixofFiles } from "../../utils/multer.js";
const router=Router()
let arrofFields=[{ name: 'imgcover', maxCount: 1 }, { name: 'images', maxCount: 20}]
router.post("/",UploadMixofFiles(arrofFields,`products`),ProductRouter.add_product)
router.get("/",ProductRouter.getAllproducts)
router.patch("/:id",ProductRouter.updateproducts)
router.delete("/:id",ProductRouter.deleteproducts)
router.get("/:id",ProductRouter.get_productBYId)
//////////////////////////////////////////////////////
// ProductRouter.route("/")
// .post(ProductRouter.add_product)
// .get(ProductRouter.getAllCategories)

// ProductRouter.route("/:id")
// .patch(ProductRouter.updateCategories)
// .delete(ProductRouter.deleteCategories)
//.get(ProductRouter.get_productBYId)



export default router