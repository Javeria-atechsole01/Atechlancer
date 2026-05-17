const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth.middleware');
const { uploadPhoto, uploadDocument } = require('../middleware/upload.middleware');
const {
  createOrUpdateProfile,
  getOwnProfile,
  getPublicProfile,
  uploadProfilePhoto,
  uploadDocument: uploadDocController,
  getCandidates
} = require('../controllers/profile.controller');

// @route   GET /api/profile/candidates
// @desc    Get all candidates (freelancers/students) with filters
// @access  Public
router.get('/candidates', getCandidates);

// @route   POST /api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', authenticateUser, createOrUpdateProfile);

// @route   GET /api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', authenticateUser, getOwnProfile);

// @route   GET /api/profile/:userId
// @desc    Get profile by user ID
// @access  Public
router.get('/:userId', getPublicProfile);

// @route   POST /api/profile/upload-photo
// @desc    Upload profile photo
// @access  Private
router.post(
  '/upload-photo',
  authenticateUser,
  uploadPhoto.single('photo'),
  uploadProfilePhoto
);

// @route   POST /api/profile/upload-doc
// @desc    Upload document/project
// @access  Private
router.post(
  '/upload-doc',
  authenticateUser,
  uploadDocument.single('document'),
  uploadDocController
);

module.exports = router;
