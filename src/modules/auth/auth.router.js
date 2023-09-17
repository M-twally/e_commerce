import { Router } from "express";
import *as AuthRouter from "./controllers/auth.controller.js"
const router=Router()

router.post("/",AuthRouter.signUp)
router.post("/signin",AuthRouter.signIn)

export default router 