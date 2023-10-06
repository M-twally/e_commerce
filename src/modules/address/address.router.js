import { Router } from "express";
import * as AddressRouter from "../address/controllers/address.controller.js"
import { authentication } from "../../middleware/authentication.js";

const router=Router()
router.patch("/",authentication,AddressRouter.addAddress)
router.get("/",authentication,AddressRouter.getalluseraddresslist)
router.delete("/",authentication,AddressRouter.removeaddress)




export default router