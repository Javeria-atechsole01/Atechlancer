const Job = require('../models/Job');
const Application = require('../models/Application');

// Create a new Job
exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            employerId: req.user.userId
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create job', error: error.message });
    }
};

// Get All Jobs (Public with Filters)
exports.getJobs = async (req, res) => {
    try {
        const { type, locationType, category, minBudget, maxBudget, search } = req.query;
        let query = { status: 'open' };

        if (type) query.type = type;
        if (locationType) query.locationType = locationType;
        if (category) query.category = category;
        if (minBudget || maxBudget) {
            query.budget = {};
            if (minBudget) query.budget.$gte = Number(minBudget);
            if (maxBudget) query.budget.$lte = Number(maxBudget);
        }
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const jobs = await Job.find(query)
            .populate('employerId', 'name photo isVerified')
            .sort({ createdAt: -1 });

        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
};

// Get Single Job
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employerId', 'name photo isVerified bio');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch job' });
    }
};

// Get Employer's Jobs
exports.getEmployerJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ employerId: req.user.userId }).sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch your jobs' });
    }
};
