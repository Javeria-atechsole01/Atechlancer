const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

// Public Routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Protected Routes (Employer)
router.post('/', authenticateUser, authorizeRoles('employer', 'admin'), jobController.createJob);
router.get('/employer/mine', authenticateUser, authorizeRoles('employer', 'admin'), jobController.getEmployerJobs);

module.exports = router;
