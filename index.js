import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express from "express"
import { bootstrap } from "./src/index.router.js"
import { createonlineorder } from "./src/modules/order/controllers/order.controller.js"
const app=express()
app.use(cors())
app.post('/webhook', express.raw({type: 'application/json'}),createonlineorder )
const port=5000
app.use(express.static("uploads"))
bootstrap(app,express)
app.listen(process.env.PORT || port,()=>{
    console.log(`server is running on ${port}`)
})