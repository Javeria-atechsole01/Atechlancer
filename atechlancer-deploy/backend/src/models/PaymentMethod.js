const mongoose = require('mongoose');

const PaymentMethodSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    stripeCustomerId: { type: String, required: true },
    stripePaymentMethodId: { type: String, required: true, unique: true },
    brand: { type: String },
    last4: { type: String },
    expMonth: { type: Number },
    expYear: { type: Number },
    isDefault: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PaymentMethod', PaymentMethodSchema);

