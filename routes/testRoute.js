import  express  from "express";

  import testPostController from "../controller/test.controller.js";
//object
const router = express.Router()

router.post("/test",testPostController)


export default router;