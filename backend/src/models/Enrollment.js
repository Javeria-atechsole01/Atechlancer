const mongoose = require('mongoose');

const EnrollmentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        courseId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true
        },
        completedLessons: [{
            type: String // Lesson ID or title (if using nested objects, might need a better reference)
        }],
        progressPercentage: {
            type: Number,
            default: 0
        },
        isCompleted: {
            type: Boolean,
            default: false
        },
        certificateId: {
            type: String,
            default: null
        },
        purchasePrice: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

// Index for quick lookup of user's enrollments
EnrollmentSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('Enrollment', EnrollmentSchema);
