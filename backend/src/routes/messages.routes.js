const express = require('express');
const router = express.Router();
const messageController = require('../controllers/message.controller');
const { uploadMessageAttachments } = require('../middleware/upload.middleware');
const { authenticateUser } = require('../middleware/auth.middleware');

router.post('/', authenticateUser, uploadMessageAttachments.array('attachments', 5), messageController.sendMessage);
router.get('/', authenticateUser, messageController.getMessages);

module.exports = router;
