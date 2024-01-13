import mongoose from "mongoose";
import colors from "colors"
const connectDB =async()=>{
    try{
     const connection = await mongoose.connect(process.env.MONGO_URL)
       console.log("conect is mongodb")
    }catch (error){
        console.log(`error${error}.bgRed.white`)

    }
}
export default connectDB;