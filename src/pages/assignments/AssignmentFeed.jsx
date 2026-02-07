import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import { Loader2, Search, Filter, BookOpen, Clock, DollarSign, ArrowRight } from 'lucide-react';
import './assignments.css';

const AssignmentFeed = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        subject: '',
        academicLevel: '',
        minBudget: '',
        maxBudget: ''
    });

    useEffect(() => {
        loadAssignments();
    }, [filters]);

    const loadAssignments = async () => {
        setLoading(true);
        try {
            const data = await assignmentService.getAll(filters);
            setAssignments(data);
        } catch (error) {
            console.error("Failed to load assignments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="assignment-details-page">
            <div className="details-container">
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ marginBottom: '2rem' }}>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary-900)' }}>Assignment <span style={{ color: 'var(--primary-600)' }}>Marketplace</span></h1>
                        <p style={{ fontSize: '1.125rem', color: 'var(--gray-500)' }}>Browse open assignments and submit your expertise</p>
                    </div>

                    <div style={{ position: 'relative', maxWidth: '600px' }}>
                        <Search style={{ position: 'absolute', left: '16px', top: '16px', color: 'var(--gray-400)' }} size={20} />
                        <input
                            type="text"
                            placeholder="Search by title or subject..."
                            className="search-input"
                            style={{ paddingLeft: '3rem', height: '52px', fontSize: '1rem', width: '100%' }}
                        />
                    </div>
                </div>

                <div className="details-layout">
                    {/* Filters Sidebar */}
                    <aside className="sticky-sidebar">
                        <div className="assignment-card">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--gray-50)' }}>
                                <Filter size={20} style={{ color: 'var(--primary-600)' }} />
                                <h3 style={{ fontWeight: 800, color: 'var(--primary-900)' }}>Filters</h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>Subject</label>
                                    <select name="subject" value={filters.subject} onChange={handleFilterChange} className="search-input w-full">
                                        <option value="">All Subjects</option>
                                        <option>Computer Science</option>
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Business & Finance</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>Academic Level</label>
                                    <select name="academicLevel" value={filters.academicLevel} onChange={handleFilterChange} className="search-input w-full">
                                        <option value="">All Levels</option>
                                        <option>High School</option>
                                        <option>Undergraduate</option>
                                        <option>Graduate</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>Budget Range ($)</label>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <input type="number" name="minBudget" placeholder="Min" value={filters.minBudget} onChange={handleFilterChange} className="search-input w-full" />
                                        <input type="number" name="maxBudget" placeholder="Max" value={filters.maxBudget} onChange={handleFilterChange} className="search-input w-full" />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setFilters({ subject: '', academicLevel: '', minBudget: '', maxBudget: '' })}
                                    className="btn btn-secondary"
                                    style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }}
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Assignment List */}
                    <div className="main-content">
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                                <Loader2 className="animate-spin" style={{ color: 'var(--primary-600)' }} size={48} />
                            </div>
                        ) : assignments.length > 0 ? (
                            <div className="assignment-grid">
                                {assignments.map((assignment) => (
                                    <AssignmentCard key={assignment._id} assignment={assignment} />
                                ))}
                            </div>
                        ) : (
                            <div className="assignment-card" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>No Assignments Found</h3>
                                <p style={{ color: 'var(--gray-500)' }}>Try adjusting your filters or search terms.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AssignmentCard = ({ assignment }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/assignments/${assignment._id}`)}
            className="assignment-card"
            style={{ cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', position: 'relative', display: 'flex', flexDirection: 'column' }}
            onMouseOver={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-lg)'}
            onMouseOut={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}
        >
            <div className="assignment-meta-badges">
                <span className="badge-base badge-primary">
                    {assignment.subject}
                </span>
                <span className="badge-base badge-navy">
                    {assignment.academicLevel}
                </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                {assignment.title}
            </h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6 }}>
                {assignment.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--gray-50)' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-600)' }}>
                    ${assignment.budget?.min} - ${assignment.budget?.max}
                </div>
                <div className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem', borderRadius: '10px' }}>
                    View Details
                </div>
            </div>
        </div>
    );
};


export default AssignmentFeed;
