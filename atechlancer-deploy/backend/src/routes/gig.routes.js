const express = require('express');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { uploadGigImages } = require('../middleware/upload.middleware');
const {
  createGig,
  updateGig,
  deleteGig,
  getMyGigs,
  getGigs,
  getGigById,
  uploadGigCover
} = require('../controllers/gig.controller');

const router = express.Router();

router.post('/', authenticateUser, authorizeRoles('freelancer'), createGig);
router.put('/:id', authenticateUser, authorizeRoles('freelancer'), updateGig);
router.delete('/:id', authenticateUser, authorizeRoles('freelancer'), deleteGig);
router.get('/me', authenticateUser, authorizeRoles('freelancer'), getMyGigs);
router.get('/', getGigs);
router.get('/:id', getGigById);
router.post('/:id/cover', authenticateUser, authorizeRoles('freelancer'), uploadGigImages.single('image'), uploadGigCover);

module.exports = router;
