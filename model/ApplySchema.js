import mongoose from "mongoose";
import validator from "validator";


const applySchema = new mongoose.Schema({

    name :{
        type: String,
         required:[true,"name is required"]

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique: true,
        validate: validator.isEmail
    },

   PhoneNumber:{
        type:{
            type: String,
            required:[true,"phone no  is required"]

        },
        resume:{
            type:String,
            required:[true,"cv is required"]

            
        },
        coverLetter:{
            type:String,

        },
        experienceLevel:{
            type:String,
        }
        
       
    }

})
const ApplyJobs = mongoose.model("ApplyJob", applySchema);

export default ApplyJobs;