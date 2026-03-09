import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import {
    Search, Filter, Star, Clock, BookOpen, ChevronRight, Loader2, CheckCircle,
    TrendingUp, History, ShieldCheck, LayoutDashboard, Briefcase
} from 'lucide-react';
import '../courses.css';

const CourseListing = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        level: '',
        price: 'all',
        rating: 0,
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

    const categories = [
        { name: 'Web Development', icon: <BookOpen size={16} /> },
        { name: 'Mobile Development', icon: <History size={16} /> },
        { name: 'Data Science', icon: <TrendingUp size={16} /> },
        { name: 'AI & Machine Learning', icon: <ShieldCheck size={16} /> },
        { name: 'Design', icon: <LayoutDashboard size={16} /> },
        { name: 'Business', icon: <Briefcase size={16} /> }
    ];
    const levels = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
    const ratings = [4.5, 4.0, 3.5, 3.0];

    return (
        <div className="courses-page">
            <div className="courses-container">
                <header className="courses-hero">
                    <div className="hero-content">
                        <h1 className="hero-title">Nexus Learning Marketplace</h1>
                        <p className="hero-subtitle">Upskill with premium architectural patterns and industry-standard courses</p>
                    </div>
                </header>

                <div className="courses-layout">
                    {/* Sidebar Filters */}
                    <aside className="course-sidebar-premium">
                        <div className="sidebar-section">
                            <h3 className="section-title">Strategic Search</h3>
                            <div className="sidebar-search-box">
                                <Search size={18} />
                                <input
                                    type="text"
                                    placeholder="Search modules..."
                                    value={filters.search}
                                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="section-title">Domains</h3>
                            <div className="sidebar-options">
                                <button
                                    className={`sidebar-option-btn ${!filters.category ? 'active' : ''}`}
                                    onClick={() => setFilters({ ...filters, category: '' })}
                                >
                                    <div className="option-icon-wrap">
                                        <Filter size={14} />
                                    </div>
                                    <span>All Domains</span>
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.name}
                                        className={`sidebar-option-btn ${filters.category === cat.name ? 'active' : ''}`}
                                        onClick={() => setFilters({ ...filters, category: cat.name })}
                                    >
                                        <div className="option-icon-wrap">
                                            {cat.icon}
                                        </div>
                                        <span>{cat.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="section-title">Price Engine</h3>
                            <div className="sidebar-pill-filters">
                                {['all', 'free', 'paid'].map(p => (
                                    <button
                                        key={p}
                                        className={`sidebar-pill ${filters.price === p ? 'active' : ''}`}
                                        onClick={() => setFilters({ ...filters, price: p })}
                                    >
                                        {p.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="section-title">Competency Level</h3>
                            <div className="sidebar-options">
                                {levels.map(lvl => (
                                    <button
                                        key={lvl}
                                        className={`sidebar-option-btn ${filters.level === lvl ? 'active' : ''}`}
                                        onClick={() => setFilters({ ...filters, level: lvl })}
                                    >
                                        <span>{lvl}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="sidebar-section">
                            <h3 className="section-title">Quality Rating</h3>
                            <div className="sidebar-options">
                                {ratings.map(r => (
                                    <button
                                        key={r}
                                        className={`sidebar-option-btn ${filters.rating === r ? 'active' : ''}`}
                                        onClick={() => setFilters({ ...filters, rating: r })}
                                    >
                                        <div className="flex items-center gap-1">
                                            <Star size={14} fill="var(--warning-500)" color="var(--warning-500)" />
                                            <span>{r}+ Stars</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            className="sidebar-clear-btn"
                            onClick={() => setFilters({ category: '', level: '', price: 'all', rating: 0, search: '' })}
                        >
                            Reset System Filters
                        </button>
                    </aside>

                    {/* Main Content */}
                    <main className="course-main-content">
                        {loading ? (
                            <div className="courses-loading">
                                <Loader2 className="animate-spin" size={48} />
                                <p>Syncing Marketplace Data...</p>
                            </div>
                        ) : courses.length > 0 ? (
                            <div className="course-grid">
                                {courses.map(course => (
                                    <Link to={`/courses/${course._id}`} key={course._id} className="course-card-premium">
                                        <div className="card-thumb-wrap">
                                            <img src={course.thumbnail || '/placeholder-course.jpg'} alt={course.title} />
                                            <span className="card-level-badge">{course.level}</span>
                                        </div>
                                        <div className="card-body">
                                            <div className="card-header">
                                                <span className="card-category">{course.category}</span>
                                                <div className="card-rating">
                                                    <Star size={14} fill="var(--warning-500)" color="var(--warning-500)" />
                                                    <span>{course.rating}</span>
                                                </div>
                                            </div>
                                            <h3 className="card-title">{course.title}</h3>

                                            <div className="card-meta">
                                                <div className="meta-item">
                                                    <BookOpen size={14} />
                                                    <span>{course.sections?.reduce((acc, s) => acc + s.lessons.length, 0) || 0} Lessons</span>
                                                </div>
                                                <div className="meta-item">
                                                    <Clock size={14} />
                                                    <span>{course.duration || 'Flex'}</span>
                                                </div>
                                            </div>

                                            <div className="card-footer">
                                                <div className="card-price">
                                                    {course.price === 0 ? <span className="free">FREE</span> : `$${course.price}`}
                                                </div>
                                                <button className="card-view-btn">
                                                    View Cell <ChevronRight size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="courses-empty-state">
                                <div className="empty-icon-box">
                                    <Filter size={64} />
                                </div>
                                <h3>No Modules Found</h3>
                                <p>No courses match your strategic filters.</p>
                                <button
                                    className="admin-btn"
                                    onClick={() => setFilters({ category: '', level: '', price: 'all', rating: 0, search: '' })}
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
