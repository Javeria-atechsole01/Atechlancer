import api from './api';

export const assignmentService = {
    // Assignments
    create: async (data) => {
        const response = await api.post('/assignments', data);
        return response.data;
    },
    getAll: async (params) => {
        const response = await api.get('/assignments', { params });
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/assignments/${id}`);
        return response.data;
    },
    updateStatus: async (id, status) => {
        const response = await api.patch(`/assignments/${id}/status`, { status });
        return response.data;
    },

    // Bids
    submitBid: async (bidData) => {
        const response = await api.post('/bids', bidData);
        return response.data;
    },
    acceptBid: async (bidId) => {
        const response = await api.post(`/bids/${bidId}/accept`);
        return response.data;
    },
    getMyBids: async () => {
        const response = await api.get('/bids/my-bids');
        return response.data;
    },

    // Submissions
    submitSolution: async (data) => {
        const response = await api.post('/submissions', data);
        return response.data;
    },
    approveSubmission: async (id) => {
        const response = await api.patch(`/submissions/${id}/approve`);
        return response.data;
    },
    requestRevision: async (id) => {
        const response = await api.patch(`/submissions/${id}/revision`);
        return response.data;
    }
};
