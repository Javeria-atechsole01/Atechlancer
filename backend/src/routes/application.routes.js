const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { uploadDocument } = require('../middleware/upload.middleware');
const {
  applyToJob,
  getMyApplications,
  getJobApplications,
  updateApplicationStatus,
  getEmployerSummary
} = require('../controllers/application.controller');

// Candidate apply to job
router.post('/jobs/:id/applications', authenticateUser, authorizeRoles('freelancer', 'student'), uploadDocument.single('resume'), applyToJob);

// Candidate: list own applications
router.get('/my/applications', authenticateUser, authorizeRoles('freelancer', 'student'), getMyApplications);

// Employer: list applications for a job
router.get('/jobs/:id/applications', authenticateUser, authorizeRoles('employer'), getJobApplications);

// Employer: update application status
router.patch('/applications/:id/status', authenticateUser, authorizeRoles('employer'), updateApplicationStatus);

// Employer dashboard summary
router.get('/employer/applications/summary', authenticateUser, authorizeRoles('employer'), getEmployerSummary);
=======
const applicationController = require('../controllers/application.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

// Apply to a job (Any authenticated user can apply?? Usually freelancers/students)
router.post('/apply', authenticateUser, applicationController.applyToJob);

// Employer: Get applications for a specific job
router.get('/job/:jobId', authenticateUser, authorizeRoles('employer', 'admin'), applicationController.getJobApplications);

// Employer: Update status
router.patch('/:id/status', authenticateUser, authorizeRoles('employer', 'admin'), applicationController.updateApplicationStatus);
>>>>>>> ddb7b09595525bd3df0290c7dfb032ed30fc1fc5

module.exports = router;
