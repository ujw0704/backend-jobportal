 import job from "../model/JobSChema.js";

// job new creation
export const createJobs = async (req, res) => {
    const { company, position, worktype, workLocation,email,password,number } = req.body;
    console.log(req.body)
    if (!company || !position || !worktype || !workLocation ||!email ||!password||!number) {
        
        return res.send({ status: 400, message: "Required all fields of position" });
    }

    try {
       
        const savedJobs =  new job({
            company, position, worktype, workLocation,email,password,number

        })
         const newJob = await savedJobs.save();
         if(newJob){
        
        res.send({ status: 201, message: 'Data has been inserted successfully', data: savedJobs });

         }

    } catch (error) {
        console.error(error);
        res.send({ status: 500, message: "Internal Server Error" });
    }
};

// get all jobs by query parameters
export const getAllJobsBy = async (req, res) => {
    const sortBy = req.query.sortby || 'createdAt';
    const limit = parseInt(req.query.limit) || null;
    const skip = parseInt(req.query.skip) || 0;

    try {
        const jobs = await job.find(req.query).sort([[sortBy, 'desc']]).skip(skip).limit(limit);
        res.send({ status: 200, message: 'Jobs fetched successfully', data: jobs });
    } catch (error) {
        console.error(error);
        res.send({ status: 500, message: "Internal Server Error" });
    }
};

// get single job using id
export const getSingleJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await job.findById(jobId);

        if (!job) {
            res.send({ status: 404, message: 'No record found with provided ID' });
        } else {
            res.send({ status: 200, message: 'Record fetched successfully', data: job });
        }
    } catch (error) {
        console.error('Error in Fetching Record');
        res.status(500).json("Server error");
    }
};

// update a job
export const updateJob = async (req, res) => {
    const jobId = req.params.id;
    const updates = req.body;

    try {
        let job = await job.findByIdAndUpdate(jobId, updates, { new: true });

        if (!job) {
            res.send({
                status: 404,
                message: `Cannot find job with id ${jobId}`
            });
        } else {
            res.send({ status: 200, message: 'Job updated successfully', data: job });
        }
    } catch (error) {
        console.error(error);
        res.send({ status: 500, message: "Internal Server Error" });
    }
};

// delete
export const removeJob = async (req, res) => {
    const jobId = req.params.id;

    try {
        const job = await job.findByIdAndRemove(jobId);
        if (!job) {
            res.send({
                status: 400,
                message: `Cannot delete job with id ${jobId}: No such job present`
            });
        }
        res.send({
            status: 200,
            message: 'Deleted Successfully'
        });
    } catch (err) {
        console.log(err);
        res.send({
            status: false,
            message: 'Server error!'
        });
    }
};

// seachbar
