const express = require('express');
const router = express.Router();
const controller = require('../controllers/notification.controller');
const { authenticateUser } = require('../middleware/auth.middleware');

router.get('/', authenticateUser, controller.getNotifications);
router.get('/unread-count', authenticateUser, controller.getUnreadCount);
router.patch('/read-all', authenticateUser, controller.markAllAsRead);
router.patch('/:id/read', authenticateUser, controller.markAsRead);
router.delete('/:id', authenticateUser, controller.deleteNotification);

module.exports = router;
