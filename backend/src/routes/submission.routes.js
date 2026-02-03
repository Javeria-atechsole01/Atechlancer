const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submission.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.post('/', authenticateUser, authorizeRoles('freelancer', 'teacher'), submissionController.submitSolution);
router.patch('/:id/approve', authenticateUser, authorizeRoles('student'), submissionController.approveSubmission);
router.patch('/:id/revision', authenticateUser, authorizeRoles('student'), submissionController.requestRevision);

module.exports = router;
