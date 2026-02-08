import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../../services/notificationService';
import {
    Briefcase, DollarSign, FileText, GraduationCap,
    CheckCircle, AlertCircle, MessageSquare, Filter, Loader2
} from 'lucide-react';
import './notifications-page.css';

const NotificationsPage = () => {
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadNotifications();
    }, [filter, page]);

    const loadNotifications = async () => {
        setLoading(true);
        try {
            const filters = {};
            if (filter !== 'all') {
                if (filter === 'unread') {
                    filters.read = false;
                } else {
                    filters.type = filter;
                }
            }

            const data = await notificationService.getNotifications({
                ...filters,
                limit: 20,
                page
            });

            setNotifications(data.notifications || []);
            setHasMore(data.hasMore || false);
        } catch (error) {
            console.error('Failed to load notifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (notificationId) => {
        try {
            await notificationService.markAsRead(notificationId);
            setNotifications(prev =>
                prev.map(n => n._id === notificationId ? { ...n, read: true } : n)
            );
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleMarkAllAsRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        } catch (error) {
            console.error('Failed to mark all as read:', error);
        }
    };

    const handleDelete = async (notificationId) => {
        try {
            await notificationService.deleteNotification(notificationId);
            setNotifications(prev => prev.filter(n => n._id !== notificationId));
        } catch (error) {
            console.error('Failed to delete notification:', error);
        }
    };

    const getNotificationIcon = (type) => {
        const iconProps = { size: 20 };

        switch (type) {
            case 'JOB_APPLICATION':
                return <Briefcase {...iconProps} className="notification-type-icon job" />;
            case 'ORDER_RECEIVED':
                return <DollarSign {...iconProps} className="notification-type-icon order" />;
            case 'ASSIGNMENT_BID':
                return <FileText {...iconProps} className="notification-type-icon assignment" />;
            case 'COURSE_PURCHASE':
                return <GraduationCap {...iconProps} className="notification-type-icon course" />;
            case 'VERIFICATION_STATUS':
                return <CheckCircle {...iconProps} className="notification-type-icon verification" />;
            case 'PAYMENT_UPDATE':
                return <DollarSign {...iconProps} className="notification-type-icon payment" />;
            case 'ADMIN_MESSAGE':
                return <MessageSquare {...iconProps} className="notification-type-icon admin" />;
            default:
                return <AlertCircle {...iconProps} className="notification-type-icon default" />;
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const handleNotificationClick = (notification) => {
        if (!notification.read) {
            handleMarkAsRead(notification._id);
        }

        if (notification.link) {
            navigate(notification.link);
        }
    };

    const filterOptions = [
        { value: 'all', label: 'All Notifications' },
        { value: 'unread', label: 'Unread' },
        { value: 'JOB_APPLICATION', label: 'Job Applications' },
        { value: 'ORDER_RECEIVED', label: 'Orders' },
        { value: 'ASSIGNMENT_BID', label: 'Assignment Bids' },
        { value: 'COURSE_PURCHASE', label: 'Course Purchases' },
        { value: 'VERIFICATION_STATUS', label: 'Verification' },
        { value: 'PAYMENT_UPDATE', label: 'Payments' },
        { value: 'ADMIN_MESSAGE', label: 'Admin Messages' }
    ];

    return (
        <div className="notifications-page">
            <div className="notifications-container">
                {/* Header */}
                <div className="notifications-header">
                    <h1>Notifications</h1>
                    <div className="header-actions">
                        {notifications.some(n => !n.read) && (
                            <button
                                className="btn btn-secondary"
                                onClick={handleMarkAllAsRead}
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="notifications-filter-bar">
                    <Filter size={18} />
                    <select
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setPage(1);
                        }}
                        className="filter-select"
                    >
                        {filterOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Notifications List */}
                <div className="notifications-content">
                    {loading ? (
                        <div className="notifications-loading">
                            <Loader2 className="animate-spin" size={40} />
                            <p>Loading notifications...</p>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="notifications-empty">
                            <AlertCircle size={48} />
                            <h3>No notifications</h3>
                            <p>You're all caught up! Check back later for updates.</p>
                        </div>
                    ) : (
                        <div className="notifications-list-page">
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    className={`notification-card ${notification.read ? 'read' : 'unread'}`}
                                >
                                    <div className="notification-card-icon">
                                        {getNotificationIcon(notification.type)}
                                    </div>

                                    <div
                                        className="notification-card-content"
                                        onClick={() => handleNotificationClick(notification)}
                                    >
                                        <div className="notification-card-header">
                                            <h3>{notification.title}</h3>
                                            {!notification.read && (
                                                <span className="unread-badge">New</span>
                                            )}
                                        </div>
                                        <p className="notification-card-message">
                                            {notification.message}
                                        </p>
                                        <span className="notification-card-time">
                                            {formatTime(notification.createdAt)}
                                        </span>
                                    </div>

                                    <div className="notification-card-actions">
                                        {!notification.read && (
                                            <button
                                                className="action-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleMarkAsRead(notification._id);
                                                }}
                                                title="Mark as read"
                                            >
                                                <CheckCircle size={16} />
                                            </button>
                                        )}
                                        <button
                                            className="action-btn delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(notification._id);
                                            }}
                                            title="Delete"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {!loading && notifications.length > 0 && (
                    <div className="notifications-pagination">
                        <button
                            className="btn btn-secondary"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </button>
                        <span className="page-info">Page {page}</span>
                        <button
                            className="btn btn-secondary"
                            onClick={() => setPage(p => p + 1)}
                            disabled={!hasMore}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationsPage;
