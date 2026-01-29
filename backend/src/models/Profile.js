const mongoose = require('mongoose');

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
      default: ''
    },
    skills: {
      type: [String],
      default: []
    },
    education: {
      type: String,
      default: ''
    },
    experience: {
      type: String,
      default: ''
    },
    portfolioLinks: {
      type: [String],
      default: []
    },
    documents: {
      type: [String], // Array of file URLs
      default: []
    }
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;
