const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
    {
<<<<<<< HEAD
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
        category: {
            type: String,
            required: true
        },
        skills: {
            type: [String],
            default: []
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
=======
        employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        title: { type: String, required: true, trim: true },
        category: { type: String, required: true },
        skills: { type: [String], default: [] },
        experienceLevel: { type: String, enum: ['entry', 'mid', 'senior', 'expert'], default: 'mid' },

        description: { type: String, required: true }, // Rich text
        responsibilities: { type: String }, // Rich text
        requirementsDesc: { type: String }, // Rich text

        budget: { type: Number, required: true },
        budgetType: { type: String, enum: ['fixed', 'hourly'], default: 'fixed' },
        duration: { type: String }, // e.g., "1-3 months"

        type: { type: String, enum: ['full-time', 'part-time', 'contract', 'freelance'], default: 'freelance' },
        locationType: { type: String, enum: ['remote', 'onsite', 'hybrid'], default: 'remote' },
        preferredRole: { type: String, enum: ['freelancer', 'student', 'teacher', 'any'], default: 'any' },
        deadline: { type: Date },

        status: { type: String, enum: ['open', 'closed', 'in-progress'], default: 'open' },
        applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
>>>>>>> ddb7b09595525bd3df0290c7dfb032ed30fc1fc5
    },
    { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
