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
    role: {
      type: String,
      enum: ROLES,
      required: true,
      default: 'student'
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    isApprovedByAdmin: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

// Remove sensitive fields when converting to JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

// Compare raw password with hashed password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = { User, ROLES };
