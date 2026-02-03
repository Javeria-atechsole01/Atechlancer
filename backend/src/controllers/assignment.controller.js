const Assignment = require('../models/Assignment');
const Bid = require('../models/Bid');

// Create new assignment
exports.createAssignment = async (req, res) => {
    try {
        const assignment = new Assignment({
            ...req.body,
            studentId: req.user._id
        });
        await assignment.save();
        res.status(201).json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all open assignments (with filtering)
exports.getAssignments = async (req, res) => {
    try {
        const { subject, academicLevel, minBudget, maxBudget } = req.query;
        let query = { status: 'open' };

        if (subject) query.subject = subject;
        if (academicLevel) query.academicLevel = academicLevel;
        if (minBudget || maxBudget) {
            query['budget.min'] = { $gte: Number(minBudget) || 0 };
            if (maxBudget) query['budget.max'] = { $lte: Number(maxBudget) };
        }

        const assignments = await Assignment.find(query)
            .populate('studentId', 'name')
            .sort({ createdAt: -1 });
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get assignment by ID (with bids if requester is owner)
exports.getAssignmentById = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id).populate('studentId', 'name');
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        let bids = [];
        if (assignment.studentId._id.toString() === req.user._id.toString()) {
            bids = await Bid.find({ assignmentId: assignment._id }).populate('freelancerId', 'name');
        }

        res.json({ assignment, bids });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update assignment status
exports.updateStatus = async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

        // Ensure only owner or assigned freelancer can update status (depending on the logic)
        // For simplicity now, just allow updates
        assignment.status = req.body.status;
        await assignment.save();
        res.json(assignment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
