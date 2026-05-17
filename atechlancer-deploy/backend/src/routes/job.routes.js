const express = require('express');
const router = express.Router();

const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const jobController = require('../controllers/job.controller');

// Public routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Protected routes (Employer/Admin)
router.post('/', authenticateUser, authorizeRoles('employer', 'admin'), jobController.createJob);
router.put('/:id', authenticateUser, authorizeRoles('employer', 'admin'), jobController.updateJob);
router.delete('/:id', authenticateUser, authorizeRoles('employer', 'admin'), jobController.deleteJob);
router.get('/employer/mine', authenticateUser, authorizeRoles('employer', 'admin'), jobController.getEmployerJobs);

module.exports = router;
