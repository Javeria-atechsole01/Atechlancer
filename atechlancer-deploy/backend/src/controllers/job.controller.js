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

// Get All Jobs (Public with Filters + Pagination)
exports.getJobs = async (req, res) => {
  try {
    const {
      type,
      locationType,
      category,
      preferredRole,
      minBudget,
      maxBudget,
      search,
      sort = 'latest',
      page = 1,
      limit = 9
    } = req.query;

    const query = { status: 'open' };

    if (type) query.type = type;
    if (locationType) query.locationType = locationType;
    if (category) query.category = category;
    if (preferredRole) query.preferredRole = preferredRole;
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'budget_high') sortOption = { budget: -1 };
    if (sort === 'budget_low') sortOption = { budget: 1 };

    const total = await Job.countDocuments(query);
    const jobs = await Job.find(query)
      .populate('employerId', 'name photo isVerified')
      .sort(sortOption)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      results: jobs,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit))
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch jobs' });
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
// Get Employer's Jobs (with filters)
exports.getEmployerJobs = async (req, res) => {
  try {
    const { search, category, minBudget, maxBudget, skills, sort } = req.query;
    const query = { employerId: req.user.userId };

    if (search) {
      const regex = new RegExp(search, 'i');
      query.$or = [{ title: regex }, { description: regex }];
    }
    if (category) {
      query.category = category;
    }
    if (minBudget || maxBudget) {
      query.budget = {};
      if (minBudget) query.budget.$gte = Number(minBudget);
      if (maxBudget) query.budget.$lte = Number(maxBudget);
    }
    if (skills) {
      const skillsArray = skills.split(',').map(s => new RegExp(s.trim(), 'i'));
      query.skills = { $in: skillsArray };
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'budget_high') sortOption = { budget: -1 };
    if (sort === 'budget_low') sortOption = { budget: 1 };

    const jobs = await Job.find(query)
      .populate('employerId', 'name photo')
      .sort(sortOption);

    res.json(jobs);
  } catch (error) {
    console.error('Employer Jobs Error:', error);
    res.status(500).json({ message: 'Failed to fetch your jobs' });
  }
};
