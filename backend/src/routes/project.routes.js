const express = require('express');
const router = express.Router();
const projectController = require('../controllers/project.controller');
const { authenticateUser, authorizeRoles } = require('../middleware/auth.middleware');

// Public Routes
router.get('/', projectController.getProjects); // Public Hub
router.get('/:id', projectController.getProjectById);

// Protected Routes (Student Owner)
router.post('/', authenticateUser, projectController.createProject);
router.get('/student/mine', authenticateUser, projectController.getMyProjects);
router.patch('/:id', authenticateUser, projectController.updateProject);

// Interactions
router.post('/:id/like', authenticateUser, projectController.likeProject);

module.exports = router;
