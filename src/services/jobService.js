import api from './api';

export const jobService = {
  // Get all jobs with filters
  getAll: async (params) => {
    const response = await api.get('/jobs', { params });
    return response.data;
  },

  // Get single job by ID
  getById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  // Create new job
  create: async (data) => {
    const response = await api.post('/jobs', data);
    return response.data;
  },

  // Update job
  update: async (id, data) => {
    const response = await api.put(`/jobs/${id}`, data);
    return response.data;
  },

  // Delete job
  delete: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  }
};
