import  express from "express"
 import { createJobs,getAllJobsBy,getSingleJob,updateJob,removeJob } from "../controller/JobController.js";
const router = express.Router();

router.post("/jobs",createJobs);
router.get("/get-jobs",getAllJobsBy);
router.get('single-jobs/:id',getSingleJob)
router.patch("/update-job/:id",updateJob)
router.delete("/remove-job/:id",removeJob)


export default router