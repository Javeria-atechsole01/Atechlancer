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
                <div className="assignment-feed-header">
                    <div>
                        <h1 className="assignment-feed-title">
                            Assignment <span className="assignment-feed-title-accent">Marketplace</span>
                        </h1>
                        <p className="assignment-feed-subtitle">Browse open assignments and submit your expertise</p>
                    </div>

                    <div className="assignment-search-container">
                        <Search className="assignment-search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by title or subject..."
                            className="search-input assignment-search-input"
                        />
                    </div>
                </div>

                <div className="details-layout">
                    {/* Filters Sidebar */}
                    <aside className="sticky-sidebar">
                        <div className="assignment-card">
                            <div className="filter-header">
                                <Filter size={20} className="filter-header-icon" />
                                <h3 className="filter-header-title">Filters</h3>
                            </div>

                            <div className="filter-form-stack">
                                <div className="form-group">
                                    <label className="filter-label">Subject</label>
                                    <select name="subject" value={filters.subject} onChange={handleFilterChange} className="search-input w-full">
                                        <option value="">All Subjects</option>
                                        <option>Computer Science</option>
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Business & Finance</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="filter-label">Academic Level</label>
                                    <select name="academicLevel" value={filters.academicLevel} onChange={handleFilterChange} className="search-input w-full">
                                        <option value="">All Levels</option>
                                        <option>High School</option>
                                        <option>Undergraduate</option>
                                        <option>Graduate</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="filter-label">Budget Range ($)</label>
                                    <div className="filter-budget-row">
                                        <input type="number" name="minBudget" placeholder="Min" value={filters.minBudget} onChange={handleFilterChange} className="search-input w-full" />
                                        <input type="number" name="maxBudget" placeholder="Max" value={filters.maxBudget} onChange={handleFilterChange} className="search-input w-full" />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setFilters({ subject: '', academicLevel: '', minBudget: '', maxBudget: '' })}
                                    className="btn btn-secondary filter-clear-button"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Assignment List */}
                    <div className="main-content">
                        {loading ? (
                            <div className="loading-center">
                                <Loader2 className="animate-spin loading-spinner" size={48} />
                            </div>
                        ) : assignments.length > 0 ? (
                            <div className="assignment-grid">
                                {assignments.map((assignment) => (
                                    <AssignmentCard key={assignment._id} assignment={assignment} />
                                ))}
                            </div>
                        ) : (
                            <div className="assignment-card empty-state-card">
                                <h3 className="empty-state-title">No Assignments Found</h3>
                                <p className="empty-state-text">Try adjusting your filters or search terms.</p>
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
            className="assignment-card assignment-card-clickable"
        >
            <div className="assignment-meta-badges">
                <span className="badge-base badge-primary">
                    {assignment.subject}
                </span>
                <span className="badge-base badge-navy">
                    {assignment.academicLevel}
                </span>
            </div>
            <h2 className="assignment-card-title">
                {assignment.title}
            </h2>
            <p className="assignment-card-description">
                {assignment.description}
            </p>

            <div className="assignment-card-footer">
                <div className="assignment-budget">
                    ${assignment.budget?.min} - ${assignment.budget?.max}
                </div>
                <div className="btn btn-primary assignment-view-button">
                    View Details
                </div>
            </div>
        </div>
    );
};


export default AssignmentFeed;
