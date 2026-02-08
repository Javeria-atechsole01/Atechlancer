import React from 'react';
import { Circle } from 'lucide-react';
import './chat.css';

const ConversationList = ({
    conversations,
    activeConversationId,
    onSelectConversation,
    currentUserId
}) => {
    const getOtherParticipant = (conversation) => {
        return conversation.participants?.find(p => p._id !== currentUserId);
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m`;
        if (diffHours < 24) return `${diffHours}h`;
        if (diffDays < 7) return `${diffDays}d`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    const truncateMessage = (message, maxLength = 50) => {
        if (!message) return 'No messages yet';
        if (message.length <= maxLength) return message;
        return message.substring(0, maxLength) + '...';
    };

    return (
        <div className="conversation-list">
            {conversations.map((conversation) => {
                const otherUser = getOtherParticipant(conversation);
                const isActive = conversation._id === activeConversationId;
                const hasUnread = conversation.unreadCount > 0;

                return (
                    <div
                        key={conversation._id}
                        className={`conversation-item ${isActive ? 'active' : ''} ${hasUnread ? 'unread' : ''}`}
                        onClick={() => onSelectConversation(conversation)}
                    >
                        <div className="conversation-avatar">
                            {otherUser?.profilePicture ? (
                                <img
                                    src={otherUser.profilePicture}
                                    alt={otherUser.name}
                                />
                            ) : (
                                <div className="avatar-placeholder">
                                    {otherUser?.name?.charAt(0)?.toUpperCase() || '?'}
                                </div>
                            )}
                            {otherUser?.isOnline && (
                                <Circle className="online-indicator" size={12} fill="currentColor" />
                            )}
                        </div>

                        <div className="conversation-content">
                            <div className="conversation-header">
                                <h4 className="conversation-name">
                                    {otherUser?.name || 'Unknown User'}
                                </h4>
                                <span className="conversation-time">
                                    {formatTime(conversation.updatedAt || conversation.createdAt)}
                                </span>
                            </div>

                            <div className="conversation-preview">
                                <p className="last-message">
                                    {conversation.lastMessage?.type === 'file'
                                        ? '📎 File attachment'
                                        : truncateMessage(conversation.lastMessage?.content)
                                    }
                                </p>
                                {hasUnread && (
                                    <span className="unread-badge">
                                        {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                                    </span>
                                )}
                            </div>

                            {conversation.relatedTo && (
                                <div className="conversation-context">
                                    <span className="context-label">
                                        {conversation.relatedTo.type === 'job' && '💼 Job'}
                                        {conversation.relatedTo.type === 'gig' && '⚡ Gig'}
                                        {conversation.relatedTo.type === 'assignment' && '📝 Assignment'}
                                        {conversation.relatedTo.type === 'course' && '🎓 Course'}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default ConversationList;
