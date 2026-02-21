import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import './auth.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, success, error
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('idle');
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setStatus('error');
            setMessage('Passwords do not match.');
            return;
        }

        if (formData.password.length < 8) {
            setStatus('error');
            setMessage('Password must be at least 8 characters.');
            return;
        }

        setIsLoading(true);

        try {
            await authService.resetPassword('valid-token', formData.password);
            setStatus('success');
            // Redirect after 2 seconds
            setTimeout(() => navigate('/login'), 2000);
        } catch {
            setStatus('error');
            setMessage('Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-header">
                <h2 className="auth-title">
                    Set new password
                </h2>
                <p className="auth-subtitle">
                    Please enter your new password below.
                </p>
            </div>

            <div className="auth-card-container">
                <div className="auth-card">

                    {status === 'success' ? (
                        <div className="auth-success" style={{ padding: '1rem', borderRadius: '0.375rem', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#166534' }}>Password Reset Successful!</h3>
                            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#15803d' }}>Redirecting to login...</p>
                        </div>
                    ) : (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            {status === 'error' && (
                                <div className="auth-error">
                                    {message}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    New Password
                                </label>
                                <div className="input-group">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="form-input"
                                        style={{ paddingRight: '2.5rem' }}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="input-icon-btn"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="auth-btn"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="icon-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
