import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const walletService = {
    /**
     * Get wallet details (balance, pending, escrow)
     */
    getWallet: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/wallet`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch wallet:', error);
            throw error;
        }
    },

    /**
     * Get transaction history with filters
     */
    getTransactions: async (filters = {}) => {
        try {
            const token = localStorage.getItem('token');
            const params = new URLSearchParams();

            if (filters.type) params.append('type', filters.type);
            if (filters.status) params.append('status', filters.status);
            if (filters.startDate) params.append('startDate', filters.startDate);
            if (filters.endDate) params.append('endDate', filters.endDate);
            if (filters.page) params.append('page', filters.page);
            if (filters.limit) params.append('limit', filters.limit);

            const response = await axios.get(`${API_URL}/wallet/transactions?${params}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            throw error;
        }
    },

    /**
     * Request withdrawal
     */
    requestWithdrawal: async (withdrawalData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/wallet/withdraw`,
                withdrawalData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to request withdrawal:', error);
            throw error;
        }
    },

    /**
     * Get withdrawal methods
     */
    getWithdrawalMethods: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/wallet/withdrawal-methods`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch withdrawal methods:', error);
            throw error;
        }
    },

    /**
     * Add withdrawal method
     */
    addWithdrawalMethod: async (methodData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/wallet/withdrawal-methods`,
                methodData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to add withdrawal method:', error);
            throw error;
        }
    },

    /**
     * Request refund
     */
    requestRefund: async (refundData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/wallet/refund`,
                refundData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to request refund:', error);
            throw error;
        }
    },

    /**
     * Get earnings summary
     */
    getEarningsSummary: async (period = 'month') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/wallet/earnings?period=${period}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch earnings summary:', error);
            throw error;
        }
    }
};
