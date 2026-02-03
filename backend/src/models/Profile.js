const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true }, // Can be 'Present'
  description: String
}, { _id: true });

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true }, // Can be 'Present'
  description: String
}, { _id: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  imageUrl: String,
  projectUrl: String,
  repoUrl: String
}, { _id: true });

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String, required: true },
  url: String
}, { _id: true });

const SocialLinksSchema = new mongoose.Schema({
  github: String,
  linkedin: String,
  website: String,
  behance: String,
  twitter: String
}, { _id: false });

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true
    },
    photo: {
      type: String, // Image URL
      default: ''
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500
    },
    title: { // e.g. "Full Stack Developer"
      type: String,
      default: ''
    },
    location: {
      type: String,
      default: ''
    },
    hourlyRate: {
      type: Number,
      default: 0
    },
    skills: {
      type: [String],
      default: []
    },
    education: [EducationSchema],
    experience: [ExperienceSchema],
    projects: [ProjectSchema],
    certifications: [CertificationSchema],
    socialLinks: {
      type: SocialLinksSchema,
      default: {}
    },
    documents: {
      type: [String], // Array of file URLs (Resumes, etc)
      default: []
    },
    completionPercentage: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

// Calculate completion percentage before saving
ProfileSchema.pre('save', function (next) {
  let score = 0;
  if (this.photo) score += 15;
  if (this.bio && this.skills.length > 0) score += 20;
  if (this.education.length > 0) score += 15;
  if (this.projects.length > 0) score += 30; // Portfolio is high value
  if (this.socialLinks && (this.socialLinks.linkedin || this.socialLinks.github || this.socialLinks.website)) score += 10;
  if (this.certifications.length > 0) score += 10;

  this.completionPercentage = score;
  next();
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
