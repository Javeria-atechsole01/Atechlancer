import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import {
    Search, Filter, MoreVertical, Ban, CheckCircle,
    XCircle, Loader2, AlertCircle, Mail, User
} from 'lucide-react';
import './../../admin/admin.css';

const UserManagementPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        role: 'all',
        status: 'all',
        search: '',
        page: 1,
        limit: 20
    });
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadUsers();
    }, [filters]);

    const loadUsers = async () => {
        setLoading(true);
        try {
            const data = await adminService.getUsers(filters);
            setUsers(data.users || []);
            setHasMore(data.hasMore || false);
        } catch (error) {
            console.error('Failed to load users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (userId, newStatus) => {
        try {
            await adminService.updateUserStatus(userId, newStatus);
            loadUsers(); // Reload users
        } catch (error) {
            console.error('Failed to update user status:', error);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            active: { class: 'status-badge success', icon: <CheckCircle size={14} />, text: 'Active' },
            suspended: { class: 'status-badge warning', icon: <Ban size={14} />, text: 'Suspended' },
            banned: { class: 'status-badge error', icon: <XCircle size={14} />, text: 'Banned' }
        };

        const badge = badges[status] || badges.active;

        return (
            <span className={badge.class}>
                {badge.icon}
                {badge.text}
            </span>
        );
    };

    return (
        <div className="admin-page-container">
            <div className="admin-page-hero">
                <h1>User Management</h1>
                <p>Maintain platform sovereignty by overseeing user accounts, roles, and access states</p>
            </div>

            {/* Filters Bar */}
            <div className="admin-filters-bar" style={{ marginBottom: '2rem' }}>
                <div className="admin-search-box" style={{ maxWidth: '400px' }}>
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search users by name, email or ID..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Role:</span>
                        <select
                            className="admin-select"
                            value={filters.role}
                            onChange={(e) => setFilters({ ...filters, role: e.target.value, page: 1 })}
                            style={{ minWidth: '140px' }}
                        >
                            <option value="all">Every Role</option>
                            <option value="student">Student</option>
                            <option value="freelancer">Freelancer</option>
                            <option value="teacher">Teacher</option>
                            <option value="employer">Employer</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase' }}>Status:</span>
                        <select
                            className="admin-select"
                            value={filters.status}
                            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                            style={{ minWidth: '140px' }}
                        >
                            <option value="all">Any Status</option>
                            <option value="active">Active</option>
                            <option value="suspended">Suspended</option>
                            <option value="banned">Banned</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="admin-table-container">
                {loading ? (
                    <div className="admin-loading-state">
                        <Loader2 className="animate-spin text-primary-500" size={40} />
                        <p>Syncing user accounts...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="admin-empty-state">
                        <AlertCircle size={48} />
                        <h3>No users found</h3>
                        <p>Try adjusting your search filters.</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Identity</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Registered</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '42px',
                                                height: '42px',
                                                borderRadius: '12px',
                                                background: 'linear-gradient(135deg, var(--primary-100) 0%, var(--primary-200) 100%)',
                                                color: 'var(--primary-700)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 800,
                                                fontSize: '1rem',
                                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                            }}>
                                                {u.name?.charAt(0)}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, color: 'var(--admin-primary)', fontSize: '0.95rem' }}>{u.name}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)', fontWeight: 600 }}>{u.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-badge info`} style={{ textTransform: 'capitalize', fontWeight: 700 }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${u.status === 'active' ? 'success' : u.status === 'suspended' ? 'warning' : 'danger'}`} style={{ fontWeight: 700 }}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gray-500)' }}>
                                        {new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {u.status === 'active' ? (
                                                <button
                                                    className="admin-icon-btn"
                                                    onClick={() => handleStatusChange(u._id, 'suspended')}
                                                    title="Suspend Account"
                                                >
                                                    <Ban size={16} />
                                                </button>
                                            ) : (
                                                <button
                                                    className="admin-icon-btn"
                                                    onClick={() => handleStatusChange(u._id, 'active')}
                                                    title="Reactivate Account"
                                                >
                                                    <CheckCircle size={16} />
                                                </button>
                                            )}
                                            <button
                                                className="admin-icon-btn danger"
                                                onClick={() => handleStatusChange(u._id, 'banned')}
                                                title="Hard Ban"
                                            >
                                                <XCircle size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination Controls */}
            {!loading && users.length > 0 && (
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
                    <button
                        className="admin-btn admin-btn-outline"
                        style={{ padding: '0.5rem 1rem' }}
                        disabled={filters.page === 1}
                        onClick={() => setFilters(f => ({ ...f, page: f.page - 1 }))}
                    >
                        Previous
                    </button>
                    <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>Page {filters.page}</span>
                    <button
                        className="admin-btn admin-btn-outline"
                        style={{ padding: '0.5rem 1rem' }}
                        disabled={!hasMore}
                        onClick={() => setFilters(f => ({ ...f, page: f.page + 1 }))}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserManagementPanel;
