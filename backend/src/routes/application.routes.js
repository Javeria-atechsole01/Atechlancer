const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

// Apply to a job
router.post('/apply', authenticateUser, applicationController.applyToJob);

// Employer: Get applications for a specific job
router.get('/job/:jobId', authenticateUser, authorizeRoles('employer', 'admin'), applicationController.getJobApplications);

// Employer: Update status
router.patch('/:id/status', authenticateUser, authorizeRoles('employer', 'admin'), applicationController.updateApplicationStatus);

module.exports = router;
