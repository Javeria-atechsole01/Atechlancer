import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const notificationService = {
    /**
     * Get all notifications for the current user
     */
    getNotifications: async (filters = {}) => {
        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams();

            if (filters.type) params.append('type', filters.type);
            if (filters.read !== undefined) params.append('read', filters.read);
            if (filters.limit) params.append('limit', filters.limit);

            const response = await axios.get(`${API_URL}/notifications?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
            throw error;
        }
    },

    /**
     * Get count of unread notifications
     */
    getUnreadCount: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/notifications/unread-count`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data.count || 0;
        } catch (error) {
            console.error('Failed to fetch unread count:', error);
            return 0;
        }
    },

    /**
     * Mark a notification as read
     */
    markAsRead: async (notificationId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${API_URL}/notifications/${notificationId}/read`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to mark notification as read:', error);
            throw error;
        }
    },

    /**
     * Mark all notifications as read
     */
    markAllAsRead: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${API_URL}/notifications/read-all`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to mark all as read:', error);
            throw error;
        }
    },

    /**
     * Delete a notification
     */
    deleteNotification: async (notificationId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/notifications/${notificationId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Failed to delete notification:', error);
            throw error;
        }
    }
};
