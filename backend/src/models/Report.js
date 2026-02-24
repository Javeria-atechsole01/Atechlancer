const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema(
    {
        reporter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        reportedUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        contentType: {
            type: String,
            enum: ['gig', 'job', 'assignment', 'course', 'message', 'profile'],
            required: true
        },
        contentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        type: {
            type: String,
            enum: ['spam', 'inappropriate', 'harassment', 'copyright', 'other'],
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'reviewed', 'dismissed'],
            default: 'pending'
        },
        contentPreview: {
            type: String,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Report', ReportSchema);
