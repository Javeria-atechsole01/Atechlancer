const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        freelancerId: { // Or Seller ID (Teacher/Student etc)
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        gigId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Gig'
        },
        amount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed', 'cancelled'],
            default: 'pending'
        },
        requirements: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
