const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
    {
        teacherId: {
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
        price: {
            type: Number,
            required: true
        },
        thumbnail: {
            type: String,
            default: ''
        },
        lessons: [{
            title: String,
            content: String, // Or URL to video
            duration: Number // In minutes
        }],
        enrolledStudents: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
