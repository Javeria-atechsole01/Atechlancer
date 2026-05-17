const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

// Public routes
router.get('/', courseController.getCourses);
router.get('/:id', courseController.getCourseById);

// Protected routes
router.post('/', authenticateUser, authorizeRoles('teacher', 'admin'), courseController.createCourse);
router.post('/:id/enroll', authenticateUser, courseController.enrollInCourse);
router.patch('/:courseId/progress', authenticateUser, courseController.updateProgress);
router.get('/user/enrolled', authenticateUser, courseController.getUserEnrollments);
router.post('/:courseId/review', authenticateUser, courseController.addReview);
router.patch('/:id', authenticateUser, authorizeRoles('teacher', 'admin'), courseController.updateCourse);
router.delete('/:id', authenticateUser, authorizeRoles('teacher', 'admin'), courseController.deleteCourse);

module.exports = router;
