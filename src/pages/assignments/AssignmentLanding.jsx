import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, ShieldCheck, ArrowRight, ClipboardList, UserCheck, Zap } from 'lucide-react';
import './assignments.css';

const AssignmentLanding = () => {
    return (
        <div className="assignment-landing">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="details-container">
                    <h1 className="hero-title" style={{ color: 'white' }}>
                        Academic Assignment <span style={{ color: 'var(--accent-400)' }}>Marketplace</span>
                    </h1>
                    <p className="hero-subtitle">
                        Connect with verified academic experts for guidance and solutions. Professional, ethical, and result-oriented.
                    </p>
                    <div className="hero-actions">
                        <Link to="/dashboard/student/post-assignment" className="btn btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem' }}>
                            Post Assignment <ArrowRight size={20} />
                        </Link>
                        <Link to="/assignments/feed" className="btn btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.125rem', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                            Browse Assignments
                        </Link>
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <div className="how-it-works">
                <div className="section-header">
                    <h2 style={{ fontSize: '2.5rem', color: 'var(--primary-900)' }}>How It Works</h2>
                    <p style={{ fontSize: '1.125rem', color: 'var(--gray-500)' }}>A seamless process designed for academic success</p>
                </div>

                <div className="steps-container">
                    {[
                        { icon: <ClipboardList />, title: "Post Requirement", desc: "Share your assignment details, files, and deadline." },
                        { icon: <Zap />, title: "Receive Bids", desc: "Verified experts review and provide competitive offers." },
                        { icon: <UserCheck />, title: "Select Expert", desc: "Choose the best match based on profile and bids." },
                        { icon: <CheckCircle />, title: "Get Solution", desc: "Receive high-quality work and release payment." }
                    ].map((step, i) => (
                        <div key={i} className="step-item">
                            <div className="step-icon-wrap" style={{ color: 'var(--primary-700)', background: 'var(--primary-50)' }}>
                                {step.icon}
                            </div>
                            <h3 className="step-title" style={{ fontSize: '1.25rem', color: 'var(--primary-900)' }}>{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust & Ethics Section */}
            <div className="trust-section" style={{ background: 'var(--gray-50)', borderTop: '1px solid var(--gray-100)' }}>
                <div className="trust-card">
                    <div className="trust-icon-large">
                        <ShieldCheck style={{ color: '#059669' }} size={48} />
                    </div>
                    <div className="trust-content">
                        <h2 style={{ fontSize: '2rem', color: 'var(--primary-900)', marginBottom: '1rem' }}>Academic Integrity First</h2>
                        <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>
                            AtechLancer is committed to fostering a supportive and ethical learning environment. Our marketplace is designed for tutoring, guidance, and reference purposes. We strictly prohibit any activities that violate institutional academic policies.
                        </p>
                        <ul className="trust-list" style={{ marginTop: '2rem' }}>
                            {[
                                "Plagiarism-free solutions guaranteed",
                                "Verified academic experts only",
                                "Confidential and secure platform",
                                "Transparent communication channels"
                            ].map((item, i) => (
                                <li key={i} className="trust-list-item" style={{ fontSize: '1rem', color: 'var(--gray-700)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <CheckCircle size={20} style={{ color: '#059669' }} /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentLanding;
