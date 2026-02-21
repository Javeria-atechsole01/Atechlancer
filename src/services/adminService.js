import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const adminService = {
    /**
     * Get dashboard analytics
     */
    getDashboardStats: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/admin/dashboard/stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch dashboard stats:', error);
            throw error;
        }
    },

    /**
     * Get all users with filters
     */
    getUsers: async (filters = {}) => {
        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams();

            if (filters.role) params.append('role', filters.role);
            if (filters.status) params.append('status', filters.status);
            if (filters.search) params.append('search', filters.search);
            if (filters.page) params.append('page', filters.page);
            if (filters.limit) params.append('limit', filters.limit);

            const response = await axios.get(`${API_URL}/admin/users?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    },

    /**
     * Update user status
     */
    updateUserStatus: async (userId, status) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${API_URL}/admin/users/${userId}/status`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to update user status:', error);
            throw error;
        }
    },

    /**
     * Get verification requests
     */
    getVerificationRequests: async (status = 'pending') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/admin/verifications?status=${status}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to fetch verification requests:', error);
            throw error;
        }
    },

    /**
     * Approve/Reject verification
     */
    updateVerificationStatus: async (verificationId, status, notes = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${API_URL}/admin/verifications/${verificationId}`,
                { status, notes },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to update verification:', error);
            throw error;
        }
    },

    /**
     * Get reported content
     */
    getReportedContent: async (type = 'all', status = 'pending') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/admin/reports?type=${type}&status=${status}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to fetch reports:', error);
            throw error;
        }
    },

    /**
     * Moderate content
     */
    moderateContent: async (reportId, action, reason = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/admin/reports/${reportId}/moderate`,
                { action, reason },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to moderate content:', error);
            throw error;
        }
    },

    /**
     * Get platform analytics
     */
    getAnalytics: async (period = 'month') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/admin/analytics?period=${period}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
            throw error;
        }
    },

    /**
     * Get transactions for admin
     */
    getTransactions: async (filters = {}) => {
        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams();

            if (filters.type) params.append('type', filters.type);
            if (filters.status) params.append('status', filters.status);
            if (filters.page) params.append('page', filters.page);
            if (filters.limit) params.append('limit', filters.limit);

            const response = await axios.get(`${API_URL}/admin/transactions?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            throw error;
        }
    }
};
