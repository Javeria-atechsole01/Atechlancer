const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    amount: { type: Number, required: true }, // cents
    currency: { type: String, default: 'usd' },
    status: { type: String, enum: ['unpaid', 'paid'], default: 'unpaid' },
    transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
    description: { type: String },
    metadata: { type: Object, default: {} }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Invoice', InvoiceSchema);

