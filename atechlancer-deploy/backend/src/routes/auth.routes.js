const express = require('express');
const { register, verifyEmail, login, resendVerification, switchRole } = require('../controllers/auth.controller');
const { authenticateUser } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/register', register);
router.get('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/resend-verification', resendVerification);
router.post('/switch-role', authenticateUser, switchRole);

module.exports = router;
