const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: ['payment', 'withdrawal', 'refund', 'commission', 'bonus'],
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'failed', 'cancelled'],
            default: 'pending'
        },
        metadata: {
            orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
            withdrawalMethod: String,
            payoutDetails: mongoose.Schema.Types.Mixed,
            reason: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
