const mongoose = require('mongoose');

const GigSchema = new mongoose.Schema(
  {
    sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    images: { type: [String], default: [] },

    // Marketplace Fields
    tags: { type: [String], default: [] },
    deliveryTime: { type: Number, required: true, min: 1 }, // in days
    revisions: { type: Number, default: 0 },
    features: { type: [String], default: [] }, // e.g., ["Source File", "Commercial Use"]
    faqs: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true }
      }
    ],
    status: {
      type: String,
      enum: ['pending_approval', 'active', 'paused', 'rejected'],
      default: 'pending_approval'
    },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true } // Legacy, prefer status='active'
  },
  { timestamps: true }
);

GigSchema.index({ title: 'text', description: 'text', tags: 'text' });
GigSchema.index({ category: 1, price: 1, status: 1, createdAt: -1 });

module.exports = mongoose.model('Gig', GigSchema);
