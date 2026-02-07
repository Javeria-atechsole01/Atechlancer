import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, GraduationCap, DollarSign, UserCheck, Lock } from 'lucide-react';
import './why-atechlancer.css';

const WhyAtechlancer = () => {
    return (
        <div className="why-page">
            <div className="why-hero">
                <div className="container">
                    <h1>Why Choose Atechlancer?</h1>
                    <p>The first platform dedicated to blending professional excellence with academic integrity.</p>
                </div>
            </div>

            <div className="why-section">
                <div className="why-grid">
                    <div className="why-card">
                        <div className="why-card-icon"><Shield size={32} /></div>
                        <h3>Trust & Verification</h3>
                        <p>Every freelancer and academic expert on our platform undergoes a rigorous identity verification process. We ensure you're working with real professionals.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-card-icon"><GraduationCap size={32} /></div>
                        <h3>Student Focused</h3>
                        <p>We provide a safe haven for students to find legitimate help, tutoring, and resource guidance without compromising on ethical standards.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-card-icon"><Lock size={32} /></div>
                        <h3>Secure Payments</h3>
                        <p>Our escrow system ensures that your funds are only released when you are 100% satisfied with the work delivered.</p>
                    </div>

                    <div className="why-card">
                        <div className="why-card-icon"><UserCheck size={32} /></div>
                        <h3>Admin Approved</h3>
                        <p>All posts and submissions are monitored for quality and compliance, ensuring a high-signal marketplace for everyone.</p>
                    </div>
                </div>
            </div>

            <div className="cta-section">
                <div className="cta-wrap">
                    <h2>Ready to get started?</h2>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
                        <Link to="/signup" className="btn btn-primary" style={{ padding: '1rem 2,5rem' }}>Join Now</Link>
                        <Link to="/how-it-works" className="btn btn-secondary" style={{ padding: '1rem 2.5rem' }}>Learn More</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyAtechlancer;
