import api from './api';

export const profileService = {
    // Get current user's profile
    getCurrentProfile: async () => {
        try {
            const response = await api.get('/profile/me');
            return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null; // Profile doesn't exist yet
            }
            throw error;
        }
    },

    // Create or update profile
    updateProfile: async (profileData) => {
        const response = await api.post('/profile', profileData);
        return response.data;
    },

    // Get public profile by user ID
    getProfileById: async (userId) => {
        const response = await api.get(`/profile/${userId}`);
        return response.data;
    },

    // Upload photo
    uploadPhoto: async (formData) => {
        const response = await api.post('/profile/upload-photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // Get candidates with filters
    getCandidates: async (params) => {
        const response = await api.get('/profile/candidates', { params });
        return response.data;
    }
};
