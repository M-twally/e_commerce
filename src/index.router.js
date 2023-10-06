import connectDB from "../DB/connection.js"
import morgan, { format } from "morgan"
import { globalEroorHandling } from "./utils/errror.handling.js"
import categoryRouter  from "./modules/category/category.router.js"
import SubcategoryRouter from "./modules/subcategory/sybcategory.router.js"
import ProductRouter from "./modules/product/product.router.js"
import  BrandRouter from "./modules/brands/brands.router.js"
import UserRouter from "./modules/user/user.router.js"
import AuthRouter from "./modules/auth/auth.router.js"
import ReviewRouter from "./modules/review/review.router.js"
import WhishlistRouter from "./modules/whishlist/whishlist.router.js"
import AddressRouter from "./modules/address/address.router.js"
import CouponRouter from "./modules/coupon/coupon.router.js"
import CartRouter from "./modules/cart/cart.router.js"
import OrderRouter from "./modules/order/order.router.js"

 export const bootstrap=(app,express)=>{
     app.use(express.json())
     app.use(morgan("dev"))
     app.use("/api/categories",categoryRouter)
     app.use("/api/Subcategories",SubcategoryRouter)
     app.use("/api/products",ProductRouter)
     app.use("/api/users",UserRouter)
     app.use("/api/auth",AuthRouter)
     app.use("/api/brands",BrandRouter)
     app.use("/api/reviews",ReviewRouter)
     app.use("/api/whishlist",WhishlistRouter)
     app.use("/api/address",AddressRouter)
     app.use("/api/coupon",CouponRouter)
     app.use("/api/cart",CartRouter)
     app.use("/api/order",OrderRouter)
     app.use(globalEroorHandling)
     app.use("/*",(req,res,next)=>{
    return res.json({message:"in_valid routing"})
    })

    connectDB()
    
}
