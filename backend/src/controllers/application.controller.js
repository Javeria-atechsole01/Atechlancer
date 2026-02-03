const Application = require('../models/Application');
const Job = require('../models/Job');

<<<<<<< HEAD
// Candidate: apply to a job
exports.applyToJob = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { coverLetter = '', expectedRate, portfolioUrl = '' } = req.body;
    const applicantId = req.user.userId;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.status !== 'open') return res.status(400).json({ message: 'Job is not open' });

    const app = await Application.create({
      jobId,
      applicantId,
      coverLetter,
      expectedRate: expectedRate ? Number(expectedRate) : undefined,
      portfolioUrl,
      resumeUrl: req.file ? req.file.path : ''
    });

    if (!job.applicants.map(a => String(a)).includes(applicantId)) {
      job.applicants.push(applicantId);
      await job.save();
    }

    res.status(201).json({ message: 'Application submitted', application: app });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'Already applied to this job' });
    }
    console.error('Apply Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Candidate: list own applications
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ applicantId: req.user.userId })
      .populate('jobId', 'title category budget employerId status');
    res.json({ results: apps });
  } catch (err) {
    console.error('Get My Applications Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Employer: list applications for a job they own, filter by status
exports.getJobApplications = async (req, res) => {
  try {
    const { id: jobId } = req.params;
    const { status } = req.query;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (String(job.employerId) !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const filter = { jobId };
    if (status) filter.status = status;
    const apps = await Application.find(filter)
      .populate('applicantId', 'name email role');
    res.json({ results: apps });
  } catch (err) {
    console.error('Get Job Applications Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Employer: update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['shortlisted', 'rejected', 'hired'];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const app = await Application.findById(id);
    if (!app) return res.status(404).json({ message: 'Application not found' });

    const job = await Job.findById(app.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (String(job.employerId) !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    app.status = status;
    await app.save();

    res.json({ message: 'Status updated', application: app });
  } catch (err) {
    console.error('Update Application Status Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Employer dashboard summary counters
exports.getEmployerSummary = async (req, res) => {
  try {
    const employerId = req.user.userId;
    const activeJobs = await Job.countDocuments({ employerId, status: 'open' });
    const shortlistedCount = await Application.countDocuments({
      status: 'shortlisted',
      jobId: { $in: (await Job.find({ employerId }, '_id')).map(j => j._id) }
    });
    res.json({ activeJobs, shortlistedCount });
  } catch (err) {
    console.error('Employer Summary Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
=======
// Apply to a Job
exports.applyToJob = async (req, res) => {
    try {
        const { jobId, coverMessage, experience, rate } = req.body;

        // Check if already applied
        const existing = await Application.findOne({ jobId, applicantId: req.user.userId });
        if (existing) return res.status(400).json({ message: 'You have already applied to this job' });

        const application = await Application.create({
            jobId,
            applicantId: req.user.userId,
            coverMessage,
            experience,
            rate
        });

        // Add application reference to Job
        await Job.findByIdAndUpdate(jobId, { $push: { applicants: application._id } });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: 'Failed to apply', error: error.message });
    }
};

// Get Applications for a Layout (as Employer)
exports.getJobApplications = async (req, res) => {
    try {
        const { jobId } = req.params;
        // Verify ownership
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        if (String(job.employerId) !== req.user.userId) return res.status(403).json({ message: 'Unauthorized' });

        const applications = await Application.find({ jobId })
            .populate('applicantId', 'name photo title role skills')
            .sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch applications' });
    }
};

// Update Application Status
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findById(req.params.id).populate('jobId');

        if (!application) return res.status(404).json({ message: 'Application not found' });
        if (String(application.jobId.employerId) !== req.user.userId) return res.status(403).json({ message: 'Unauthorized' });

        application.status = status;
        await application.save();
        res.json(application);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status' });
    }
>>>>>>> ddb7b09595525bd3df0290c7dfb032ed30fc1fc5
};
