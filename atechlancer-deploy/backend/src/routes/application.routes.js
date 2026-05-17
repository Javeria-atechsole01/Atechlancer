const express = require('express');
const router = express.Router();

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

module.exports = router;
