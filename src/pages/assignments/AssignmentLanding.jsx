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
                    <h1 className="hero-title">
                        Academic Assignment <span className="hero-title-accent">Marketplace</span>
                    </h1>
                    <p className="hero-subtitle">
                        Connect with verified academic experts for guidance and solutions. Professional, ethical, and result-oriented.
                    </p>
                    <div className="hero-actions">
                        <Link to="/dashboard/student/post-assignment" className="btn btn-primary">
                            Post Assignment <ArrowRight size={20} />
                        </Link>
                        <Link to="/assignments/feed" className="btn btn-secondary-outline">
                            Browse Assignments
                        </Link>
                    </div>
                </div>
            </div>

            <div className="assignment-container">
                {/* How It Works Section */}
                <section className="how-it-works">
                    <h2>How It Works</h2>
                    <p className="subtitle">A seamless process designed for academic success</p>

                    <div className="steps">
                        <div className="step">
                            <div className="step-icon-box">
                                <ClipboardList size={32} />
                            </div>
                            <h4>Post Requirement</h4>
                            <p>Share your assignment details, files, and deadline.</p>
                        </div>

                        <div className="step">
                            <div className="step-icon-box">
                                <Zap size={32} />
                            </div>
                            <h4>Receive Bids</h4>
                            <p>Verified experts provide competitive offers.</p>
                        </div>

                        <div className="step">
                            <div className="step-icon-box">
                                <UserCheck size={32} />
                            </div>
                            <h4>Select Expert</h4>
                            <p>Choose the best expert based on profile and bids.</p>
                        </div>

                        <div className="step">
                            <div className="step-icon-box">
                                <CheckCircle size={32} />
                            </div>
                            <h4>Get Solution</h4>
                            <p>Receive high-quality work and release payment.</p>
                        </div>
                    </div>
                </section>

                {/* Academic Integrity Section */}
                <section className="integrity">
                    <div className="integrity-icon-large">
                        <ShieldCheck size={48} />
                    </div>
                    <h2>Academic Integrity First</h2>
                    <p>
                        AtechLancer is committed to fostering a supportive and ethical learning environment. Our marketplace is designed for tutoring, guidance, and reference purposes only. We strictly prohibit any activities that violate institutional academic policies.
                    </p>

                    <ul className="integrity-list">
                        <li>Plagiarism-free solutions guaranteed</li>
                        <li>Verified academic experts only</li>
                        <li>Confidential and secure platform</li>
                        <li>Transparent communication channels</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default AssignmentLanding;
