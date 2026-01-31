const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema(
    {
        freelancerId: {
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
        price: {
            type: Number,
            required: true
        },
        deliveryTime: {
            type: Number, // In days
            required: true
        },
        images: {
            type: [String],
            default: []
        },
        status: {
            type: String,
            enum: ['active', 'paused', 'draft'],
            default: 'active'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Gig', GigSchema);
