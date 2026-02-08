import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import {
    Search, Filter, Star, Clock, BookOpen, ChevronRight, Loader2, CheckCircle
} from 'lucide-react';
import '../courses.css';

const CourseListing = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        search: ''
    });

    useEffect(() => {
        fetchCourses();
    }, [filters]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const data = await courseService.getAll(filters);
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['Web Development', 'Mobile Development', 'Data Science', 'AI & Machine Learning', 'Design', 'Business', 'Marketing'];
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

    return (
        <div className="courses-page">
            <div className="courses-container">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Courses</h1>
                    <p className="text-gray-600">Learn from industry experts and build your professional portfolio.</p>
                </header>

                <div className="courses-layout">
                    {/* Sidebar Filters */}
                    <aside className="course-filters">
                        <div className="filter-group">
                            <h3 className="filter-title">Search</h3>
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Categories</h3>
                            <div className="space-y-1">
                                <div
                                    className={`filter-option ${!filters.category ? 'text-primary-600 font-bold' : ''}`}
                                    onClick={() => setFilters({ ...filters, category: '' })}
                                >
                                    All Categories
                                </div>
                                {categories.map(cat => (
                                    <div
                                        key={cat}
                                        className={`filter-option ${filters.category === cat ? 'text-primary-600 font-bold' : ''}`}
                                        onClick={() => setFilters({ ...filters, category: cat })}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Level</h3>
                            <div className="space-y-1">
                                {levels.map(lvl => (
                                    <div
                                        key={lvl}
                                        className={`filter-option ${filters.level === lvl ? 'text-primary-600 font-bold' : ''}`}
                                        onClick={() => setFilters({ ...filters, level: lvl })}
                                    >
                                        {lvl}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main>
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <Loader2 className="animate-spin text-primary-600" size={48} />
                            </div>
                        ) : courses.length > 0 ? (
                            <div className="course-grid">
                                {courses.map(course => (
                                    <Link to={`/courses/${course._id}`} key={course._id} className="course-card">
                                        <img src={course.thumbnail || '/placeholder-course.jpg'} alt={course.title} className="course-card-image" />
                                        <div className="course-card-content">
                                            <span className="course-card-category">{course.category}</span>
                                            <h3 className="course-card-title">{course.title}</h3>

                                            <div className="flex items-center gap-1 mb-3">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={14} fill={i < Math.floor(course.rating) ? "currentColor" : "none"} />
                                                    ))}
                                                </div>
                                                <span className="text-xs font-bold text-gray-700">{course.rating}</span>
                                                <span className="text-xs text-gray-400">({course.reviewCount})</span>
                                            </div>

                                            <div className="course-card-meta">
                                                <div className="flex items-center gap-1">
                                                    <BookOpen size={14} />
                                                    <span>{course.sections?.reduce((acc, s) => acc + s.lessons.length, 0) || 0} Lessons</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Clock size={14} />
                                                    <span>{course.sections?.reduce((acc, s) => acc + s.lessons.reduce((lt, l) => lt + l.duration, 0), 0) || 0}m</span>
                                                </div>
                                            </div>

                                            <div className="course-card-footer">
                                                <div className="course-card-price">
                                                    {course.price === 0 ? 'Free' : `$${course.price}`}
                                                </div>
                                                <div className="flex items-center text-primary-600 font-bold text-sm">
                                                    View Details <ChevronRight size={16} />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                                <div className="mb-4 flex justify-center text-gray-300">
                                    <Filter size={64} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
                                <p className="text-gray-500">Try adjusting your filters to find what you're looking for.</p>
                                <button
                                    className="mt-6 px-6 py-2 bg-primary-600 text-white rounded-lg font-bold"
                                    onClick={() => setFilters({ category: '', level: '', search: '' })}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CourseListing;
