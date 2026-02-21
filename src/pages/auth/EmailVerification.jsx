import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import './auth.css';

const EmailVerification = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    
    const [status, setStatus] = useState('sent'); // sent, verifying, success, error
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    

    const email = state?.email || 'your email';

    useEffect(() => {
        if (token) {
            verifyToken(token);
        }
    }, [token]);

    const verifyToken = async (verificationToken) => {
        setStatus('verifying');
        try {
            const response = await authService.verifyEmail(verificationToken);
            setStatus('success');
            
            setMessage(`Welcome ${response.user.name || email.split('@')[0]}! Your email is now verified.`);
            
            // If backend returns token/user, we could auto login here
            if (response.token && response.user) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('user', JSON.stringify(response.user));
                
                // Optional: Reload page or update context to reflect logged in state
                window.location.reload();
            } else {
                // For now, let's just show success and a button to go to dashboard
                setTimeout(() => {
                    setMessage('Successfully verified! Redirecting to dashboard...');
                    // Redirect based on role (App routes use /dashboard/<role>)
                    switch(response.user.role) {
                        case 'employer':
                            navigate('/dashboard/employer');
                            break;
                        case 'teacher':
                            navigate('/dashboard/teacher');
                            break;
                        case 'freelancer':
                            navigate('/dashboard/freelancer');
                            break;
                        case 'student':
                            navigate('/dashboard/student');
                            break;
                        case 'admin':
                            navigate('/dashboard/admin');
                            break;
                        default:
                            navigate('/');
                    }
                }, 2000);
            }

        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Verification failed. Link might be expired.');
        }
    };

    const handleResend = async () => {
        setIsLoading(true);
        try {
            await authService.resendVerification(email);
            setMessage('New verification link sent!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage(err.message || 'Failed to send link.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoToLogin = () => {
        navigate('/auth/login');
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
                        </div>
                    )}

                    {status === 'verifying' && (
                        <div className="verification-status">
                            <div className="status-icon-wrapper verifying">
                                <Loader2 size={24} className="icon-spin" />
                            </div>
                            <div>
                                <h2 className="auth-title" style={{ marginTop: 0 }}>Verifying...</h2>
                                <p className="auth-subtitle">
                                    Please wait while we verify your email address.
                                </p>
                            </div>
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
                                    Your account has been successfully verified. Redirecting you to dashboard...
                                </p>
                            </div>
                            <button onClick={handleGoToLogin} className="submit-button" style={{ marginTop: '1rem' }}>
                                Continue to Login
                            </button>
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
                                    {message}
                                </p>
                            </div>
                            <button onClick={handleResend} className="submit-button" style={{ marginTop: '1rem' }}>
                                Resend Verification Link
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
