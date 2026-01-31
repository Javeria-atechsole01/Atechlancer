import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, DollarSign, CheckCircle } from 'lucide-react';

const FreelancerAssignments = () => {
    // Mock Data for Assignments - Will connect to API later
    const [assignments] = useState([
        {
            id: 1,
            title: 'Data Structures Implementation in C++',
            student: 'Ali Khan',
            subject: 'Computer Science',
            deadline: '2 Days',
            budget: 50,
            status: 'Open',
            description: 'Need help implementing AVL Trees and Red-Black Trees with traversal methods.'
        },
        {
            id: 2,
            title: 'React Native Mobile App Debugging',
            student: 'Sara Ahmed',
            subject: 'Mobile Dev',
            deadline: '5 Days',
            budget: 120,
            status: 'Open',
            description: 'Fixing navigation issues and optimizing performance in a managed Expo project.'
        },
        {
            id: 3,
            title: 'Thesis Proofreading & Formatting',
            student: 'Bilal Tech',
            subject: 'English',
            deadline: '1 Week',
            budget: 40,
            status: 'In Progress',
            description: 'Reviewing a 50-page thesis for grammar, flow, and APA formatting compliance.'
        }
    ]);

    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredAssignments = assignments.filter(a => {
        const matchesStatus = filter === 'All' || a.status === filter;
        const matchesSearch =
            a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            a.description.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Find Assignments</h1>
                    <p className="page-description">Browse and bid on academic and technical tasks posted by students.</p>
                </div>
                <button className="btn btn-primary">
                    Search Filters
                </button>
            </div>

            {/* Stats Overview */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon bg-blue-100 text-blue-600">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <div className="stat-value">{assignments.filter(a => a.status === 'Open').length}</div>
                        <div className="stat-label">Available Tasks</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon bg-green-100 text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <div className="stat-value">$170</div>
                        <div className="stat-label">Potential Earnings</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon bg-purple-100 text-purple-600">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <div className="stat-value">1</div>
                        <div className="stat-label">Active Bids</div>
                    </div>
                </div>
            </div>

            {/* Search & Filter */}
            <div className="card mb-xl">
                <div className="flex-row-gap">
                    <div className="search-box" style={{ flex: 1, position: 'relative' }}>
                        <Search className="search-icon" size={20} />
                        <input
                            type="text"
                            placeholder="Search by subject or keyword..."
                            className="search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <select
                        className="search-input"
                        style={{ width: 'auto' }}
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="All">All Status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Assignments List */}
            <div className="flex-col gap-md">
                {filteredAssignments.map(assignment => (
                    <div key={assignment.id} className="card hover-card">
                        <div className="assignment-card">
                            <div>
                                <div className="flex-row-gap mb-sm">
                                    <span className="tag tag-blue">{assignment.subject}</span>
                                    <span className={`tag ${assignment.status === 'Open' ? 'tag-green' : 'tag-orange'}`}>
                                        {assignment.status}
                                    </span>
                                </div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                    {assignment.title}
                                </h3>
                                <p className="text-muted mb-md" style={{ maxWidth: '600px' }}>
                                    {assignment.description}
                                </p>
                                <div className="assignment-meta">
                                    <span className="flex-row-gap gap-sm">
                                        <Clock size={16} /> Deadline: {assignment.deadline}
                                    </span>
                                    <span className="flex-row-gap gap-sm">
                                        <BookOpen size={16} /> Student: {assignment.student}
                                    </span>
                                </div>
                            </div>

                            <div className="price-tag">
                                <div className="price-amount mb-sm">
                                    ${assignment.budget}
                                </div>
                                <div className="price-label mb-md">Fixed Price</div>
                                <button className="btn btn-outline w-full">View Details</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FreelancerAssignments;
