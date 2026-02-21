const Notification = require('../models/Notification');

exports.getNotifications = async (req, res) => {
  try {
    const { type, read, limit = 20, page = 1 } = req.query;
    const query = { userId: req.user.userId };
    if (type) query.type = type;
    if (read !== undefined) query.read = read === 'true';

    const limitNum = Number(limit) || 20;
    const pageNum = Number(page) || 1;
    const skip = (pageNum - 1) * limitNum;

    const [notifications, total] = await Promise.all([
      Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      Notification.countDocuments(query)
    ]);

    res.json({
      notifications,
      total,
      hasMore: skip + notifications.length < total,
      page: pageNum
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

exports.getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ userId: req.user.userId, read: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch unread count' });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId: req.user.userId },
      { $set: { read: true } },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: 'Notification not found' });
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark as read' });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user.userId, read: false }, { $set: { read: true } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark all as read' });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Notification.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!result) return res.status(404).json({ message: 'Notification not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete notification' });
  }
};
