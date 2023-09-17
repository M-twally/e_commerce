import { Router } from "express";
import * as WhishlistRouter from "../whishlist/controllers/whishlist.controller.js"
import { authentication } from "../../middleware/authentication.js";

const router=Router()
router.patch("/",authentication,WhishlistRouter.addtoWhishList)
router.get("/",authentication,WhishlistRouter.getalluserWhishlist)
router.delete("/:id",WhishlistRouter.removefromWhishList)




export default router