import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { Loader2, PlayCircle, Award, CheckCircle, Clock } from 'lucide-react';
import '../courses.css';

const MyCourses = () => {
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollments = async () => {
            try {
                const data = await courseService.getUserEnrollments();
                setEnrollments(data);
            } catch (error) {
                console.error('Error fetching enrollments:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollments();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-primary-600" size={48} />
            </div>
        );
    }

    return (
        <div className="my-courses-page bg-gray-50 min-h-screen">
            <div className="courses-container">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
                    <p className="text-gray-600">Track your progress and continue learning where you left off.</p>
                </header>

                {enrollments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {enrollments.map((enrollment) => {
                            const course = enrollment.courseId;
                            const firstLessonId = course.sections?.[0]?.lessons?.[0]?._id || 'start';

                            return (
                                <div key={enrollment._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                                    <div className="relative aspect-video">
                                        <img
                                            src={course.thumbnail || '/placeholder-course.jpg'}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                            <Link
                                                to={`/my-courses/${course._id}/lesson/${firstLessonId}`}
                                                className="bg-white p-3 rounded-full text-primary-600 shadow-lg"
                                            >
                                                <PlayCircle size={32} />
                                            </Link>
                                        </div>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="text-xs font-bold text-primary-600 uppercase mb-2">
                                            {course.category}
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-3 text-lg leading-snug">
                                            {course.title}
                                        </h3>

                                        <div className="mt-auto">
                                            <div className="flex justify-between items-center text-sm mb-2">
                                                <span className="text-gray-500">Progress</span>
                                                <span className="font-bold text-primary-600">{enrollment.progressPercentage}%</span>
                                            </div>
                                            <div className="course-progress-bar h-1.5">
                                                <div
                                                    className="course-progress-fill"
                                                    style={{ width: `${enrollment.progressPercentage}%` }}
                                                ></div>
                                            </div>

                                            <div className="mt-5 flex items-center justify-between">
                                                <Link
                                                    to={`/my-courses/${course._id}/lesson/${firstLessonId}`}
                                                    className="btn btn-primary px-6 py-2 rounded-lg text-sm font-bold"
                                                >
                                                    Continue Learning
                                                </Link>
                                                {enrollment.isCompleted && (
                                                    <Link
                                                        to={`/certificate/${enrollment._id}`}
                                                        className="text-green-500 hover:text-green-600 transition-colors"
                                                        title="Download Certificate"
                                                    >
                                                        <Award size={24} />
                                                    </Link>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                        <div className="mb-6 flex justify-center text-gray-200">
                            <PlayCircle size={80} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">No courses yet</h2>
                        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                            You haven't enrolled in any courses yet. Explore our marketplace to start your learning journey.
                        </p>
                        <Link to="/courses" className="btn btn-primary px-8 py-3 rounded-xl font-bold">
                            Browse Marketplace
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyCourses;
