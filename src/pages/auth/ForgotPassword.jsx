import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Loader2, ArrowLeft } from 'lucide-react';
import './auth.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('idle'); // idle, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('idle');
        setMessage('');

        if (!email) return;

        setIsLoading(true);

        try {
            await authService.requestPasswordReset(email);
            setStatus('success');
            setMessage('Password reset link has been sent to your email.');
        } catch {
            setStatus('error');
            setMessage('Failed to request password reset. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-header">
                <h2 className="auth-title">
                    Reset your password
                </h2>
                <p className="auth-subtitle">
                    Enter your email and we'll send you a link to reset your password.
                </p>
            </div>

            <div className="auth-card-container">
                <div className="auth-card">

                    {status === 'success' ? (
                        <div className="auth-success" style={{ padding: '1rem', borderRadius: '0.375rem' }}>
                            <div style={{ display: 'flex' }}>
                                <div>
                                    <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: '#166534' }}>Check your email</h3>
                                    <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#15803d' }}>
                                        <p>{message}</p>
                                    </div>
                                    <div style={{ marginTop: '1rem' }}>
                                        <Link to="/login" className="auth-link" style={{ color: '#166534', fontWeight: 500 }}>
                                            Back to Login
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            {status === 'error' && (
                                <div className="auth-error">
                                    {message}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                            Sending link...
                                        </>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </button>
                            </div>

                            <div className="text-center">
                                <Link to="/login" className="auth-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <ArrowLeft size={16} /> Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
