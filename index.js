import express from "express"
import dotenv from "dotenv"
import  color from "colors"
import cors from "cors"
import morgan from "morgan"

//route
import testPostController from "./controller/test.controller.js"
//middleWare
 import errorHandlerMiddleware from './middleware/errorMiddleware.js'

import authroute from "./routes/Authroute.js"


import connectDB from "./config/db.js"

//dot env config
dotenv.config()
const app =  express()
connectDB()
//middleware
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))

 app.use("/api/v1/test",testPostController)
 app.use("/api/v1/register", authroute)

// validation middle ware
app.use(errorHandlerMiddleware)
const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{

    console.log(`Server is running , on 8000`.red.black)
})