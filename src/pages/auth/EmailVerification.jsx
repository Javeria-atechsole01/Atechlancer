import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import './auth.css';

const EmailVerification = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState('sent'); // sent, verifying, success, error
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const email = state?.email || 'your email';

    const handleSimulateVerification = async () => {
        setStatus('verifying');
        try {
            // Simulate token verification
            await authService.verifyEmail('valid-token');
            setStatus('success');
        } catch (err) {
            setStatus('error');
            setMessage(err.message);
        }
    };

    const handleResend = async () => {
        setIsLoading(true);
        try {
            await authService.resendVerification(email);
            setMessage('New verification link sent!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Failed to send link.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card-container">
                <div className="auth-card text-center">

                    {status === 'sent' && (
                        <div className="verification-status">
                            <div className="status-icon-wrapper sent">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h2 className="auth-title" style={{ marginTop: 0 }}>Check your email</h2>
                                <p className="auth-subtitle">
                                    We sent a verification link to <span style={{ fontWeight: 600, color: 'var(--gray-900)' }}>{email}</span>
                                </p>
                            </div>

                            <div style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '1.5rem' }}>
                                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '1rem' }}>
                                    Didn't receive the email?
                                </p>
                                <button
                                    onClick={handleResend}
                                    disabled={isLoading}
                                    className="auth-link"
                                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center' }}
                                >
                                    {isLoading && <Loader2 className="icon-spin" />}
                                    Click to resend
                                </button>
                                {message && <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--accent-500)' }}>{message}</p>}
                            </div>

                            {/* Development Only: Simulator Button */}
                            <div className="mt-4" style={{ paddingTop: '1.5rem', borderTop: '1px dashed var(--gray-200)' }}>
                                <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Development Simulator</p>
                                <button
                                    onClick={handleSimulateVerification}
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '0.5rem 1rem',
                                        border: '1px solid transparent',
                                        borderRadius: '0.375rem',
                                        fontSize: '0.875rem',
                                        fontWeight: 500,
                                        color: 'var(--primary-600)',
                                        backgroundColor: 'var(--primary-50)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Simulate Clicking Link
                                </button>
                            </div>
                        </div>
                    )}

                    {status === 'verifying' && (
                        <div className="verification-status">
                            <Loader2 className="icon-spin" style={{ height: '3rem', width: '3rem', color: 'var(--primary-600)', margin: '0 auto' }} />
                            <h2 className="role-title">Verifying your email...</h2>
                        </div>
                    )}

                    {status === 'success' && (
                        <div className="verification-status">
                            <div className="status-icon-wrapper success">
                                <CheckCircle2 size={24} />
                            </div>
                            <div>
                                <h2 className="auth-title" style={{ marginTop: 0 }}>Email Verified!</h2>
                                <p className="auth-subtitle">
                                    Your account has been successfully verified.
                                </p>
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="auth-btn"
                                >
                                    Continue to Login
                                </button>
                            </div>
                        </div>
                    )}

                    {status === 'error' && (
                        <div className="verification-status">
                            <div className="status-icon-wrapper error">
                                <AlertCircle size={24} />
                            </div>
                            <div>
                                <h2 className="auth-title" style={{ marginTop: 0 }}>Verification Failed</h2>
                                <p className="auth-subtitle">
                                    {message || 'The verification link is invalid or expired.'}
                                </p>
                            </div>
                            <button
                                onClick={() => setStatus('sent')}
                                className="auth-link"
                                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                Try sending again
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
