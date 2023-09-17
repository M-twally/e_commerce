import { Router } from "express";
import * as ReviewRouter from "./controllers/review.controller.js";
import { allowedTo, authentication } from "../../middleware/authentication.js";
const router=Router()
router.post("/",authentication,ReviewRouter.addreview)
router.get("/",ReviewRouter.getAllreviews)
router.patch("/:id",ReviewRouter.updateReviews)
router.delete("/:id",ReviewRouter.deletereviews)
router.get("/:id",ReviewRouter.get_reviewBYId)




export default router