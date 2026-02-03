import api from './api';

export const paymentService = {
  addPaymentMethod: async (paymentMethodId) => {
    const res = await api.post('/payment-method/add', { paymentMethodId });
    return res.data;
  },
  listPaymentMethods: async () => {
    const res = await api.get('/payment-methods');
    return res.data;
  },
  createIntent: async ({ amount, currency = 'usd', userId, invoiceId }) => {
    const res = await api.post('/payment/intent', { amount, currency, userId, invoiceId });
    return res.data;
  },
  confirmPayment: async (paymentIntentId) => {
    const res = await api.post('/payment/confirm', { paymentIntentId });
    return res.data;
  },
  getInvoices: async () => {
    const res = await api.get('/invoices');
    return res.data;
  },
  submitBankRequest: async ({ orderId, amount, txnRef, receiptFile }) => {
    const fd = new FormData();
    fd.append('orderId', orderId);
    fd.append('amount', amount);
    fd.append('txnRef', txnRef);
    fd.append('receipt', receiptFile);
    const res = await api.post('/payments/bank-request', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  },
  getPendingBankRequests: async () => {
    const res = await api.get('/admin/payments/pending');
    return res.data;
  },
  verifyBankRequest: async (id) => {
    const res = await api.patch(`/admin/payments/${id}/verify`);
    return res.data;
  },
  rejectBankRequest: async (id) => {
    const res = await api.patch(`/admin/payments/${id}/reject`);
    return res.data;
  }
};
