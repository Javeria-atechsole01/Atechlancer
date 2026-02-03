const PaymentMethod = require('../models/PaymentMethod');
const Transaction = require('../models/Transaction');
const Invoice = require('../models/Invoice');
const PaymentRequest = require('../models/PaymentRequest');
const Order = require('../models/Order');
const { stripe, getOrCreateStripeCustomer } = require('../utils/stripe');
const { User } = require('../models/User');

// List Payment Methods
exports.getPaymentMethods = async (req, res) => {
  try {
    const userId = req.user.userId;
    const methods = await PaymentMethod.find({ userId }).sort({ isDefault: -1, createdAt: -1 });
    res.json({ results: methods });
  } catch (err) {
    console.error('Get Payment Methods Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 1) Add Payment Method
exports.addPaymentMethod = async (req, res) => {
  try {
    const { paymentMethodId } = req.body;
    const userId = req.user.userId;
    if (!paymentMethodId) return res.status(400).json({ message: 'paymentMethodId is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const customerId = await getOrCreateStripeCustomer(userId, user.email);

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customerId });

    // If this is first method, set as default
    const existingMethods = await PaymentMethod.find({ userId });
    if (existingMethods.length === 0) {
      await stripe.customers.update(customerId, {
        invoice_settings: { default_payment_method: paymentMethodId }
      });
    }

    // Retrieve PM details safely
    const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
    const doc = new PaymentMethod({
      userId,
      stripeCustomerId: customerId,
      stripePaymentMethodId: paymentMethodId,
      brand: pm.card?.brand,
      last4: pm.card?.last4,
      expMonth: pm.card?.exp_month,
      expYear: pm.card?.exp_year,
      isDefault: existingMethods.length === 0
    });
    await doc.save();

    res.json({ message: 'Payment method added', method: doc });
  } catch (err) {
    console.error('Add Payment Method Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 2) Create Payment Intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'usd', userId, invoiceId } = req.body;
    if (!amount || !userId) return res.status(400).json({ message: 'amount and userId are required' });
    if (req.user.userId !== userId) return res.status(403).json({ message: 'Unauthorized user' });

    const user = await User.findById(userId);
    const customerId = await getOrCreateStripeCustomer(userId, user?.email);

    const intent = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency,
      customer: customerId,
      automatic_payment_methods: { enabled: true },
      metadata: invoiceId ? { invoiceId } : {}
    });

    res.json({ clientSecret: intent.client_secret, paymentIntentId: intent.id });
  } catch (err) {
    console.error('Create Payment Intent Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 3) Confirm Payment and record transaction/invoice
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId } = req.body;
    if (!paymentIntentId) return res.status(400).json({ message: 'paymentIntentId is required' });

    const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const userId = req.user.userId;

    if (intent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment not completed', status: intent.status });
    }

    // Create Transaction
    const tx = await Transaction.create({
      userId,
      paymentIntentId,
      amount: intent.amount,
      currency: intent.currency,
      status: intent.status,
      description: intent.description || 'Payment completed'
    });

    // Mark invoice paid (create if absent)
    let invoiceDoc = null;
    const invoiceId = intent.metadata?.invoiceId;
    if (invoiceId) {
      invoiceDoc = await Invoice.findByIdAndUpdate(invoiceId, { status: 'paid', transactionId: tx._id }, { new: true });
    } else {
      // Create a simple invoice record
      const invoiceNumber = `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      invoiceDoc = await Invoice.create({
        userId,
        invoiceNumber,
        amount: intent.amount,
        currency: intent.currency,
        status: 'paid',
        transactionId: tx._id,
        description: 'Stripe payment'
      });
    }

    res.json({ message: 'Payment confirmed', transaction: tx, invoice: invoiceDoc });
  } catch (err) {
    console.error('Confirm Payment Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// 4) Get invoices by user
exports.getInvoices = async (req, res) => {
  try {
    const userId = req.user.userId;
    const invoices = await Invoice.find({ userId }).sort({ createdAt: -1 });
    res.json({ results: invoices });
  } catch (err) {
    console.error('Get Invoices Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// BANK TRANSFER: Submit bank payment request with receipt image
exports.submitBankRequest = async (req, res) => {
  try {
    const { orderId, amount, txnRef } = req.body;
    if (!orderId || !amount || !txnRef) {
      return res.status(400).json({ message: 'orderId, amount and txnRef are required' });
    }
    if (!req.file) {
      return res.status(400).json({ message: 'Receipt image is required' });
    }

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const userId = req.user.userId;
    const receiptImage = req.file.path;

    const pr = await PaymentRequest.create({
      orderId,
      userId,
      amount: Number(amount),
      txnRef: String(txnRef),
      receiptImage,
      status: 'pending'
    });

    res.status(201).json({ message: 'Payment request submitted', request: pr });
  } catch (err) {
    console.error('Submit Bank Request Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// BANK TRANSFER: Admin fetch pending requests
exports.getPendingBankRequests = async (req, res) => {
  try {
    const results = await PaymentRequest.find({ status: 'pending' })
      .populate('userId', 'name email role')
      .populate('orderId', 'totalPrice status');
    res.json({ results });
  } catch (err) {
    console.error('Get Pending Bank Requests Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// BANK TRANSFER: Admin verify request and mark order paid
exports.verifyBankRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.userId;

    const pr = await PaymentRequest.findById(id);
    if (!pr) return res.status(404).json({ message: 'Payment request not found' });
    if (pr.status !== 'pending') return res.status(400).json({ message: 'Request not pending' });

    pr.status = 'verified';
    pr.verifiedBy = adminId;
    pr.verifiedAt = new Date();
    await pr.save();

    const order = await Order.findById(pr.orderId);
    if (order) {
      order.paymentStatus = 'paid';
      await order.save();
    }

    res.json({ message: 'Payment verified', request: pr, order });
  } catch (err) {
    console.error('Verify Bank Request Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// BANK TRANSFER: Admin reject request
exports.rejectBankRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const pr = await PaymentRequest.findById(id);
    if (!pr) return res.status(404).json({ message: 'Payment request not found' });
    if (pr.status !== 'pending') return res.status(400).json({ message: 'Request not pending' });
    pr.status = 'rejected';
    await pr.save();
    res.json({ message: 'Payment rejected', request: pr });
  } catch (err) {
    console.error('Reject Bank Request Error:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};
