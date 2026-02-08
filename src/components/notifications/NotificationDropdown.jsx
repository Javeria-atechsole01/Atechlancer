import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase, DollarSign, FileText, GraduationCap,
    CheckCircle, AlertCircle, MessageSquare, Clock
} from 'lucide-react';
import './notifications.css';

const NotificationDropdown = ({
    notifications,
    loading,
    onMarkAsRead,
    onMarkAllAsRead,
    onClose
}) => {
    const navigate = useNavigate();

    const getNotificationIcon = (type) => {
        const iconProps = { size: 18 };

        switch (type) {
            case 'JOB_APPLICATION':
                return <Briefcase {...iconProps} className="notification-icon job" />;
            case 'ORDER_RECEIVED':
                return <DollarSign {...iconProps} className="notification-icon order" />;
            case 'ASSIGNMENT_BID':
                return <FileText {...iconProps} className="notification-icon assignment" />;
            case 'COURSE_PURCHASE':
                return <GraduationCap {...iconProps} className="notification-icon course" />;
            case 'VERIFICATION_STATUS':
                return <CheckCircle {...iconProps} className="notification-icon verification" />;
            case 'PAYMENT_UPDATE':
                return <DollarSign {...iconProps} className="notification-icon payment" />;
            case 'ADMIN_MESSAGE':
                return <MessageSquare {...iconProps} className="notification-icon admin" />;
            default:
                return <AlertCircle {...iconProps} className="notification-icon default" />;
        }
    };

    const handleNotificationClick = (notification) => {
        if (!notification.read) {
            onMarkAsRead(notification._id);
        }

        // Navigate to relevant page based on notification type
        if (notification.link) {
            navigate(notification.link);
            onClose();
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
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="notification-dropdown">
            <div className="notification-dropdown-header">
                <h3>Notifications</h3>
                {notifications.length > 0 && (
                    <button
                        className="mark-all-read-btn"
                        onClick={onMarkAllAsRead}
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="notification-dropdown-body">
                {loading ? (
                    <div className="notification-loading">
                        <Clock className="animate-spin" size={24} />
                        <p>Loading notifications...</p>
                    </div>
                ) : notifications.length === 0 ? (
                    <div className="notification-empty">
                        <AlertCircle size={32} />
                        <p>No notifications yet</p>
                    </div>
                ) : (
                    <div className="notification-list">
                        {notifications.map((notification) => (
                            <div
                                key={notification._id}
                                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                                onClick={() => handleNotificationClick(notification)}
                            >
                                <div className="notification-icon-wrapper">
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="notification-content">
                                    <p className="notification-title">{notification.title}</p>
                                    <p className="notification-message">{notification.message}</p>
                                    <span className="notification-time">
                                        {formatTime(notification.createdAt)}
                                    </span>
                                </div>

                                {!notification.read && (
                                    <div className="notification-unread-dot" />
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="notification-dropdown-footer">
                <button
                    className="view-all-btn"
                    onClick={() => {
                        navigate('/notifications');
                        onClose();
                    }}
                >
                    View all notifications
                </button>
            </div>
        </div>
    );
};

export default NotificationDropdown;
