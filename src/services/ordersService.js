import api from './api';

export const ordersService = {
  create: (gigId) => api.post('/orders', { gigId }).then(r => r.data),
  listMine: () => api.get('/orders/user').then(r => r.data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }).then(r => r.data),
  deliver: (id, formData) =>
    api.post(`/orders/${id}/deliver`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then(r => r.data),
  requestRevision: (id, message) => api.post(`/orders/${id}/revision`, { message }).then(r => r.data)
};
