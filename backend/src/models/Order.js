const mongoose = require('mongoose');

const RevisionSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

const DeliverySchema = new mongoose.Schema(
  {
    message: { type: String },
    files: { type: [String], default: [] }
  },
  { timestamps: true }
);

const OrderSchema = new mongoose.Schema(
  {
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: [
        'pending',
        'in_progress',
        'delivered',
        'completed',
        'revision_requested',
        'cancelled'
      ],
      default: 'pending'
    },
    totalPrice: { type: Number, required: true },
    delivery: DeliverySchema,
    revisions: [RevisionSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', OrderSchema);
