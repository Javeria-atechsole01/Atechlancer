const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        requirements: {
            type: [String],
            default: []
        },
        budget: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: ['full-time', 'part-time', 'contract', 'freelance'],
            default: 'freelance'
        },
        status: {
            type: String,
            enum: ['open', 'closed', 'in-progress'],
            default: 'open'
        },
        applicants: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
