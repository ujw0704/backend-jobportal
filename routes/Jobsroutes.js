import  express from "express"
 import { createJobs,getAllJobsBy,getSingleJob,updateJob,removeJob,centersearch } from "../controller/JobController.js";
const router = express.Router();

router.post("/jobs",createJobs);
router.get("/get-jobs",getAllJobsBy);
router.get('/single-jobs/:id',getSingleJob)
router.patch("/update-job/:id",updateJob)
router.delete("/remove-job/:id",removeJob)
 router.get("/centerSearch/:input",centersearch)

export default router