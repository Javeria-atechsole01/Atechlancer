import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Video, Plus, Star, Edit, Trash2, Loader2 } from 'lucide-react';
import { courseService } from '../../../services/courseService';
import './teacher.css';

const TeacherCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTeacherCourses();
    }, []);

    const fetchTeacherCourses = async () => {
        try {
            // In a real app, we'd have a specific endpoint for teacher courses
            // For now, we filter all courses by teacherId (this logic usually happens on backend)
            // But since our getCourses controller supports teacherId if we added it, 
            // we'll just fetch all and simulate for the demo if needed, 
            // or assume we have a way. 
            // BETTER: Use courseService to get all and filter here for MVP.
            const data = await courseService.getAll();
            // Assuming current user is a teacher, we'd filter or the backend would handle it.
            setCourses(data);
        } catch (error) {
            console.error('Error fetching teacher courses:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">My Courses</h1>
                    <p className="page-description">Create and manage your educational content.</p>
                </div>
                <button className="btn btn-primary flex items-center gap-2">
                    <Plus size={18} /> New Course
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12"><Loader2 className="animate-spin" /></div>
            ) : (
                <div className="card-grid">
                    {courses.map(course => (
                        <div key={course._id} className="card course-card-horizontal">
                            <img src={course.thumbnail || '/placeholder-course.jpg'} alt="" className="course-thumb" />
                            <div className="course-info flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <span className="tag mb-2">{course.category}</span>
                                        <h3 className="text-lg font-bold text-gray-900">{course.title}</h3>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black">${course.price}</div>
                                        <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                            <Star size={14} fill="currentColor" /> {course.rating}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-6 mt-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1"><Users size={16} /> {course.enrolledStudentsCount} Students</div>
                                    <div className="flex items-center gap-1"><Video size={16} /> {course.sections?.reduce((a, s) => a + s.lessons.length, 0)} Lessons</div>
                                </div>

                                <div className="flex gap-2 mt-6">
                                    <button className="btn border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button className="btn border border-red-100 text-red-500 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .course-card-horizontal {
                    display: flex;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    background: white;
                    border-radius: 16px;
                    border: 1px solid var(--gray-100);
                }
                .course-thumb {
                    width: 200px;
                    height: 120px;
                    object-fit: cover;
                    border-radius: 12px;
                }
                .flex-row-gap { display: flex; align-items: center; }
                .gap-sm { gap: 0.5rem; }
            `}</style>
        </div>
    );
};

export default TeacherCourses;
