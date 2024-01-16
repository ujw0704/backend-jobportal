import  express  from "express";
 import { loginController,registerController } from "../controller/Authcontroller.js";
// import userAuth from "../middleware/authmiddleware.js"



const router = express.Router()

 //Register || post
router.post("/register",registerController)

//Login ||post
router.post("/login", loginController)

export default router