import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
    Search, Filter, MoreVertical, Ban, CheckCircle,
    XCircle, Loader2, AlertCircle
} from 'lucide-react';
import './admin.css';

const UserManagement = () => {
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

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="user-management">
            <div className="page-header">
                <div>
                    <h1>User Management</h1>
                    <p>Manage all platform users</p>
                </div>
            </div>

            {/* Filters */}
            <div className="filters-bar">
                <div className="search-box">
                    <Search size={18} />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={filters.search}
                        onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                    />
                </div>

                <div className="filter-group">
                    <Filter size={18} />
                    <select
                        value={filters.role}
                        onChange={(e) => setFilters({ ...filters, role: e.target.value, page: 1 })}
                    >
                        <option value="all">All Roles</option>
                        <option value="student">Students</option>
                        <option value="freelancer">Freelancers</option>
                        <option value="teacher">Teachers</option>
                        <option value="employer">Employers</option>
                    </select>
                </div>

                <div className="filter-group">
                    <select
                        value={filters.status}
                        onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="banned">Banned</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="users-table-container">
                {loading ? (
                    <div className="table-loading">
                        <Loader2 className="animate-spin" size={32} />
                        <p>Loading users...</p>
                    </div>
                ) : users.length === 0 ? (
                    <div className="table-empty">
                        <AlertCircle size={48} />
                        <h3>No users found</h3>
                        <p>Try adjusting your filters</p>
                    </div>
                ) : (
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>
                                        <div className="user-cell">
                                            {user.profilePicture ? (
                                                <img src={user.profilePicture} alt={user.name} />
                                            ) : (
                                                <div className="user-avatar">
                                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                            )}
                                            <span className="user-name">{user.name}</span>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        <span className="role-badge">{user.role}</span>
                                    </td>
                                    <td>{getStatusBadge(user.status)}</td>
                                    <td>{formatDate(user.createdAt)}</td>
                                    <td>
                                        <div className="action-dropdown">
                                            <button className="action-btn">
                                                <MoreVertical size={18} />
                                            </button>
                                            <div className="dropdown-menu">
                                                <button onClick={() => handleStatusChange(user._id, 'active')}>
                                                    <CheckCircle size={16} />
                                                    Activate
                                                </button>
                                                <button onClick={() => handleStatusChange(user._id, 'suspended')}>
                                                    <Ban size={16} />
                                                    Suspend
                                                </button>
                                                <button onClick={() => handleStatusChange(user._id, 'banned')}>
                                                    <XCircle size={16} />
                                                    Ban
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Pagination */}
            {!loading && users.length > 0 && (
                <div className="pagination">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                        disabled={filters.page === 1}
                    >
                        Previous
                    </button>
                    <span className="page-info">Page {filters.page}</span>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                        disabled={!hasMore}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserManagement;
