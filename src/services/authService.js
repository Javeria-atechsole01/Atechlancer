/**
 * Mock Authentication Service
 * Simulates backend operations with network delay
 */

const DELAY = 800;

export const authService = {
    // Simulate Login
    login: async (email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email && password) {
                    // Mock successful login
                    resolve({
                        success: true,
                        user: {
                            id: '1',
                            name: 'Test User',
                            email: email,
                            role: 'student',
                            verified: true
                        },
                        token: 'mock-jwt-token'
                    });
                } else {
                    reject({ message: 'Invalid credentials' });
                }
            }, DELAY);
        });
    },

    // Simulate Signup
    signup: async (userData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    message: 'Account created successfully! Please verify your email.',
                    userId: 'new-user-123'
                });
            }, DELAY);
        });
    },

    // Simulate Email Verification
    verifyEmail: async (token) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (token === 'valid-token') {
                    resolve({ success: true, message: 'Email verified successfully!' });
                } else {
                    reject({ message: 'Invalid or expired verification link.' });
                }
            }, DELAY);
        });
    },

    // Simulate verification email resend
    resendVerification: async (email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Verification link sent!' });
            }, DELAY);
        });
    },

    // Simulate Password Reset Request
    requestPasswordReset: async (email) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Password reset link sent to your email.' });
            }, DELAY);
        });
    },

    // Simulate Password Reset Confirmation
    resetPassword: async (token, newPassword) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Password has been reset successfully.' });
            }, DELAY);
        });
    }
};
