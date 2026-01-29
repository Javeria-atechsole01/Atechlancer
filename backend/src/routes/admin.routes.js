const express = require('express');
const { approveUser } = require('../controllers/admin.controller');
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');

const router = express.Router();

router.patch(
  '/approve-user/:userId',
  authenticateUser,
  authorizeRoles('admin'),
  approveUser
);

module.exports = router;
