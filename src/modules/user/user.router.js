import { Router } from "express";
import *as UserRouter from "./controllers/user.controller.js"
const router=Router()

router.post("/",UserRouter.addUser)
router.get("/",UserRouter.getAllUsers)
router.put("/:id",UserRouter.updateuser)
router.delete("/:id",UserRouter.deleteuser)
router.patch("/:id",UserRouter.changeUserPassword)

export default router