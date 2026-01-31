const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema(
    {
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        subject: {
            type: String,
            required: true
        },
        deadline: {
            type: Date,
            required: true
        },
        status: {
            type: String,
            enum: ['open', 'assigned', 'completed'],
            default: 'open'
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Could be Freelancer or Teacher
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Assignment', AssignmentSchema);
