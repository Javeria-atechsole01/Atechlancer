const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob
} = require('../controllers/job.controller');

// Public routes
router.get('/', getJobs);
router.get('/:id', getJobById);

// Protected routes (Employer only)
router.post('/', authenticateUser, authorizeRoles('employer'), createJob);
router.put('/:id', authenticateUser, authorizeRoles('employer'), updateJob);
router.delete('/:id', authenticateUser, authorizeRoles('employer'), deleteJob);

module.exports = router;
