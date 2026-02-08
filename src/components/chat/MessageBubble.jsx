import React from 'react';
import { Download, FileText, Image as ImageIcon, File } from 'lucide-react';
import '../../pages/chat/chat.css';

const MessageBubble = ({ message, isOwnMessage, senderName }) => {
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getFileIcon = (fileType) => {
        if (fileType?.startsWith('image/')) return <ImageIcon size={20} />;
        if (fileType?.includes('pdf')) return <FileText size={20} />;
        return <File size={20} />;
    };

    const getFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const renderFilePreview = (file) => {
        if (file.type?.startsWith('image/')) {
            return (
                <div className="message-image-preview">
                    <img src={file.url} alt={file.name} />
                </div>
            );
        }

        return (
            <div className="message-file-attachment">
                <div className="file-icon">
                    {getFileIcon(file.type)}
                </div>
                <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-size">{getFileSize(file.size)}</span>
                </div>
                <a
                    href={file.url}
                    download={file.name}
                    className="file-download-btn"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Download size={18} />
                </a>
            </div>
        );
    };

    return (
        <div className={`message-bubble ${isOwnMessage ? 'own-message' : 'other-message'}`}>
            {!isOwnMessage && (
                <div className="message-sender-name">{senderName}</div>
            )}

            <div className="message-content-wrapper">
                {message.type === 'file' && message.file ? (
                    renderFilePreview(message.file)
                ) : null}

                {message.content && (
                    <div className="message-text">
                        {message.content}
                    </div>
                )}

                <div className="message-meta">
                    <span className="message-time">{formatTime(message.createdAt)}</span>
                    {isOwnMessage && message.read && (
                        <span className="message-read-status">✓✓</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
