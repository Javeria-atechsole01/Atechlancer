const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema(
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
        proposedPrice: {
            type: Number,
            required: true
        },
        deliveryTime: {
            type: Number, // In days
            required: true
        },
        coverMessage: {
            type: String,
            required: true
        },
        samples: [{
            name: String,
            url: String
        }],
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'withdrawn'],
            default: 'pending'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Bid', BidSchema);
