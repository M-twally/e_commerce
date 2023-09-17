import dotenv from "dotenv"
dotenv.config()

import cors from "cors"
import express from "express"
import { bootstrap } from "./src/index.router.js"
const app=express()
app.use(cors())
const port=5000
app.use(express.static("uploads"))
bootstrap(app,express)
app.listen(process.env.PORT || port,()=>{
    console.log(`server is running on ${port}`)
})