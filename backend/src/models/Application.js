const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        coverMessage: { type: String, required: true },
        experience: { type: String },
        rate: { type: Number }, // Proposed rate
        resume: { type: String }, // URL to file
        status: {
            type: String,
            enum: ['new', 'shortlisted', 'interview', 'hired', 'rejected'],
            default: 'new'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Application', ApplicationSchema);
