import React from 'react';
import { Check, Shield, Zap, Info } from 'lucide-react';

const Pricing = () => {
    const commissions = [
        { type: 'Freelance Services', rate: '20%', desc: 'Per order completion.' },
        { type: 'Recorded Courses', rate: '25%', desc: 'Per student enrollment.' },
        { type: 'Assignment Solutions', rate: '15%', desc: 'Per successful solution delivery.' },
    ];

    const features = [
        { title: 'Free Signup', desc: 'Join the community and browse opportunities at no cost.', icon: Zap },
        { title: 'Pay When You Earn', desc: 'No monthly subscriptions. We only take a fee when you get paid.', icon: Shield },
        { title: 'Escrow Protection', desc: 'Funds are held securely and released only on approval.', icon: Check },
    ];

    return (
        <div style={{ backgroundColor: 'var(--gray-50)' }}>
            {/* Header */}
            <section className="pricing-header">
                <div className="container">
                    <h1 className="pricing-title">
                        Simple. Transparent. <span className="highlight">Fair.</span>
                    </h1>
                    <p className="pricing-description">
                        Our mission is trust. That starts with clear, upfront pricing and guaranteed protection for every transaction.
                    </p>
                </div>
            </section>

            {/* Commission Cards */}
            <section className="section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <div className="pricing-badge">
                            <span>Introductory Pricing Available</span>
                        </div>
                        <h2 className="section-title">Platform Commission</h2>
                    </div>

                    <div className="commission-grid">
                        {commissions.map((c, i) => (
                            <div key={i} className="commission-card">
                                <h4 className="commission-type">{c.type}</h4>
                                <div className="commission-rate">{c.rate}</div>
                                <p className="commission-desc">{c.desc}</p>
                                <div className="commission-users">
                                    <div className="user-avatar"></div>
                                    <div className="user-avatar"></div>
                                    <div className="user-avatar"></div>
                                    <div className="user-avatar"></div>
                                </div>
                                <span className="commission-trust">TRUSTED BY 5000+ USERS</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Escrow Highlight */}
            <section className="escrow-section">
                <div className="escrow-content">
                    <Shield className="escrow-icon" />
                    <h2 className="escrow-title">Secure Escrow Protection</h2>
                    <p className="escrow-description">
                        We hold funds safely during every project. Students pay upfront, but freelancers only receive the money once the student confirms the work is complete and satisfactory.
                    </p>
                    <div className="escrow-badge">
                        <Info />
                        <span>Peace of mind for both parties, every time.</span>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="section">
                <div className="container">
                    <div className="features-grid">
                        {features.map((f, i) => (
                            <div key={i} className="feature-item">
                                <div className="feature-icon">
                                    <f.icon />
                                </div>
                                <h4 className="feature-title">{f.title}</h4>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section style={{ paddingBottom: '6rem', textAlign: 'center' }}>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', fontStyle: 'italic' }}>* Commissions may vary based on project complexity and verification status.</p>
            </section>
        </div>
    );
};

export default Pricing;
