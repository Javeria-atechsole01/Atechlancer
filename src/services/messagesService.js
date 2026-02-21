import api from './api';

export const messagesService = {
    send: (data) => {
        const hasFiles = Array.isArray(data.attachments) && data.attachments.length > 0;
        if (!hasFiles) return api.post('/messages', data).then(r => r.data);
        const fd = new FormData();
        if (data.receiverId) fd.append('receiverId', data.receiverId);
        if (data.message) fd.append('message', data.message);
        if (data.gigId) fd.append('gigId', data.gigId);
        for (const file of data.attachments) {
            fd.append('attachments', file);
        }
        return api.post('/messages', fd, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(r => r.data);
    },
    list: (params = {}) => api.get('/messages', { params }).then(r => r.data)
};
