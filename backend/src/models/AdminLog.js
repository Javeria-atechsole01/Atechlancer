const mongoose = require('mongoose');

const AdminLogSchema = new mongoose.Schema(
    {
        adminId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        action: {
            type: String,
            required: true
        },
        targetType: {
            type: String,
            enum: ['User', 'Gig', 'Job', 'Assignment', 'Course', 'Order', 'Setting', 'VerificationRequest', 'Report'],
            required: true
        },
        targetId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        details: {
            type: mongoose.Schema.Types.Mixed,
            default: {}
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('AdminLog', AdminLogSchema);
