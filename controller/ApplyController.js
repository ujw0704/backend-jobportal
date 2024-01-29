import ApplyJobs from "../model/ApplySchema.js";



 const ApplyJob = async (req,res)=>{
    const{name, email, PhoneNumber,coverLetter,experinceLevel}=req.body
    console.log(req.body)
    console.log(JSON.stringify(req.body));

    const resume = req.file ? req.file.path : null;
  if(!name||!email||!PhoneNumber||!resume||!coverLetter||!experinceLevel){
  
    return res.send({ status: 400, message: "Required all fields of position"})
  }
      
  try {
       
    const savedApplyJob =  new ApplyJobs({
      
      name,email,PhoneNumber,coverLetter,experinceLevel
    })
    console.log('Saved ApplyJob:', savedApplyJob)
     const newApplyJob = await savedApplyJob.save();
     console.log(newApplyJob)
     if(newApplyJob){
      console.log(newApplyJob)
    
    res.send({ status: 201, message: 'Data has been inserted successfully', data: savedApplyJob });

     }

} catch (error) {
    console.error(error);
    res.send({ status: 500, message: "Internal Server Error" });
}
       

}
export default ApplyJob