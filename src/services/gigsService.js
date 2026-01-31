import api from './api';

export const gigsService = {
  create: (data) => api.post('/gigs', data).then(r => r.data),
  update: (id, data) => api.put(`/gigs/${id}`, data).then(r => r.data),
  remove: (id) => api.delete(`/gigs/${id}`).then(r => r.data),
  mine: () => api.get('/gigs/me').then(r => r.data),
  list: (params) => api.get('/gigs', { params }).then(r => r.data),
  get: (id) => api.get(`/gigs/${id}`).then(r => r.data),
  uploadCover: (id, file) => {
    const fd = new FormData();
    fd.append('image', file);
    return api.post(`/gigs/${id}/cover`, fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(r => r.data);
  }
};
