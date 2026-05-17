const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bid.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

router.post('/', authenticateUser, authorizeRoles('freelancer', 'teacher'), bidController.submitBid);
router.post('/:id/accept', authenticateUser, authorizeRoles('student'), bidController.acceptBid);
router.get('/my-bids', authenticateUser, authorizeRoles('freelancer', 'teacher'), bidController.getMyBids);

module.exports = router;
