import api from './api';

export const messagesService = {
    send: (data) => api.post('/messages', data).then(r => r.data),
    list: () => api.get('/messages').then(r => r.data)
};
