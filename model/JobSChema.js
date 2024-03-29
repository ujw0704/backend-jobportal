import mongoose from "mongoose";
import validator from "validator";
const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "company name is required"]
    },
    position: {
        type: String,
        required: [true, 'A position must be provided'],
        maxlength: 100,
    },
    // status: {
    //     type: String, 
    //     enum: ["pending", "rejected", "interview"]
    // },
    worktype: {
        type: String,
        enum: ["full-time", "part-time", "internship", "contract"],  
        unique:true
    },
    workLocation: {
        type: String,
        default: "Japan",
        required: [true, "Work location is required"],

    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail,
      },


      // password: {
      //   type: String,
      //   required: [true, "Password is required"],
      //   minLength: [6, "Password should be greater than 6 characters"],
      //   select: true,
      // },
      number: {
        type: Number,
      },
        
      salary: {
        type:Number,
        
      },
    jobDescription: {
        type:String,
        maxlength:[500,"Job description must not exceed 500 characters."]

    }
}, { timestamps: true });

const job = mongoose.model("Job", JobSchema);
export default job;
