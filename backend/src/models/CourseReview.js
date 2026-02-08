const mongoose = require('mongoose');

const CourseReviewSchema = new mongoose.Schema(
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
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true,
            trim: true
        }
    },
    { timestamps: true }
);

// One review per user per course
CourseReviewSchema.index({ userId: 1, courseId: 1 }, { unique: true });

module.exports = mongoose.model('CourseReview', CourseReviewSchema);
