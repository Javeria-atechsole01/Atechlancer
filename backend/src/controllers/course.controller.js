const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const CourseReview = require('../models/CourseReview');

// Get all courses with filtering
exports.getCourses = async (req, res) => {
    try {
        const { category, level, minRating, search } = req.query;
        let query = {};

        if (category) query.category = category;
        if (level) query.level = level;
        if (minRating) query.rating = { $gte: Number(minRating) };
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const courses = await Course.find(query)
            .populate('teacherId', 'name')
            .sort({ createdAt: -1 });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get course preview by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('teacherId', 'name');
        if (!course) return res.status(404).json({ message: 'Course not found' });

        const reviews = await CourseReview.find({ courseId: course._id }).populate('userId', 'name').limit(10);

        // Check if current user is enrolled (if logged in)
        let isEnrolled = false;
        if (req.user) {
            const enrollment = await Enrollment.findOne({ userId: req.user._id, courseId: course._id });
            isEnrolled = !!enrollment;
        }

        res.json({ course, reviews, isEnrolled });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Enroll in a course (Buy)
exports.enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ userId: req.user._id, courseId: course._id });
        if (existingEnrollment) return res.status(400).json({ message: 'Already enrolled in this course' });

        // TODO: Integrate with payment/wallet system here
        // For now, assume payment success and create enrollment

        const enrollment = new Enrollment({
            userId: req.user._id,
            courseId: course._id,
            purchasePrice: course.price,
            completedLessons: [],
            progressPercentage: 0
        });

        await enrollment.save();

        // Increment student count on course
        course.enrolledStudentsCount += 1;
        await course.save();

        res.status(201).json(enrollment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update lesson completion progress
exports.updateProgress = async (req, res) => {
    try {
        const { lessonId } = req.body;
        const enrollment = await Enrollment.findOne({ userId: req.user._id, courseId: req.params.courseId });

        if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

        if (!enrollment.completedLessons.includes(lessonId)) {
            enrollment.completedLessons.push(lessonId);

            // Calculate progress
            const course = await Course.findById(req.params.courseId);
            const totalLessons = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);

            if (totalLessons > 0) {
                enrollment.progressPercentage = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
            }

            if (enrollment.progressPercentage === 100) {
                enrollment.isCompleted = true;
                // Generate simple certificate ID if needed
                enrollment.certificateId = `CERT-${course._id}-${req.user._id}`.toUpperCase();
            }

            await enrollment.save();
        }

        res.json(enrollment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get user's enrolled courses
exports.getUserEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ userId: req.user._id })
            .populate({
                path: 'courseId',
                populate: { path: 'teacherId', select: 'name' }
            });
        res.json(enrollments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add course review
exports.addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const courseId = req.params.courseId;

        // Check if user is enrolled
        const enrollment = await Enrollment.findOne({ userId: req.user._id, courseId });
        if (!enrollment) return res.status(403).json({ message: 'Must be enrolled to review' });

        const review = new CourseReview({
            userId: req.user._id,
            courseId,
            rating,
            comment
        });

        await review.save();

        // Update Course rating average
        const course = await Course.findById(courseId);
        const reviews = await CourseReview.find({ courseId });
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

        course.rating = avgRating;
        course.reviewCount = reviews.length;
        await course.save();

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Create Course (Teachers)
exports.createCourse = async (req, res) => {
    try {
        // Simple sanity check for role would be in routes middleware
        const course = new Course({
            ...req.body,
            teacherId: req.user.userId
        });
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update Course (Teachers/Admin)
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        const isOwner = course.teacherId.toString() === (req.user.userId || '').toString();
        const isAdmin = req.user.roles?.includes('admin');
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Not authorized to update this course' });
        }
        const updatableFields = [
            'title',
            'description',
            'price',
            'thumbnail',
            'category',
            'level',
            'whatYouWillLearn',
            'requirements',
            'sections'
        ];
        updatableFields.forEach((field) => {
            if (req.body[field] !== undefined) {
                course[field] = req.body[field];
            }
        });
        await course.save();
        res.json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete Course (Teachers/Admin)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ message: 'Course not found' });
        const isOwner = course.teacherId.toString() === (req.user.userId || '').toString();
        const isAdmin = req.user.roles?.includes('admin');
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Not authorized to delete this course' });
        }
        await course.deleteOne();
        await Enrollment.deleteMany({ courseId: course._id });
        await CourseReview.deleteMany({ courseId: course._id });
        res.json({ message: 'Course deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
