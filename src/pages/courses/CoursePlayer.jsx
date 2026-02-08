import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import {
    ChevronLeft, CheckCircle, Circle, PlayCircle,
    Menu, X, ChevronDown, Award, Loader2
} from 'lucide-react';
import '../course-player.css';

const CoursePlayer = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeLesson, setActiveLesson] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [openSections, setOpenSections] = useState({});

    useEffect(() => {
        fetchData();
    }, [courseId]);

    const fetchData = async () => {
        try {
            const courseData = await courseService.getById(courseId);
            setCourse(courseData.course);

            const enrollments = await courseService.getUserEnrollments();
            const currentEnrollment = enrollments.find(e => e.courseId._id === courseId);

            if (!currentEnrollment) {
                navigate('/courses/' + courseId);
                return;
            }
            setEnrollment(currentEnrollment);

            // Set first lesson if 'start' or lessonId not found
            let targetLesson = null;
            const allLessons = courseData.course.sections.flatMap(s => s.lessons);

            if (lessonId === 'start') {
                targetLesson = allLessons[0];
            } else {
                targetLesson = allLessons.find(l => l._id === lessonId);
            }

            setActiveLesson(targetLesson || allLessons[0]);

            // Auto open active section
            const sectionIdx = courseData.course.sections.findIndex(s =>
                s.lessons.some(l => l._id === (targetLesson?._id || allLessons[0]._id))
            );
            setOpenSections({ [sectionIdx]: true });

        } catch (error) {
            console.error('Error loading course player:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLessonSelect = (lesson) => {
        setActiveLesson(lesson);
        navigate(`/my-courses/${courseId}/lesson/${lesson._id}`);
    };

    const markAsCompleted = async () => {
        if (!activeLesson || enrollment.completedLessons.includes(activeLesson._id)) return;

        try {
            const updated = await courseService.updateProgress(courseId, activeLesson._id);
            setEnrollment(updated);
        } catch (error) {
            console.error('Error updating progress:', error);
        }
    };

    const toggleSection = (idx) => {
        setOpenSections(prev => ({ ...prev, [idx]: !prev[idx] }));
    };

    if (loading || !course) {
        return (
            <div className="flex justify-center items-center h-screen bg-navy-900">
                <Loader2 className="animate-spin text-white" size={64} />
            </div>
        );
    }

    return (
        <div className="course-player-page">
            {/* Header / Nav */}
            <div className="fixed top-0 left-0 right-0 h-16 bg-white border-bottom border-gray-200 z-50 flex items-center px-4 justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/my-courses" className="text-gray-500 hover:text-gray-900">
                        <ChevronLeft size={24} />
                    </Link>
                    <div className="h-8 w-px bg-gray-200"></div>
                    <div>
                        <h1 className="font-bold text-gray-900 truncate max-w-xs">{course.title}</h1>
                        <div className="course-progress-bar w-40 h-1 mt-1">
                            <div className="course-progress-fill" style={{ width: `${enrollment?.progressPercentage}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {enrollment?.isCompleted && (
                        <Link
                            to={`/certificate/${enrollment._id}`}
                            className="flex items-center gap-2 text-green-600 font-bold bg-green-50 px-3 py-1.5 rounded-full text-xs hover:bg-green-100 transition-colors"
                        >
                            <Award size={16} /> Get Certificate
                        </Link>
                    )}
                    <button
                        className="lg:hidden p-2 text-gray-600"
                        onClick={() => setSidebarOpen(!isSidebarOpen)}
                    >
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            <div className="flex w-full pt-16">
                {/* Main Content (Player) */}
                <main className="player-main">
                    <div className="video-wrapper">
                        {activeLesson ? (
                            <video
                                key={activeLesson._id}
                                className="video-player"
                                controls
                                controlsList="nodownload"
                                onContextMenu={(e) => e.preventDefault()}
                                onEnded={markAsCompleted}
                            >
                                <source src={activeLesson.videoUrl} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className="text-white">Select a lesson to start learning</div>
                        )}
                    </div>

                    <div className="video-info bg-white">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeLesson?.title}</h2>
                                    <p className="text-gray-500">{activeLesson?.description || 'No description available for this lesson.'}</p>
                                </div>
                                <button
                                    onClick={markAsCompleted}
                                    disabled={enrollment?.completedLessons.includes(activeLesson?._id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${enrollment?.completedLessons.includes(activeLesson?._id)
                                        ? 'bg-green-50 text-green-600 border border-green-200'
                                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-200'
                                        }`}
                                >
                                    {enrollment?.completedLessons.includes(activeLesson?._id) ? (
                                        <><CheckCircle size={20} /> Completed</>
                                    ) : (
                                        'Mark as Complete'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Sidebar (Curriculum) */}
                <aside className={`player-sidebar ${isSidebarOpen ? '' : 'hidden lg:block'}`}>
                    <div className="sidebar-header">
                        <h3 className="font-bold text-gray-900">Course Curriculum</h3>
                        <p className="text-xs text-gray-500 mt-1">
                            {enrollment?.completedLessons.length} / {course.sections?.reduce((a, s) => a + s.lessons.length, 0)} Lessons Completed
                        </p>
                    </div>

                    <div className="sidebar-curriculum">
                        {course.sections?.map((section, sIdx) => (
                            <div key={sIdx} className="section-group">
                                <div
                                    className="px-6 py-4 bg-gray-50 border-bottom border-gray-100 flex justify-between items-center cursor-pointer"
                                    onClick={() => toggleSection(sIdx)}
                                >
                                    <span className="font-bold text-sm text-gray-700">{section.title}</span>
                                    <ChevronDown size={14} className={openSections[sIdx] ? '' : '-rotate-90'} />
                                </div>

                                {openSections[sIdx] && (
                                    <div className="section-lessons">
                                        {section.lessons?.map((lesson) => (
                                            <div
                                                key={lesson._id}
                                                onClick={() => handleLessonSelect(lesson)}
                                                className={`sidebar-lesson ${activeLesson?._id === lesson._id ? 'active' : ''}`}
                                            >
                                                <div className="lesson-status">
                                                    {enrollment?.completedLessons.includes(lesson._id) ? (
                                                        <CheckCircle size={18} className="text-green-500" />
                                                    ) : (
                                                        <Circle size={18} className="text-gray-300" />
                                                    )}
                                                </div>
                                                <div className="lesson-details">
                                                    <div className="lesson-name">{lesson.title}</div>
                                                    <div className="lesson-meta flex items-center gap-2">
                                                        <PlayCircle size={12} />
                                                        <span>{lesson.duration}m</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CoursePlayer;
