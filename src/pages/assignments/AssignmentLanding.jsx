import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, ShieldCheck, ArrowRight, ClipboardList, UserCheck, Zap } from 'lucide-react';
import './assignments.css';

const AssignmentLanding = () => {
    return (
        <div className="assignment-landing">
            {/* Hero Section */}
            <div className="hero-section">
                <div className="container">
                    <h1 className="hero-title">
                        Academic Assignment <span style={{ color: 'var(--accent-500)' }}>Marketplace</span>
                    </h1>
                    <p className="hero-subtitle">
                        Connect with verified academic experts for guidance and solutions. Professional, ethical, and result-oriented.
                    </p>
                    <div className="hero-actions">
                        <Link to="/dashboard/student/post-assignment" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                            Post Assignment <ArrowRight size={20} />
                        </Link>
                        <Link to="/assignments/feed" className="btn btn-secondary" style={{ padding: '1rem 2rem' }}>
                            Browse Assignments
                        </Link>
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <div className="how-it-works">
                <div className="section-header">
                    <h2>How It Works</h2>
                    <p>A seamless process designed for academic success</p>
                </div>

                <div className="steps-container">
                    {[
                        { icon: <ClipboardList />, title: "Post Requirement", desc: "Share your assignment details, files, and deadline." },
                        { icon: <Zap />, title: "Receive Bids", desc: "Verified experts review and provide competitive offers." },
                        { icon: <UserCheck />, title: "Select Expert", desc: "Choose the best match based on profile and bids." },
                        { icon: <CheckCircle />, title: "Get Solution", desc: "Receive high-quality work and release payment." }
                    ].map((step, i) => (
                        <div key={i} className="step-item">
                            <div className="step-icon-wrap" style={{ color: 'var(--primary-600)' }}>
                                {step.icon}
                            </div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust & Ethics Section */}
            <div className="trust-section">
                <div className="trust-card">
                    <div className="trust-icon-large">
                        <ShieldCheck className="text-green-600" style={{ color: '#16a34a' }} size={48} />
                    </div>
                    <div className="trust-content">
                        <h2>Academic Integrity First</h2>
                        <p>
                            AtechLancer is committed to fostering a supportive and ethical learning environment. Our marketplace is designed for tutoring, guidance, and reference purposes. We strictly prohibit any activities that violate institutional academic policies.
                        </p>
                        <ul className="trust-list">
                            {[
                                "Plagiarism-free solutions guaranteed",
                                "Verified academic experts only",
                                "Confidential and secure platform",
                                "Transparent communication channels"
                            ].map((item, i) => (
                                <li key={i} className="trust-list-item">
                                    <CheckCircle size={18} style={{ color: '#16a34a' }} /> {item}
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
