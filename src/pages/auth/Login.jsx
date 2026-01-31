import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import './auth.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please enter both email and password.');
            return;
        }

        setIsLoading(true);

        try {
            const data = await login(formData.email, formData.password);
            // Role-based redirect
            const role = data.user.role;
            navigate(`/dashboard/${role}`);
        } catch (err) {
            setError(err.message || 'Login failed.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-header">
                <h2 className="auth-title">
                    Sign in to your account
                </h2>
                <p className="auth-subtitle">
                    Or{' '}
                    <Link to="/signup" className="auth-link">
                        create a new account
                    </Link>
                </p>
            </div>

            <div className="auth-card-container">
                <div className="auth-card">
                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    <form className="auth-form" onSubmit={handleSubmit}>
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
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <div className="input-group">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
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

                        <div className="flex-between">
                            <div className="form-checkbox-group">
                                <input
                                    id="remember-me"
                                    name="remember"
                                    type="checkbox"
                                    checked={formData.remember}
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                                <label htmlFor="remember-me" className="form-checkbox-label">
                                    Remember me
                                </label>
                            </div>

                            <div style={{ fontSize: '0.875rem' }}>
                                <Link to="/forgot-password" className="auth-link">
                                    Forgot your password?
                                </Link>
                            </div>
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
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
