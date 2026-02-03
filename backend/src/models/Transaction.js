const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
    paymentIntentId: { type: String, required: true, unique: true },
    amount: { type: Number, required: true }, // in smallest unit (cents)
    currency: { type: String, default: 'usd' },
    status: { type: String, required: true }, // succeeded, processing, etc.
    description: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);

