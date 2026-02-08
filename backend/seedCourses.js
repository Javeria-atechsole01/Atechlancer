const mongoose = require('mongoose');
require('dotenv').config({ path: 'c:/Users/Shani/Desktop/AtechLancer/Atechlancer/backend/.env' });
const Course = require('./src/models/Course');
const { User } = require('./src/models/User');

const seedCourses = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/atechlancer';
        await mongoose.connect(uri);
        console.log('Connected to MongoDB for seeding...');

        // Find a teacher to assign the courses to
        let teacher = await User.findOne({ activeRole: 'teacher' });
        if (!teacher) {
            console.log('No teacher found, creating a dummy teacher...');
            const bcrypt = require('bcryptjs');
            const hashedPassword = await bcrypt.hash('teacher123', 10);
            teacher = new User({
                name: 'Professor Smith',
                email: 'teacher@atechlancer.com',
                password: hashedPassword,
                roles: ['teacher', 'student'],
                activeRole: 'teacher',
                isEmailVerified: true,
                isApprovedByAdmin: true
            });
            await teacher.save();
            console.log('Dummy teacher created.');
        }

        const courses = [
            {
                teacherId: teacher._id,
                title: 'Full-Stack Web Development BootCamp 2026',
                description: 'Master HTML, CSS, JavaScript, React, and Node.js with real-world projects. This comprehensive course takes you from beginner to professional developer.',
                price: 99.99,
                thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
                category: 'Web Development',
                level: 'Beginner',
                whatYouWillLearn: ['Build responsive websites', 'Master React.js', 'Develop Node.js APIs', 'Deploy to production'],
                requirements: ['Basic computer knowledge', 'Internet access'],
                rating: 4.8,
                reviewCount: 156,
                enrolledStudentsCount: 1200,
                sections: [
                    {
                        title: 'Getting Started',
                        lessons: [
                            { title: 'Intro to Web Dev', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 10, description: 'Introduction to the world of web development.', isPreview: true },
                            { title: 'Setting up VS Code', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 15, description: 'The best editor for modern development' }
                        ]
                    },
                    {
                        title: 'Modern CSS',
                        lessons: [
                            { title: 'Flexbox & Grid', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 25, description: 'Modern layout techniques' },
                            { title: 'CSS Animations', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 20, description: 'Bringing your UI to life' }
                        ]
                    }
                ]
            },
            {
                teacherId: teacher._id,
                title: 'Data Science with Python & AI',
                description: 'Learn data analysis, visualization, and machine learning using Python, Pandas, Matplotlib, and Scikit-Learn.',
                price: 149.99,
                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
                category: 'Data Science',
                level: 'Intermediate',
                whatYouWillLearn: ['Data cleaning techniques', 'Machine learning models', 'Deep learning basics'],
                requirements: ['Python basics', 'Mathematics foundation'],
                rating: 4.9,
                reviewCount: 89,
                enrolledStudentsCount: 450,
                sections: [
                    {
                        title: 'Python for Data Science',
                        lessons: [
                            { title: 'Pandas Deep Dive', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 45, description: 'Mastering dataframes' },
                            { title: 'Numpy Basics', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: 30, description: 'Number crusing with Python' }
                        ]
                    }
                ]
            }
        ];

        await Course.deleteMany({}); // Clear existing
        await Course.insertMany(courses);

        console.log('Courses seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding courses:', error);
        process.exit(1);
    }
};

seedCourses();
