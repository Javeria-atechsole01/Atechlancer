const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(

  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    coverLetter: { type: String, default: '' },
    expectedRate: { type: Number },
    portfolioUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'rejected', 'hired'],
      default: 'applied'
    }
  },
  { timestamps: true }
);

ApplicationSchema.index({ jobId: 1, applicantId: 1 }, { unique: true });

module.exports = mongoose.model('Application', ApplicationSchema);
