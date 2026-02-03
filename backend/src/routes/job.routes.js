const express = require('express');
const router = express.Router();
<<<<<<< HEAD
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
=======
const jobController = require('../controllers/job.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

// Public Routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Protected Routes (Employer)
router.post('/', authenticateUser, authorizeRoles('employer', 'admin'), jobController.createJob);
router.get('/employer/mine', authenticateUser, authorizeRoles('employer', 'admin'), jobController.getEmployerJobs);
>>>>>>> ddb7b09595525bd3df0290c7dfb032ed30fc1fc5

module.exports = router;
