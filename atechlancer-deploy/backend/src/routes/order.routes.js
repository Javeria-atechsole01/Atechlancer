const express = require('express');
const { authenticateUser } = require('../middleware/auth.middleware');
const { uploadDelivery } = require('../middleware/upload.middleware');
const {
  createOrder,
  getUserOrders,
  getOrderById,
  updateStatus,
  deliver,
  requestRevision
} = require('../controllers/order.controller');

const router = express.Router();

router.post('/', authenticateUser, createOrder);
router.get('/user', authenticateUser, getUserOrders);
router.get('/:id', authenticateUser, getOrderById);
router.patch('/:id/status', authenticateUser, updateStatus);
router.post('/:id/deliver', authenticateUser, uploadDelivery.array('files', 5), deliver);
router.post('/:id/revision', authenticateUser, requestRevision);

module.exports = router;
