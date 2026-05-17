const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignment.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.post('/', authenticateUser, authorizeRoles('student'), assignmentController.createAssignment);
router.get('/', assignmentController.getAssignments);
router.get('/:id', authenticateUser, assignmentController.getAssignmentById);
router.patch('/:id/status', authenticateUser, assignmentController.updateStatus);

module.exports = router;
