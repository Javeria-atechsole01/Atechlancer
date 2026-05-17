const mongoose = require('mongoose');

const VerificationRequestSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        type: {
            type: String,
            enum: ['identity', 'skill', 'business'],
            required: true
        },
        documents: [
            {
                name: { type: String, required: true },
                url: { type: String, required: true }
            }
        ],
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        notes: {
            type: String,
            default: ''
        },
        skillTestScore: {
            type: Number,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('VerificationRequest', VerificationRequestSchema);
