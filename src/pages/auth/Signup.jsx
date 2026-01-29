import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { User, Briefcase, GraduationCap, Building2, Eye, EyeOff, Loader2 } from 'lucide-react';
import './auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Role, 2: Form
    const [role, setRole] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        terms: false
    });

    const roles = [
        { id: 'student', title: 'Student', icon: GraduationCap, desc: 'Learn and grow your skills' },
        { id: 'freelancer', title: 'Freelancer', icon: Briefcase, desc: 'Find work and get paid' },
        { id: 'teacher', title: 'Teacher', icon: User, desc: 'Share knowledge and earn' },
        { id: 'employer', title: 'Employer', icon: Building2, desc: 'Hire top talent' }
    ];

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
        setStep(2);
        setError('');
    };

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

        // Validation
        if (!formData.name || !formData.email || !formData.password) {
            setError('All fields are required.');
            return;
        }
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (!formData.terms) {
            setError('You must agree to the Terms & Conditions.');
            return;
        }

        setIsLoading(true);

        try {
            await authService.signup({ ...formData, role });
            // Redirect to email verification (simulated)
            navigate('/verify-email', { state: { email: formData.email } });
        } catch (err) {
            setError(err.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-header">
                <h2 className="auth-title">
                    {step === 1 ? 'Join as a...' : 'Create your account'}
                </h2>
                <p className="auth-subtitle">
                    {step === 1
                        ? 'Choose your role to get started'
                        : <span>
                            Already have an account?{' '}
                            <Link to="/login" className="auth-link">
                                Sign in
                            </Link>
                        </span>
                    }
                </p>
            </div>

            <div className="auth-card-container">
                <div className="auth-card">

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {step === 1 ? (
                        <div className="role-grid">
                            {roles.map((r) => {
                                const Icon = r.icon;
                                return (
                                    <button
                                        key={r.id}
                                        onClick={() => handleRoleSelect(r.id)}
                                        className="role-card"
                                    >
                                        <div className="role-icon-wrapper">
                                            <Icon className="role-icon" />
                                        </div>
                                        <div className="role-content">
                                            <p className="role-title">{r.title}</p>
                                            <p className="role-desc">{r.desc}</p>
                                        </div>
                                        <div className="role-radio" />
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="back-btn"
                                >
                                    ← Change Role ({roles.find(r => r.id === role)?.title})
                                </button>
                            </div>

                            <div className="form-group">
                                <label htmlFor="name" className="form-label">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
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

                            <div className="form-checkbox-group">
                                <input
                                    id="terms"
                                    name="terms"
                                    type="checkbox"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    className="form-checkbox"
                                />
                                <label htmlFor="terms" className="form-checkbox-label">
                                    I agree to the{' '}
                                    <a href="#" className="auth-link">
                                        Terms
                                    </a>{' '}
                                    and{' '}
                                    <a href="#" className="auth-link">
                                        Privacy Policy
                                    </a>
                                </label>
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
                                            Creating account...
                                        </>
                                    ) : (
                                        'Create Account'
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

export default Signup;
