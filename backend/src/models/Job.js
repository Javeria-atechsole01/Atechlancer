const mongoose = require('mongoose');

{
    employerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    skills: { type: [String], default: [] },
    experienceLevel: { type: String, enum: ['entry', 'mid', 'senior', 'expert'], default: 'mid' },

    description: { type: String, required: true }, // Rich text
    responsibilities: { type: String }, // Rich text
    requirementsDesc: { type: String }, // Rich text (renamed to avoid conflict with 'requirements' array if needed, but keeping simple)

    budget: { type: Number, required: true },
    budgetType: { type: String, enum: ['fixed', 'hourly'], default: 'fixed' },
    duration: { type: String }, // e.g., "1-3 months"

    type: { type: String, enum: ['full-time', 'part-time', 'contract', 'freelance'], default: 'freelance' },
    locationType: { type: String, enum: ['remote', 'onsite', 'hybrid'], default: 'remote' },
    preferredRole: { type: String, enum: ['freelancer', 'student', 'teacher', 'any'], default: 'any' },
    deadline: { type: Date },

    status: { type: String, enum: ['open', 'closed', 'in-progress'], default: 'open' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }]
},
{ timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
