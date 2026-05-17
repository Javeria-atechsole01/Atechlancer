const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: false },
    attachments: [
        {
            url: { type: String, required: true },
            type: { type: String, required: true }, // mime type
            name: { type: String },
            size: { type: Number }
        }
    ],
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: false },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

MessageSchema.path('message').validate(function (value) {
    if (!value && (!this.attachments || this.attachments.length === 0)) {
        return false;
    }
    return true;
}, 'Message text or at least one attachment is required');

module.exports = mongoose.model('Message', MessageSchema);
