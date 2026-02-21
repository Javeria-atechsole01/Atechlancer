import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const reviewService = {
    /**
     * Submit a review
     */
    submitReview: async (reviewData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(
                `${API_URL}/reviews`,
                reviewData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to submit review:', error);
            throw error;
        }
    },

    /**
     * Get reviews for a specific entity (user, gig, course)
     */
    getReviews: async (entityType, entityId, page = 1, limit = 10) => {
        try {
            const response = await axios.get(
                `${API_URL}/reviews/${entityType}/${entityId}?page=${page}&limit=${limit}`
            );

            return response.data;
        } catch (error) {
            console.error('Failed to fetch reviews:', error);
            throw error;
        }
    },

    /**
     * Get review statistics
     */
    getReviewStats: async (entityType, entityId) => {
        try {
            const response = await axios.get(
                `${API_URL}/reviews/${entityType}/${entityId}/stats`
            );

            return response.data;
        } catch (error) {
            console.error('Failed to fetch review stats:', error);
            throw error;
        }
    },

    /**
     * Update a review
     */
    updateReview: async (reviewId, updateData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.patch(
                `${API_URL}/reviews/${reviewId}`,
                updateData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to update review:', error);
            throw error;
        }
    },

    /**
     * Delete a review
     */
    deleteReview: async (reviewId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_URL}/reviews/${reviewId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (error) {
            console.error('Failed to delete review:', error);
            throw error;
        }
    },

    /**
     * Check if user can review
     */
    canReview: async (entityType, entityId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(
                `${API_URL}/reviews/can-review/${entityType}/${entityId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            return response.data;
        } catch (error) {
            console.error('Failed to check review eligibility:', error);
            return { canReview: false };
        }
    }
};
