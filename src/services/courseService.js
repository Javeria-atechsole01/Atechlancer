import api from './api';

export const courseService = {
    // Discovery
    getAll: async (params) => {
        const response = await api.get('/courses', { params });
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    },

    // Enrollment
    enroll: async (id) => {
        const response = await api.post(`/courses/${id}/enroll`);
        return response.data;
    },
    getUserEnrollments: async () => {
        const response = await api.get('/courses/user/enrolled');
        return response.data;
    },

    // Learning Progress
    updateProgress: async (courseId, lessonId) => {
        const response = await api.patch(`/courses/${courseId}/progress`, { lessonId });
        return response.data;
    },

    // Reviews & Social
    addReview: async (courseId, reviewData) => {
        const response = await api.post(`/courses/${courseId}/review`, reviewData);
        return response.data;
    },

    // Teacher Management
    createCourse: async (courseData) => {
        const response = await api.post('/courses', courseData);
        return response.data;
    },
    updateCourse: async (id, courseData) => {
        const response = await api.patch(`/courses/${id}`, courseData);
        return response.data;
    },
    deleteCourse: async (id) => {
        const response = await api.delete(`/courses/${id}`);
        return response.data;
    }
};
