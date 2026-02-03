const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema(
    {
        studentId: {
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
        subject: {
            type: String,
            required: true,
            trim: true
        },
        academicLevel: {
            type: String,
            enum: ['High School', 'Undergraduate', 'Graduate', 'Doctorate', 'Professional'],
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        budget: {
            min: { type: Number, required: true },
            max: { type: Number, required: true }
        },
        files: [{
            name: String,
            url: String,
            type: String
        }],
        preferences: {
            freelancerLevel: { type: String, default: 'any' },
            language: { type: String, default: 'English' },
            plagiarismFree: { type: Boolean, required: true, default: true }
        },
        status: {
            type: String,
            enum: ['open', 'assigned', 'in_progress', 'submitted', 'revision_requested', 'completed', 'canceled'],
            default: 'open'
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Assignment', AssignmentSchema);
