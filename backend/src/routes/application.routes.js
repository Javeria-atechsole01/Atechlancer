const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/application.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

// Apply to a job (Any authenticated user can apply?? Usually freelancers/students)
router.post('/apply', authenticateUser, applicationController.applyToJob);

// Employer: Get applications for a specific job
router.get('/job/:jobId', authenticateUser, authorizeRoles('employer', 'admin'), applicationController.getJobApplications);

// Employer: Update status
router.patch('/:id/status', authenticateUser, authorizeRoles('employer', 'admin'), applicationController.updateApplicationStatus);

module.exports = router;
