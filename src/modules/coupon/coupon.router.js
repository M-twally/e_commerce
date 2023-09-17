 import { Router } from "express";
 import * as CouponRouter from "../coupon/controllers/coupon.controller.js"

 const router=Router()
 router.post("/",CouponRouter.createcoupon)
 router.get("/",CouponRouter.getAllcoupon)
 router.delete("/:id",CouponRouter.deletecoupon)
 router.put("/:id",CouponRouter.updatecode)
 router.get("/:id",CouponRouter.getcouponbyId)




 export default router