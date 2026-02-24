const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        availableBalance: {
            type: Number,
            default: 0,
            min: 0
        },
        pendingBalance: {
            type: Number,
            default: 0,
            min: 0
        },
        escrowBalance: {
            type: Number, // Funds held until order completion
            default: 0,
            min: 0
        },
        totalEarned: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Wallet', WalletSchema);
