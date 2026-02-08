import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const chatService = {
    /**
     * Get all conversations for the current user
     */
    getConversations: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/chat/conversations`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch conversations:', error);
            throw error;
        }
    },

    /**
     * Get messages for a specific conversation
     */
    getMessages: async (conversationId, page = 1, limit = 50) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/chat/conversations/${conversationId}/messages?page=${page}&limit=${limit}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            throw error;
        }
    },

    /**
     * Send a text message
     */
    sendMessage: async (conversationId, message) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/chat/conversations/${conversationId}/messages`,
                { message },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to send message:', error);
            throw error;
        }
    },

    /**
     * Upload and send a file
     */
    uploadFile: async (conversationId, file) => {
        try {
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', file);

            const response = await axios.post(
                `${API_URL}/chat/conversations/${conversationId}/upload`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to upload file:', error);
            throw error;
        }
    },

    /**
     * Mark messages as read
     */
    markAsRead: async (conversationId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `${API_URL}/chat/conversations/${conversationId}/read`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('Failed to mark as read:', error);
            throw error;
        }
    },

    /**
     * Create a new conversation
     */
    createConversation: async (participantId, relatedTo = {}) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/chat/conversations`,
                { participantId, relatedTo },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to create conversation:', error);
            throw error;
        }
    },

    /**
     * Get or create conversation with a user
     */
    getOrCreateConversation: async (participantId, relatedTo = {}) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/chat/conversations/get-or-create`,
                { participantId, relatedTo },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to get or create conversation:', error);
            throw error;
        }
    }
};
