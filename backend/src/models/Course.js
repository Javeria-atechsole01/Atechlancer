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
        category: {
            type: String,
            required: true,
            enum: ['Web Development', 'Mobile Development', 'Data Science', 'AI & Machine Learning', 'Design', 'Business', 'Marketing', 'Photography', 'Music', 'Other']
        },
        level: {
            type: String,
            required: true,
            enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
            default: 'Beginner'
        },
        whatYouWillLearn: [String],
        requirements: [String],
        sections: [{
            title: String,
            lessons: [{
                title: String,
                videoUrl: String,
                duration: Number, // In minutes
                description: String,
                isPreview: { type: Boolean, default: false }
            }]
        }],
        rating: {
            type: Number,
            default: 0
        },
        reviewCount: {
            type: Number,
            default: 0
        },
        enrolledStudentsCount: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
