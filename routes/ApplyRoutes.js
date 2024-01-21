import express from "express";
import ApplyJobs from "../controller/ApplyController.js";


const router = express.Router()

router.post("/applyJobs", ApplyJobs)

export default router