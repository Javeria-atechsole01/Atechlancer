const Bid = require('../models/Bid');
const Assignment = require('../models/Assignment');

// Submit a bid
exports.submitBid = async (req, res) => {
    try {
        const { assignmentId, proposedPrice, deliveryTime, coverMessage, samples } = req.body;

        // Check if assignment exists and is open
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment || assignment.status !== 'open') {
            return res.status(400).json({ message: 'Assignment is not open for bidding' });
        }

        // Check if freelancer already bid
        const existingBid = await Bid.findOne({ assignmentId, freelancerId: req.user._id });
        if (existingBid) {
            return res.status(400).json({ message: 'You have already submitted a bid for this assignment' });
        }

        const bid = new Bid({
            assignmentId,
            freelancerId: req.user._id,
            proposedPrice,
            deliveryTime,
            coverMessage,
            samples
        });

        await bid.save();
        res.status(201).json(bid);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Accept a bid
exports.acceptBid = async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.id);
        if (!bid) return res.status(404).json({ message: 'Bid not found' });

        const assignment = await Assignment.findById(bid.assignmentId);
        if (assignment.studentId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Only the assignment owner can accept bids' });
        }

        bid.status = 'accepted';
        await bid.save();

        // Reject other bids
        await Bid.updateMany(
            { assignmentId: assignment._id, _id: { $ne: bid._id } },
            { status: 'rejected' }
        );

        // Update assignment status and assignee
        assignment.status = 'in_progress';
        assignment.assignedTo = bid.freelancerId;
        await assignment.save();

        res.json({ message: 'Bid accepted successfully', bid });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get freelancer bids
exports.getMyBids = async (req, res) => {
    try {
        const bids = await Bid.find({ freelancerId: req.user._id }).populate('assignmentId', 'title status');
        res.json(bids);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
