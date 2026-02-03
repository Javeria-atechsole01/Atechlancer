const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/auth.middleware');
const { authorizeRoles } = require('../middleware/role.middleware');
const { uploadReceipt } = require('../middleware/upload.middleware');
const {
    getPaymentMethods,
    addPaymentMethod,
    createPaymentIntent,
    confirmPayment,
    getInvoices,
    submitBankRequest,
    getPendingBankRequests,
    verifyBankRequest,
    rejectBankRequest
} = require('../controllers/payment.controller');

// Add a payment method
router.post('/payment-method/add', authenticateUser, addPaymentMethod);
// List payment methods
router.get('/payment-methods', authenticateUser, getPaymentMethods);

// Create payment intent
router.post('/payment/intent', authenticateUser, createPaymentIntent);

// Confirm payment
router.post('/payment/confirm', authenticateUser, confirmPayment);

// Get invoices
router.get('/invoices', authenticateUser, getInvoices);

// Bank Transfer: user submits payment proof
router.post(
    '/payments/bank-request',
    authenticateUser,
    uploadReceipt.single('receipt'),
    submitBankRequest
);

// Admin: fetch pending bank payments
router.get(
    '/admin/payments/pending',
    authenticateUser,
    authorizeRoles('admin'),
    getPendingBankRequests
);

// Admin: verify bank payment
router.patch(
    '/admin/payments/:id/verify',
    authenticateUser,
    authorizeRoles('admin'),
    verifyBankRequest
);

// Admin: reject bank payment
router.patch(
    '/admin/payments/:id/reject',
    authenticateUser,
    authorizeRoles('admin'),
    rejectBankRequest
);

module.exports = router;
