import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Video, Plus, Star, Edit, Trash2, Loader2 } from 'lucide-react';
import { courseService } from '../../../services/courseService';
import { authService } from '../../../services/authService';
import { useSearchParams } from 'react-router-dom';
import './teacher.css';

const TeacherCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [searchParams] = useSearchParams();
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        thumbnail: '',
        category: 'Web Development',
        level: 'Beginner'
    });

    useEffect(() => {
        fetchTeacherCourses();
    }, []);

    useEffect(() => {
        if (searchParams.get('new') === '1') {
            openCreate();
        }
    }, [searchParams]);

    const fetchTeacherCourses = async () => {
        try {
            const data = await courseService.getAll();
            const currentUser = authService.getCurrentUser();
            const myId = currentUser?._id || currentUser?.userId || currentUser?.id;
            const mine = myId ? data.filter(c => (c.teacherId?._id || c.teacherId) === myId) : data;
            setCourses(mine);
        } catch (error) {
            console.error('Error fetching teacher courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const openCreate = () => {
        setEditingCourse(null);
        setForm({
            title: '',
            description: '',
            price: '',
            thumbnail: '',
            category: 'Web Development',
            level: 'Beginner'
        });
        setShowModal(true);
    };

    const openEdit = (course) => {
        setEditingCourse(course);
        setForm({
            title: course.title || '',
            description: course.description || '',
            price: String(course.price ?? ''),
            thumbnail: course.thumbnail || '',
            category: course.category || 'Web Development',
            level: course.level || 'Beginner'
        });
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                title: form.title,
                description: form.description,
                price: parseFloat(form.price || 0),
                thumbnail: form.thumbnail,
                category: form.category,
                level: form.level,
                whatYouWillLearn: [],
                requirements: [],
                sections: []
            };

            if (editingCourse) {
                await courseService.updateCourse(editingCourse._id, payload);
            } else {
                await courseService.createCourse(payload);
            }

            setShowModal(false);
            setEditingCourse(null);
            setLoading(true);
            await fetchTeacherCourses();
        } catch (error) {
            alert(error?.response?.data?.message || 'Failed to save course');
        }
    };

    const handleDelete = async (id) => {
        try {
            await courseService.deleteCourse(id);
        } catch (error) {
            console.error(error);
        }
        setCourses(prev => prev.filter(c => c._id !== id));
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">My Courses</h1>
                    <p className="page-description">Create and manage your educational content.</p>
                </div>
                <button className="btn btn-primary flex items-center gap-2" onClick={openCreate}>
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

                                <div className="course-actions">
                                    <button className="btn border border-gray-200 rounded-lg text-sm font-bold flex items-center gap-2" onClick={() => openEdit(course)}>
                                        <Edit size={16} /> Edit
                                    </button>
                                    <button className="btn border border-red-100 text-red-500 rounded-lg text-sm font-bold flex items-center gap-2" onClick={() => handleDelete(course._id)}>
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>
                            {editingCourse ? 'Edit Course' : 'Create New Course'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="form-label">Title</label>
                                <input
                                    className="search-input w-full"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="form-label">Description</label>
                                <textarea
                                    className="search-input w-full"
                                    style={{ minHeight: '120px' }}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Price (USD)</label>
                                    <input
                                        type="number"
                                        className="search-input w-full"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        placeholder="e.g. 160"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Thumbnail URL</label>
                                    <input
                                        className="search-input w-full"
                                        value={form.thumbnail}
                                        onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                                        placeholder="https://image.url/thumbnail.jpg"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Category</label>
                                    <select
                                        className="search-input w-full"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    >
                                        <option>Web Development</option>
                                        <option>Mobile Development</option>
                                        <option>Data Science</option>
                                        <option>AI & Machine Learning</option>
                                        <option>Design</option>
                                        <option>Business</option>
                                        <option>Marketing</option>
                                        <option>Photography</option>
                                        <option>Music</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Level</label>
                                    <select
                                        className="search-input w-full"
                                        value={form.level}
                                        onChange={(e) => setForm({ ...form, level: e.target.value })}
                                    >
                                        <option>Beginner</option>
                                        <option>Intermediate</option>
                                        <option>Advanced</option>
                                        <option>All Levels</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-end mt-2">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">
                                    {editingCourse ? 'Save Changes' : 'Create Course'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style>{`
                .course-card-horizontal {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    padding: 1.5rem;
                    background: white;
                    border-radius: 16px;
                    border: 1px solid var(--gray-100);
                    overflow: hidden;
                }
                .course-thumb {
                    width: 100%;
                    height: auto;
                    aspect-ratio: 16/9;
                    object-fit: cover;
                    border-radius: 12px;
                }
                .course-info {
                    overflow: hidden;
                    word-break: break-word;
                }
                .course-actions {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 0.75rem;
                }
                .course-card-horizontal .btn {
                    padding: 0.4rem 0.6rem;
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    font-size: 0.8125rem;
                }
                .flex-row-gap { display: flex; align-items: center; }
                .gap-sm { gap: 0.5rem; }
                .modal-backdrop {
                    position: fixed;
                    inset: 0;
                    background: rgba(0,0,0,0.25);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    z-index: 50;
                }
                .modal-card {
                    background: white;
                    border-radius: 16px;
                    border: 1px solid var(--gray-100);
                    padding: 1.5rem;
                    max-width: 720px;
                    width: 100%;
                    max-height: 90vh;
                    overflow-y: auto;
                }
                .modal-card::-webkit-scrollbar {
                    width: 10px;
                }
                .modal-card::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 8px;
                }
                .modal-card::-webkit-scrollbar-thumb {
                    background: #c1c1c1;
                    border-radius: 8px;
                }
                .modal-card::-webkit-scrollbar-thumb:hover {
                    background: #a6a6a6;
                }
            `}</style>
        </div>
    );
};

export default TeacherCourses;
