import { Router } from "express";
import * as CartRouter from "./controllers/cart.controller.js";
import { allowedTo, authentication } from "../../middleware/authentication.js";
const router=Router()
router.post("/",authentication,CartRouter.addtoCart)
router.put("/",authentication,CartRouter.applyCoupon)
router.delete("/:id",authentication,CartRouter.removeproductfromCart)
router.get("/",authentication,CartRouter.getuserloggedCart)
router.put("/",CartRouter.updateQuantity)




export default router