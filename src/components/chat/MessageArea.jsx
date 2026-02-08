import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Loader2, X } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import './chat.css';

const MessageArea = ({
    conversation,
    messages,
    loading,
    onSendMessage,
    currentUserId
}) => {
    const [messageText, setMessageText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const otherParticipant = conversation.participants?.find(p => p._id !== currentUserId);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSend = async () => {
        if ((!messageText.trim() && !selectedFile) || sending) return;

        setSending(true);
        try {
            if (selectedFile) {
                await onSendMessage('', selectedFile);
                setSelectedFile(null);
            } else {
                await onSendMessage(messageText);
            }
            setMessageText('');
        } catch (error) {
            console.error('Failed to send:', error);
        } finally {
            setSending(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file size (10MB max)
            if (file.size > 10 * 1024 * 1024) {
                alert('File size must be less than 10MB');
                return;
            }
            setSelectedFile(file);
        }
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="message-area">
            {/* Header */}
            <div className="message-area-header">
                <div className="header-user-info">
                    <div className="header-avatar">
                        {otherParticipant?.profilePicture ? (
                            <img src={otherParticipant.profilePicture} alt={otherParticipant.name} />
                        ) : (
                            <div className="avatar-placeholder">
                                {otherParticipant?.name?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                        )}
                    </div>
                    <div className="header-user-details">
                        <h3>{otherParticipant?.name || 'Unknown User'}</h3>
                        <span className="user-status">
                            {otherParticipant?.isOnline ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="messages-container">
                {loading ? (
                    <div className="messages-loading">
                        <Loader2 className="animate-spin" size={32} />
                    </div>
                ) : messages.length === 0 ? (
                    <div className="messages-empty">
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    <div className="messages-list">
                        {messages.map((message) => (
                            <MessageBubble
                                key={message._id}
                                message={message}
                                isOwnMessage={message.senderId === currentUserId}
                                senderName={
                                    message.senderId === currentUserId
                                        ? 'You'
                                        : otherParticipant?.name || 'Unknown'
                                }
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                )}

                {/* Typing Indicator */}
                {otherParticipant?.isTyping && (
                    <TypingIndicator userName={otherParticipant.name} />
                )}
            </div>

            {/* Input Area */}
            <div className="message-input-area">
                {selectedFile && (
                    <div className="selected-file-preview">
                        <div className="file-preview-content">
                            <Paperclip size={16} />
                            <span className="file-preview-name">{selectedFile.name}</span>
                            <span className="file-preview-size">
                                ({(selectedFile.size / 1024).toFixed(1)} KB)
                            </span>
                        </div>
                        <button
                            className="remove-file-btn"
                            onClick={removeSelectedFile}
                        >
                            <X size={16} />
                        </button>
                    </div>
                )}

                <div className="input-controls">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*,.pdf,.doc,.docx,.zip"
                        style={{ display: 'none' }}
                    />

                    <button
                        className="attach-btn"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={sending}
                        title="Attach file"
                    >
                        <Paperclip size={20} />
                    </button>

                    <textarea
                        className="message-input"
                        placeholder="Type a message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={sending}
                        rows={1}
                    />

                    <button
                        className="send-btn"
                        onClick={handleSend}
                        disabled={(!messageText.trim() && !selectedFile) || sending}
                    >
                        {sending ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <Send size={20} />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MessageArea;
