const AssignmentSubmission = require('../models/AssignmentSubmission');
const Assignment = require('../models/Assignment');

// Submit a solution
exports.submitSolution = async (req, res) => {
    try {
        const { assignmentId, files, comments } = req.body;

        const assignment = await Assignment.findById(assignmentId);
        if (!assignment || assignment.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not assigned to this assignment' });
        }

        const submission = new AssignmentSubmission({
            assignmentId,
            freelancerId: req.user._id,
            files,
            comments
        });

        await submission.save();

        // Update assignment status
        assignment.status = 'submitted';
        await assignment.save();

        res.status(201).json(submission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Approve submission
exports.approveSubmission = async (req, res) => {
    try {
        const submission = await AssignmentSubmission.findById(req.params.id);
        if (!submission) return res.status(404).json({ message: 'Submission not found' });

        const assignment = await Assignment.findById(submission.assignmentId);
        if (assignment.studentId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only the assignment owner can approve submissions' });
        }

        submission.status = 'approved';
        await submission.save();

        assignment.status = 'completed';
        await assignment.save();

        res.json({ message: 'Submission approved', submission });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Request revision
exports.requestRevision = async (req, res) => {
    try {
        const submission = await AssignmentSubmission.findById(req.params.id);
        if (!submission) return res.status(404).json({ message: 'Submission not found' });

        const assignment = await Assignment.findById(submission.assignmentId);
        if (assignment.studentId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only the assignment owner can request revisions' });
        }

        submission.status = 'pending_revision';
        await submission.save();

        assignment.status = 'revision_requested';
        await assignment.save();

        res.json({ message: 'Revision requested', submission });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
