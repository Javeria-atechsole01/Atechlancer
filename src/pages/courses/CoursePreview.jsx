import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { useAuth } from '../../context/AuthContext';
import {
    Star, Clock, BookOpen, User, PlayCircle, Lock,
    CheckCircle, Globe, Award, ShieldCheck, ChevronDown, Loader2
} from 'lucide-react';
import '../courses.css';

const CoursePreview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);
    const [openSections, setOpenSections] = useState({ 0: true });

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    const fetchCourseDetails = async () => {
        try {
            const data = await courseService.getById(id);
            setCourseData(data);
        } catch (error) {
            console.error('Error fetching course details:', error);
            navigate('/courses');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!user) {
            navigate('/login', { state: { from: `/courses/${id}` } });
            return;
        }

        setEnrolling(true);
        try {
            await courseService.enroll(id);
            // Redirect to course player/my courses after success
            navigate(`/my-courses/${id}/lesson/start`);
        } catch (error) {
            alert(error.response?.data?.message || 'Enrollment failed. Please try again.');
        } finally {
            setEnrolling(false);
        }
    };

    const toggleSection = (index) => {
        setOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-height-screen bg-gray-50">
                <Loader2 className="animate-spin text-primary-600" size={64} />
            </div>
        );
    }

    const { course, isEnrolled } = courseData;

    return (
        <div className="course-preview-page">
            {/* Hero Section */}
            <div className="course-preview-hero">
                <div className="course-preview-container">
                    <div>
                        <div className="flex items-center gap-2 text-accent-400 font-bold text-sm mb-4">
                            <span>{course.category}</span>
                            <ChevronDown size={14} className="-rotate-90" />
                            <span>{course.level}</span>
                        </div>
                        <h1 className="text-4xl font-extrabold mb-4 leading-tight">{course.title}</h1>
                        <p className="text-xl text-gray-300 mb-6">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-6 mb-8">
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-400 font-bold">{course.rating}</span>
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={16} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm">({course.reviewCount} reviews)</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={18} className="text-gray-400" />
                                <span>Created by <span className="text-primary-400 font-bold">{course.teacherId?.name}</span></span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe size={18} className="text-gray-400" />
                                <span>English</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-white rounded-2xl shadow-2xl p-6 text-gray-900 sticky top-24">
                            <img src={course.thumbnail || '/placeholder-course.jpg'} alt={course.title} className="w-full rounded-xl mb-6 shadow-md" />
                            <div className="text-3xl font-black mb-6">${course.price}</div>

                            {isEnrolled ? (
                                <Link to={`/my-courses/${id}/lesson/start`} className="w-full btn btn-primary py-4 rounded-xl text-lg mb-4">
                                    Continue Learning
                                </Link>
                            ) : (
                                <button
                                    onClick={handleEnroll}
                                    className="w-full btn btn-primary py-4 rounded-xl text-lg mb-4"
                                    disabled={enrolling}
                                >
                                    {enrolling ? <Loader2 className="animate-spin" /> : 'Buy Now'}
                                </button>
                            )}

                            <div className="space-y-4 text-sm text-gray-600">
                                <div className="flex items-center gap-3">
                                    <Clock size={16} /> <span>Full lifetime access</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Award size={16} /> <span>Certificate of completion</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ShieldCheck size={16} /> <span>Admin-verified instructor</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                    {/* What You'll Learn */}
                    <section className="mb-12 bg-white border border-gray-100 rounded-2xl p-8">
                        <h2 className="text-2xl font-bold mb-6">What you'll learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {course.whatYouWillLearn?.map((item, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-gray-700">{item}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Requirements */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Requirements</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {course.requirements?.map((req, i) => <li key={i}>{req}</li>)}
                        </ul>
                    </section>

                    {/* Curriculum */}
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold mb-6">Course content</h2>
                        <div className="flex justify-between items-center mb-4 text-sm text-gray-600 font-medium">
                            <span>{course.sections?.length} sections • {course.sections?.reduce((acc, s) => acc + s.lessons.length, 0)} lessons</span>
                        </div>

                        <div className="space-y-2">
                            {course.sections?.map((section, idx) => (
                                <div key={idx} className="curriculum-section">
                                    <div className="curriculum-header" onClick={() => toggleSection(idx)}>
                                        <div className="flex items-center gap-3">
                                            <ChevronDown size={18} className={`transition-transform ${openSections[idx] ? '' : '-rotate-90'}`} />
                                            <span>{section.title}</span>
                                        </div>
                                        <span className="text-sm font-normal text-gray-500">{section.lessons?.length} lessons</span>
                                    </div>
                                    {openSections[idx] && (
                                        <div className="curriculum-lessons">
                                            {section.lessons?.map((lesson, lIdx) => (
                                                <div key={lIdx} className={`lesson-item ${!lesson.isPreview && !isEnrolled ? 'locked' : ''}`}>
                                                    {lesson.isPreview || isEnrolled ? <PlayCircle size={16} className="text-primary-500" /> : <Lock size={16} />}
                                                    <span className="flex-1">{lesson.title}</span>
                                                    {lesson.isPreview && !isEnrolled && <span className="text-xs font-bold text-primary-600 underline cursor-pointer">Preview</span>}
                                                    <span className="text-xs text-gray-400">{lesson.duration}m</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default CoursePreview;
