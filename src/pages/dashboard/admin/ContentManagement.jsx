import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import {
    Briefcase, BookOpen, Trash2, ExternalLink,
    Search, Filter, Loader2, AlertCircle
} from 'lucide-react';
import './../../admin/admin.css';

const ContentManagement = () => {
    const [activeTab, setActiveTab] = useState('gigs');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        { id: 'gigs', label: 'Gigs/Services', icon: <Briefcase size={18} /> },
        { id: 'jobs', label: 'Jobs', icon: <Briefcase size={18} /> },
        { id: 'assignments', label: 'Assignments', icon: <BookOpen size={18} /> },
        { id: 'courses', label: 'Courses', icon: <BookOpen size={18} /> }
    ];

    useEffect(() => {
        loadContent();
    }, [activeTab]);

    const loadContent = async () => {
        setLoading(true);
        try {
            let data = [];
            switch (activeTab) {
                case 'gigs': data = await adminService.getAllGigs(); break;
                case 'jobs': data = await adminService.getAllJobs(); break;
                case 'assignments': data = await adminService.getAllAssignments(); break;
                case 'courses': data = await adminService.getAllCourses(); break;
                default: break;
            }
            setItems(data);
        } catch (error) {
            console.error('Failed to load content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item? This action is irreversible.')) return;

        try {
            switch (activeTab) {
                case 'gigs': await adminService.deleteGig(id); break;
                case 'jobs': await adminService.deleteJob(id); break;
                case 'assignments': await adminService.deleteAssignment(id); break;
                case 'courses': await adminService.deleteCourse(id); break;
                default: break;
            }
            setItems(items.filter(item => item._id !== id));
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    const filteredItems = items.filter(item =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <div>
                    <h1>Content Management</h1>
                    <p>Monitor and moderate platform-wide listings and modules</p>
                </div>
            </header>

            {/* Tabs */}
            <div className="admin-tab-nav">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`admin-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Search & Filters */}
            <div className="admin-filters-bar">
                <div className="admin-search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder={`Search ${activeTab}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* List */}
            <div className="admin-table-container">
                {loading ? (
                    <div className="admin-loading-state">
                        <Loader2 className="animate-spin text-primary-500" size={40} />
                        <p>Loading {activeTab} content...</p>
                    </div>
                ) : filteredItems.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Listing Details</th>
                                <th>Owner</th>
                                <th>Category</th>
                                <th>Economics</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map(item => (
                                <tr key={item._id}>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                            <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{item.title}</span>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)', maxWidth: '300px', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {item.description}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--gray-700)' }}>
                                                {item.sellerId?.name || item.employerId?.name || item.studentId?.name || item.teacherId?.name || 'Unknown'}
                                            </span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>
                                                {item.sellerId?.email || item.employerId?.email || item.studentId?.email || item.teacherId?.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className="admin-badge info">
                                            {item.category || item.subject || 'General'}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>
                                            {item.price ? `$${item.price}` :
                                                item.budget?.min ? `$${item.budget.min} - $${item.budget.max}` :
                                                    item.budget ? `$${item.budget}` : 'N/A'}
                                        </div>
                                    </td>
                                    <td>{new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="admin-icon-btn" title="View Detail">
                                                <ExternalLink size={16} />
                                            </button>
                                            <button
                                                className="admin-icon-btn danger"
                                                title="Remove Listing"
                                                onClick={() => handleDelete(item._id)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty-state">
                        <AlertCircle size={48} />
                        <h3>No results found</h3>
                        <p>We couldn't find any {activeTab} matching "{searchTerm}"</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContentManagement;
