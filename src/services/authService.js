<<<<<<< Updated upstream
import api from './api';

export const authService = {
    // Login
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    // Signup
    signup: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Signup failed' };
        }
    },

    // Verify Email (Simulated for now based on backend stub)
    verifyEmail: async (token) => {
        // Backend currently returns "not implemented"
        // simulating success for flow continuity
        return { success: true, message: 'Email verified' };
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
=======
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add interceptor to include token in requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during login' };
>>>>>>> Stashed changes
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  },

  signup: async (userData) => {
     try {
        const response = await api.post('/register', userData);
        // Do NOT login automatically if verification is required
        // But if backend returns token (it shouldn't for unverified), we handle it.
        // For now, we assume backend returns success message only.
        return response.data;
     } catch (error) {
        throw error.response?.data || { message: 'An error occurred during signup' };
     }
  },

  verifyEmail: async (token) => {
      try {
          const response = await api.get(`/verify-email?token=${token}`);
          return response.data;
      } catch (error) {
          throw error.response?.data || { message: 'Verification failed' };
      }
  },

  resendVerification: async (email) => {
      try {
          const response = await api.post('/resend-verification', { email });
          return response.data;
      } catch (error) {
          throw error.response?.data || { message: 'Failed to resend verification email' };
      }
  }
};
