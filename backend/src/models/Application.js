const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema(
<<<<<<< HEAD
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

=======
    {
        jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
        applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        coverMessage: { type: String, required: true },
        experience: { type: String },
        rate: { type: Number }, // Proposed rate
        resume: { type: String }, // URL to file
        status: {
            type: String,
            enum: ['new', 'shortlisted', 'interview', 'hired', 'rejected'],
            default: 'new'
        }
    },
    { timestamps: true }
);

>>>>>>> ddb7b09595525bd3df0290c7dfb032ed30fc1fc5
module.exports = mongoose.model('Application', ApplicationSchema);
