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
        <div className="assignment-feed">
            <div className="container">
                <div className="jobs-header">
                    <div className="jobs-title-section">
                        <h1>Assignment <span>Marketplace</span></h1>
                        <p>Browse open assignments and submit your expertise</p>
                    </div>

                    <div className="search-container">
                        <Search className="search-icon" size={18} />
                        <input
                            type="text"
                            placeholder="Search by title or subject..."
                            className="form-input"
                            style={{ paddingLeft: '2.5rem' }}
                        />
                    </div>
                </div>

                <div className="jobs-grid-layout">
                    {/* Filters Sidebar */}
                    <div className="filter-sidebar">
                        <div className="filter-card">
                            <div className="filter-header">
                                <Filter size={20} />
                                <h3>Filters</h3>
                            </div>

                            <div className="filter-content">
                                <div className="filter-group">
                                    <label className="filter-label">Subject</label>
                                    <select name="subject" value={filters.subject} onChange={handleFilterChange} className="form-input">
                                        <option value="">All Subjects</option>
                                        <option>Computer Science</option>
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Business & Finance</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label className="filter-label">Academic Level</label>
                                    <select name="academicLevel" value={filters.academicLevel} onChange={handleFilterChange} className="form-input">
                                        <option value="">All Levels</option>
                                        <option>High School</option>
                                        <option>Undergraduate</option>
                                        <option>Graduate</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label className="filter-label">Budget Range</label>
                                    <div className="budget-inputs">
                                        <input type="number" name="minBudget" placeholder="Min" value={filters.minBudget} onChange={handleFilterChange} className="form-input" />
                                        <input type="number" name="maxBudget" placeholder="Max" value={filters.maxBudget} onChange={handleFilterChange} className="form-input" />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setFilters({ subject: '', academicLevel: '', minBudget: '', maxBudget: '' })}
                                    className="btn btn-secondary"
                                    style={{ width: '100%', marginTop: '1rem' }}
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Assignment List */}
                    <div className="jobs-list-section">
                        {loading ? (
                            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
                                <Loader2 className="animate-spin" style={{ color: 'var(--primary-600)' }} size={40} />
                            </div>
                        ) : assignments.length > 0 ? (
                            <div className="assignment-grid">
                                {assignments.map((assignment) => (
                                    <AssignmentCard key={assignment._id} assignment={assignment} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <h3>No Assignments Found</h3>
                                <p>Try adjusting your filters or search terms.</p>
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
            className="filter-card"
            style={{ cursor: 'pointer', transition: 'box-shadow 0.2s' }}
        >
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--primary-50)', color: 'var(--primary-600)', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700' }}>
                    {assignment.subject}
                </span>
                <span style={{ padding: '0.25rem 0.75rem', backgroundColor: 'var(--gray-100)', color: 'var(--gray-700)', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '700' }}>
                    {assignment.academicLevel}
                </span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-600)', marginBottom: '0.5rem' }}>
                {assignment.title}
            </h2>
            <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {assignment.description}
            </p>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <div style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--accent-500)' }}>
                    ${assignment.budget.min} - ${assignment.budget.max}
                </div>
                <div className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    View
                </div>
            </div>
        </div>
    );
};


export default AssignmentFeed;
