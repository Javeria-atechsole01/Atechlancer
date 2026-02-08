import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const verificationService = {
    /**
     * Get verification status
     */
    getVerificationStatus: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/verification/status`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch verification status:', error);
            throw error;
        }
    },

    /**
     * Upload verification documents
     */
    uploadDocuments: async (formData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/verification/documents`,
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
            console.error('Failed to upload documents:', error);
            throw error;
        }
    },

    /**
     * Get skill test
     */
    getSkillTest: async (category) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/verification/skill-test/${category}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to fetch skill test:', error);
            throw error;
        }
    },

    /**
     * Submit skill test
     */
    submitSkillTest: async (testId, answers) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/verification/skill-test/${testId}/submit`,
                { answers },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to submit skill test:', error);
            throw error;
        }
    },

    /**
     * Get available interview slots
     */
    getInterviewSlots: async (date) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/verification/interview-slots?date=${date}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to fetch interview slots:', error);
            throw error;
        }
    },

    /**
     * Book interview
     */
    bookInterview: async (slotId, notes = '') => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/verification/interview/book`,
                { slotId, notes },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to book interview:', error);
            throw error;
        }
    },

    /**
     * Get verification requirements
     */
    getRequirements: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/verification/requirements`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            console.error('Failed to fetch requirements:', error);
            throw error;
        }
    }
};
