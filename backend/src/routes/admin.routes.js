const express = require('express');
const adminController = require('../controllers/admin.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateUser);
router.use(authorizeRoles('admin'));

// Dashboard Stats
router.get('/dashboard/stats', adminController.getDashboardStats);

// User Management
router.get('/users', adminController.getUsers);
router.patch('/users/:userId/status', adminController.updateUserStatus);
router.patch('/approve-user/:userId', adminController.approveUser);

// Verification Requests
router.get('/verifications', adminController.getVerificationRequests);
router.patch('/verifications/:verificationId', adminController.updateVerificationStatus);

// Content Moderation
router.get('/reports', adminController.getReportedContent);
router.post('/reports/:reportId/moderate', adminController.moderateContent);

// Analytics
router.get('/analytics', adminController.getAnalytics);

// Transactions & Withdrawals
router.get('/transactions', adminController.getTransactions);
router.get('/withdrawals', adminController.getWithdrawalRequests);
router.patch('/withdrawals/:transactionId', adminController.updateWithdrawalStatus);

// Content Management
router.get('/gigs', adminController.getAllGigs);
router.delete('/gigs/:id', adminController.deleteGig);
router.get('/jobs', adminController.getAllJobs);
router.delete('/jobs/:id', adminController.deleteJob);
router.get('/assignments', adminController.getAllAssignments);
router.delete('/assignments/:id', adminController.deleteAssignment);
router.get('/courses', adminController.getAllCourses);
router.delete('/courses/:id', adminController.deleteCourse);

// Platform Settings
router.get('/settings', adminController.getSettings);
router.patch('/settings', adminController.updateSetting);

// Admin Logs
router.get('/logs', adminController.getAdminLogs);

module.exports = router;
