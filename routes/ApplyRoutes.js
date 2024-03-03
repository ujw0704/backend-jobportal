
import express from "express";
import ApplyJobs from "../controller/ApplyController.js";
import multer from 'multer';
import path from 'path';

const router = express.Router();

// Multer configure
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);  
    const filename = Date.now() + "-" + file.originalname; 
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post("/applyJobs", upload.single('resume'), ApplyJobs);

export default router;
