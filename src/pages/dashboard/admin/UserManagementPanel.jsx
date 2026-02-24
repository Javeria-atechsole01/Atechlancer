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
            <header className="admin-page-header">
                <div>
                    <h1>User Management</h1>
                    <p>Review and control user accounts across roles</p>
                </div>
            </header>

            {/* Filters Bar */}
            <div className="admin-filters-bar">
                <div className="admin-search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                    />
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        className="admin-select"
                        value={filters.role}
                        onChange={(e) => setFilters({ ...filters, role: e.target.value, page: 1 })}
                    >
                        <option value="all">Every Role</option>
                        <option value="student">Student</option>
                        <option value="freelancer">Freelancer</option>
                        <option value="teacher">Teacher</option>
                        <option value="employer">Employer</option>
                    </select>

                    <select
                        className="admin-select"
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                    >
                        <option value="all">Any Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="banned">Banned</option>
                    </select>
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
                                                width: '40px',
                                                height: '40px',
                                                borderRadius: '50%',
                                                background: 'var(--primary-100)',
                                                color: 'var(--primary-700)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 700
                                            }}>
                                                {u.name?.charAt(0)}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{u.name}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{u.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-badge info`} style={{ textTransform: 'capitalize' }}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${u.status === 'active' ? 'success' : u.status === 'suspended' ? 'warning' : 'danger'}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td>{new Date(u.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            {u.status === 'active' ? (
                                                <button
                                                    className="admin-icon-btn"
                                                    onClick={() => handleStatusChange(u._id, 'suspended')}
                                                    title="Suspend"
                                                >
                                                    <Ban size={16} />
                                                </button>
                                            ) : (
                                                <button
                                                    className="admin-icon-btn"
                                                    onClick={() => handleStatusChange(u._id, 'active')}
                                                    title="Activate"
                                                >
                                                    <CheckCircle size={16} color="#10b981" />
                                                </button>
                                            )}
                                            <button
                                                className="admin-icon-btn danger"
                                                onClick={() => handleStatusChange(u._id, 'banned')}
                                                title="Ban Account"
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
