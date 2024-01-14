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
 import { registerController , loginController} from "./controller/Authcontroller.js"

import connectDB from "./config/db.js"

//dot env config
dotenv.config()
const app =  express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  "origin": "http://localhost:3000"
  }))
connectDB()
//middleware
app.use(express.json());

app.use(morgan("dev"))

//  app.use("/api/v1/test",testPostController)
//  app.use("/api/v1/register", authroute)
app.use("/register", registerController)
 app.use("/login", loginController)
// validation middle ware
app.use(errorHandlerMiddleware)
const PORT= process.env.PORT || 5000;
app.listen(PORT,()=>{

    console.log(`Server is running , on 8000`.red.black)
})