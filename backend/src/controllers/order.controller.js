const Order = require('../models/Order');
const Gig = require('../models/Gig');

exports.createOrder = async (req, res) => {
  try {
    const { gigId } = req.body;
    const gig = await Gig.findById(gigId);
    if (!gig || !gig.isActive) return res.status(404).json({ message: 'Gig not found' });
    const order = await Order.create({
      gigId,
      sellerId: gig.sellerId,
      buyerId: req.user.userId,
      totalPrice: gig.price
    });
    res.status(201).json(order);
  } catch {
    res.status(400).json({ message: 'Failed to create order' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const filter = { $or: [{ buyerId: req.user.userId }, { sellerId: req.user.userId }] };
    const orders = await Order.find(filter)
      .populate('gigId', 'title price')
      .populate('sellerId', 'name')
      .populate('buyerId', 'name')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch {
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('gigId', 'title price')
      .populate('sellerId', 'name')
      .populate('buyerId', 'name');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const isParty =
      String(order.buyerId) === req.user.userId || String(order.sellerId) === req.user.userId;
    if (!isParty) return res.status(403).json({ message: 'Not allowed' });
    res.json(order);
  } catch {
    res.status(400).json({ message: 'Invalid id' });
  }
};
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = [
      'pending',
      'in_progress',
      'delivered',
      'completed',
      'revision_requested',
      'cancelled'
    ];
    if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const isSeller = String(order.sellerId) === req.user.userId;
    const isBuyer = String(order.buyerId) === req.user.userId;
    if (status === 'in_progress' && !isSeller) return res.status(403).json({ message: 'Not allowed' });
    if (status === 'delivered' && !isSeller) return res.status(403).json({ message: 'Not allowed' });
    if (status === 'completed' && !isBuyer) return res.status(403).json({ message: 'Not allowed' });
    if (status === 'revision_requested' && !isBuyer) return res.status(403).json({ message: 'Not allowed' });

    order.status = status;
    await order.save();
    res.json(order);
  } catch {
    res.status(400).json({ message: 'Failed to update status' });
  }
};

exports.deliver = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (String(order.sellerId) !== req.user.userId) return res.status(403).json({ message: 'Not allowed' });
    const files = req.files?.map(f => f.path) || [];
    order.delivery = { message: req.body.message || '', files };
    order.status = 'delivered';
    await order.save();
    res.json(order);
  } catch {
    res.status(400).json({ message: 'Failed to deliver' });
  }
};

exports.requestRevision = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (String(order.buyerId) !== req.user.userId) return res.status(403).json({ message: 'Not allowed' });
    order.revisions.push({ message: req.body.message || '', createdBy: req.user.userId });
    order.status = 'revision_requested';
    await order.save();
    res.json(order);
  } catch {
    res.status(400).json({ message: 'Failed to request revision' });
  }
};
