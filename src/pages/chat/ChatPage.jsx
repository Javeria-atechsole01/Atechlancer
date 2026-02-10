import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { chatService } from '../../services/chatService';
import { useAuth } from '../../context/AuthContext';
import ConversationList from '../../components/chat/ConversationList';
import MessageArea from '../../components/chat/MessageArea';
import { Loader2, MessageSquare } from 'lucide-react';
import './chat.css';

const ChatPage = () => {
    const { conversationId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [conversations, setConversations] = useState([]);
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);

    useEffect(() => {
        loadConversations();
    }, []);

    useEffect(() => {
        let interval;
        if (conversationId) {
            loadMessages(conversationId);
            // Poll for new messages every 10 seconds
            interval = setInterval(() => {
                loadMessages(conversationId, true); // true = silent load
            }, 10000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [conversationId]);

    const loadConversations = async () => {
        setLoading(true);
        try {
            const data = await chatService.getConversations();
            setConversations(data.conversations || []);

            // If we have a conversationId in URL, set it as active
            if (conversationId) {
                const active = data.conversations?.find(c => c._id === conversationId);
                setActiveConversation(active);
            }
        } catch (error) {
            console.error('Failed to load conversations:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadMessages = async (convId, silent = false) => {
        if (!silent) setMessagesLoading(true);
        try {
            const data = await chatService.getMessages(convId);
            setMessages(data.messages || []);

            // Mark as read
            await chatService.markAsRead(convId);

            // Update conversation unread count
            setConversations(prev =>
                prev.map(c => c._id === convId ? { ...c, unreadCount: 0 } : c)
            );
        } catch (error) {
            console.error('Failed to load messages:', error);
        } finally {
            setMessagesLoading(false);
        }
    };

    const handleSelectConversation = (conversation) => {
        setActiveConversation(conversation);
        navigate(`/chat/${conversation._id}`);
    };

    const handleSendMessage = async (message, file = null) => {
        if (!activeConversation) return;

        try {
            let newMessage;

            if (file) {
                newMessage = await chatService.uploadFile(activeConversation._id, file);
            } else {
                newMessage = await chatService.sendMessage(activeConversation._id, message);
            }

            // Add message to list
            setMessages(prev => [...prev, newMessage]);

            // Update conversation's last message
            setConversations(prev =>
                prev.map(c =>
                    c._id === activeConversation._id
                        ? { ...c, lastMessage: newMessage, updatedAt: new Date() }
                        : c
                )
            );
        } catch (error) {
            console.error('Failed to send message:', error);
            alert('Failed to send message. Please try again.');
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-container">
                {/* Conversations Sidebar */}
                <aside className="chat-sidebar">
                    <div className="chat-sidebar-header">
                        <h2>Messages</h2>
                    </div>

                    {loading ? (
                        <div className="chat-loading">
                            <Loader2 className="animate-spin" size={32} />
                        </div>
                    ) : conversations.length === 0 ? (
                        <div className="chat-empty">
                            <MessageSquare size={48} />
                            <p>No conversations yet</p>
                            <span>Start a conversation from a job, gig, or assignment</span>
                        </div>
                    ) : (
                        <ConversationList
                            conversations={conversations}
                            activeConversationId={activeConversation?._id}
                            onSelectConversation={handleSelectConversation}
                            currentUserId={user?._id}
                        />
                    )}
                </aside>

                {/* Message Area */}
                <main className="chat-main">
                    {activeConversation ? (
                        <MessageArea
                            conversation={activeConversation}
                            messages={messages}
                            loading={messagesLoading}
                            onSendMessage={handleSendMessage}
                            currentUserId={user?._id}
                        />
                    ) : (
                        <div className="chat-no-selection">
                            <MessageSquare size={64} />
                            <h3>Select a conversation</h3>
                            <p>Choose a conversation from the list to start messaging</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ChatPage;
