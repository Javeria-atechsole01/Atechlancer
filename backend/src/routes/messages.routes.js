const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const { authenticateUser } = require('../middleware/auth.middleware');

router.post('/', authenticateUser, messageController.sendMessage);
router.get('/', authenticateUser, messageController.getMessages);

module.exports = router;
