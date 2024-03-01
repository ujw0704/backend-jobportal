
  
import job from "../model/JobSChema.js";

// job new creation
export const createJobs = async (req, res) => {
    const { company, position, worktype, workLocation, email,  number, salary, jobDescription } = req.body;
    console.log(req.body)
    if (!company || !position || !worktype || !workLocation || !email  || !number || !salary || !jobDescription) {  
        return res.send({ status: 400, message: "Required all fields of position" });
    }

    try {
        // Check if a job with the provided email already exists
        const existingJob = await job.findOne({ email: email });

        if (existingJob) {
            // If a job with the same email exists, update its fields
            existingJob.company = company;
            existingJob.position = position;
            existingJob.worktype = worktype;
            existingJob.workLocation = workLocation;
            // existingJob.password = password;
            existingJob.number = number;
            existingJob.salary = salary;
            existingJob.jobDescription = jobDescription;

            // Save the updated job
            const updatedJob = await existingJob.save();
            res.status(200).json({ status: 200, message: 'Job updated successfully', data: updatedJob });
        } else {
            // If no job with the same email exists, create a new job
            const newJob = new job({
                company, position, worktype, workLocation, email,  number, salary, jobDescription
            });

            // Save the new job
            const savedJob = await newJob.save();
            res.status(201).json({ status: 201, message: 'Job created successfully', data: savedJob });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
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
    const _id = req.params.id.substring(1);

    try {
        const jobs = await job.findById(_id);

        if (!jobs) {
            res.send({ status: 404, message: 'No record found with provided ID' });
        } else {
            res.send({ status: 200, message: 'Record fetched successfully', data: jobs });
        }
    } catch (error) {
        console.error('Error in Fetching Record');
        res.send({ status: 500, message: "Internal Server Error" });
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

// handleCentersearchbar
export const centersearch = async(req, res) => {
    let centerInput = req.params.input.substring(1)
    let companydata = await job.find({ company: centerInput })
    let positionData = await job.find({ position: centerInput })

    function fetchdata(companydata, positionData) {
        if (companydata.length !== 0) {
            res.send({ status: 200, message: 'Search Result', data: companydata })
            return true
        } else if (positionData.length !== 0) {
            res.send({ status: 200, message: 'Search Result', data: positionData })
            return true
        } else {
            res.send({ status: 202, message: 'not found' })
            return false
        }
    }
    fetchdata(companydata, positionData)
};

