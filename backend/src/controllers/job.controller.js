const Job = require('../models/Job');


// 1) POST /api/jobs - Create a new job
exports.createJob = async (req, res) => {
  try {
    const { title, description, budget, category, skills } = req.body;

    // Validation
    if (!title || !description || !budget || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const job = new Job({
      title,
      description,
      budget,
      category,
      skills: skills || [],
      employerId: req.user.userId, // Assumes auth middleware populates req.user
      status: 'open'
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 2) GET /api/jobs - Get all jobs with filters
exports.getJobs = async (req, res) => {
  try {
    const { search, category, minBudget, maxBudget, skills, sort, page = 1, limit = 10 } = req.query;

    const query = {};

    // Search by title/description
    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [{ title: regex }, { description: regex }];
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by budget
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }

    // Filter by skills (match any)
    if (skills) {
      const skillsArray = skills.split(',').map(s => new RegExp(s.trim(), 'i'));
      query.skills = { $in: skillsArray };
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // Default: Latest first
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'budget_high') sortOption = { budget: -1 };
    if (sort === 'budget_low') sortOption = { budget: 1 };

    // Pagination
    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    const jobs = await Job.find(query)
      .populate('employerId', 'name photo') // Populate employer details
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    const total = await Job.countDocuments(query);

    res.json({
      results: jobs,
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 3) GET /api/jobs/[id] - Get single job
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employerId', 'name photo email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    console.error(err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

// 4) PUT /api/jobs/[id] - Update job
exports.updateJob = async (req, res) => {
  try {
    let job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check ownership
    if (job.employerId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to update this job' });
    }

    // Update fields
    const { title, description, budget, category, skills, status } = req.body;
    if (title) job.title = title;
    if (description) job.description = description;
    if (budget) job.budget = budget;
    if (category) job.category = category;
    if (skills) job.skills = skills;
    if (status) job.status = status;

    await job.save();
    res.json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 5) DELETE /api/jobs/[id] - Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check ownership
    if (job.employerId.toString() !== req.user.userId) {
      return res.status(401).json({ message: 'Not authorized to delete this job' });
    }

    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}
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
