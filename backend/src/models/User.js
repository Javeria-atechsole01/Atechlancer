const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['student', 'freelancer', 'teacher', 'employer', 'admin'];

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    // Changed from single role to array of roles
    roles: {
      type: [String],
      enum: ROLES,
      default: ['student']
    },
    // Track the currently active dashboard view
    activeRole: {
      type: String,
      enum: ROLES,
      default: 'student'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String
    },
    verificationTokenExpires: {
      type: Date
    },
    isApprovedByAdmin: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Virtual for backward compatibility with existing frontend code that checks user.role
UserSchema.virtual('role').get(function () {
  return this.activeRole;
});

// Remove sensitive fields when converting to JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  delete obj.verificationToken;
  delete obj.verificationTokenExpires;
  return obj;
};

// Compare raw password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = { User, ROLES };
