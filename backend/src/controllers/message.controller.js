const Message = require('../models/Message');
const Notification = require('../models/Notification');
const { User } = require('../models/User');

exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, message, gigId } = req.body;
        const files = req.files || [];
        if (!message && files.length === 0) {
            return res.status(400).json({ message: 'Message or attachments required' });
        }
        const attachments = files.map(f => ({
            url: f.path,
            type: f.mimetype,
            name: f.originalname,
            size: f.size
        }));
        const newMessage = await Message.create({
            senderId: req.user.userId,
            receiverId,
            message,
            attachments,
            gigId
        });

        try {
            const sender = await User.findById(req.user.userId).select('name');
            const base = message || (attachments.length > 0 ? `${attachments.length} attachment(s)` : '');
            const preview = base.length > 140 ? base.slice(0, 137) + '...' : base;
            await Notification.create({
                userId: receiverId,
                type: 'MESSAGE',
                title: `New message from ${sender?.name || 'User'}`,
                message: preview,
                link: `/messages/${req.user.userId}`
            });
        } catch (err) {
            // Swallow notification errors to not block message send
            console.error('Notification creation failed:', err.message);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { otherUserId } = req.query;
        let filter;
        if (otherUserId) {
            filter = {
                $or: [
                    { senderId: req.user.userId, receiverId: otherUserId },
                    { senderId: otherUserId, receiverId: req.user.userId }
                ]
            };
        } else {
            filter = {
                $or: [{ senderId: req.user.userId }, { receiverId: req.user.userId }]
            };
        }
        const messages = await Message.find(filter)
            .populate('senderId', 'name photo')
            .populate('receiverId', 'name photo')
            .sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};
