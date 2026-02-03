const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    try {
        const { receiverId, message, gigId } = req.body;
        const newMessage = await Message.create({
            senderId: req.user.userId,
            receiverId,
            message,
            gigId
        });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        // Get messages where user is sender OR receiver
        const messages = await Message.find({
            $or: [{ senderId: req.user.userId }, { receiverId: req.user.userId }]
        })
            .populate('senderId', 'name photo')
            .populate('receiverId', 'name photo')
            .sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch messages' });
    }
};
