const mongoose = require('mongoose');

const AssignmentSubmissionSchema = new mongoose.Schema(
    {
        assignmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Assignment',
            required: true
        },
        freelancerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        files: [{
            name: String,
            url: String,
            type: String
        }],
        comments: {
            type: String
        },
        status: {
            type: String,
            enum: ['submitted', 'pending_revision', 'approved'],
            default: 'submitted'
        },
        submittedAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('AssignmentSubmission', AssignmentSubmissionSchema);
