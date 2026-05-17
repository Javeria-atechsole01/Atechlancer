const express = require('express');
const walletController = require('../controllers/wallet.controller');
const { authenticateUser } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authenticateUser);

router.get('/', walletController.getWallet);
router.get('/transactions', walletController.getTransactions);
router.get('/earnings', walletController.getEarningsSummary);
router.post('/withdraw', walletController.requestWithdrawal);

module.exports = router;
