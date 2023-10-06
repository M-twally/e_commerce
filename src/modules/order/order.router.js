import { Router } from "express";
import * as OrderRouter from "../order/controllers/order.controller.js"
import { authentication } from "../../middleware/authentication.js";
const router=Router()

router.get("/",authentication,OrderRouter.getspecificorder)
router.get("/all",OrderRouter.getallorders)
router.post("/order/:id",authentication,OrderRouter.createCashOrder)
router.get("/successOrder/:token",authentication,OrderRouter.successurl)
router.post("/checkout/:id",authentication,OrderRouter.createcheckoutsession)
// router.post("https://e-commerce-8yxq.onrender.com/:id",authentication,OrderRouter.createcheckoutsession)




export default router
