const Application = require('../models/Application');
const Job = require('../models/Job');

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
};
