import React from 'react';
import { ArrowRight, CheckCircle, Users, Briefcase, GraduationCap, BookOpen, ShieldCheck } from 'lucide-react';

const Home = () => {
    const services = [
        { title: 'Freelance Services', icon: Briefcase, description: 'Connect with verified experts for your business needs.' },
        { title: 'Final Year Projects', icon: GraduationCap, description: 'Showcase your innovation and earn from your hard work.' },
        { title: 'Assignment Solutions', icon: BookOpen, description: 'Expert guidance and plagiarism-checked solutions.' },
        { title: 'Teacher Hiring', icon: Users, description: 'Dedicated matching for schools and institutions.' },
        { title: 'Online Courses', icon: ShieldCheck, description: 'Learn from industry pros with recorded premium content.' },
    ];

    const targetAudience = [
        { role: 'Students', benefit: 'Earn while you learn and get verified project help.' },
        { role: 'Freelancers', benefit: 'Higher trust with verification and steady income.' },
        { role: 'Teachers', benefit: 'Monetize your expertise and reach global students.' },
        { role: 'Employers', benefit: 'Hire confidently from a pool of pre-vetted talent.' },
    ];

    const trustFeatures = [
        { title: 'Admin-Verified Sellers', desc: 'Manual review of every professional profile.' },
        { title: 'Skill Tests & Documents', desc: 'Evidence-based proficiency verification.' },
        { title: 'Escrow-Based Payments', desc: 'Funds released only when tasks are approved.' },
        { title: 'Ratings & Reviews', desc: 'Real feedback from our growing global community.' }
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <h1 className="hero-title">
                                Where Skills, Education & <span className="highlight">Freelancing Meet</span>
                            </h1>
                            <p className="hero-description">
                                Built on Trust. A verified platform for students, freelancers, teachers, and employers to work, learn, and earn — safely.
                            </p>
                            <div className="hero-cta">
                                <button className="btn btn-primary">
                                    Get Started <ArrowRight size={20} />
                                </button>
                                <button className="btn btn-secondary">
                                    How it Works
                                </button>
                            </div>
                            <div className="hero-features">
                                <div className="hero-feature">
                                    <CheckCircle />
                                    <span>Verified Sellers</span>
                                </div>
                                <div className="hero-feature">
                                    <CheckCircle />
                                    <span>Secure Escrow</span>
                                </div>
                                <div className="hero-feature">
                                    <CheckCircle />
                                    <span>24/7 Support</span>
                                </div>
                            </div>
                        </div>
                        <div className="hero-image">
                            <div className="hero-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200" alt="Students collaborating" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Comprehensive Solutions</h2>
                    <p className="section-description">Explore the diverse opportunities AtechLancer offers for everyone.</p>
                    <div className="card-grid">
                        {services.map((service, index) => (
                            <div key={index} className="card">
                                <div className="card-icon">
                                    <service.icon />
                                </div>
                                <h3 className="card-title">{service.title}</h3>
                                <p className="card-description">{service.description}</p>
                                <span className="card-link">
                                    Learn More <ArrowRight />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust & Verification */}
            <section className="section section-primary trust-section">
                <div className="container">
                    <div className="trust-grid">
                        <div className="trust-content">
                            <h2 className="trust-title">Your Success is Protected by Our Commitment to Trust</h2>
                            <div className="trust-features">
                                {trustFeatures.map((item, i) => (
                                    <div key={i} className="trust-feature">
                                        <div className="trust-icon">
                                            <CheckCircle />
                                        </div>
                                        <div>
                                            <h4 className="trust-feature-title">{item.title}</h4>
                                            <p className="trust-feature-desc">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="trust-image">
                            <div className="trust-image-wrapper">
                                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" alt="Team meeting" />
                                <div className="trust-badge">
                                    <div className="trust-badge-icon">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div>
                                        <div className="trust-badge-number">100%</div>
                                        <div className="trust-badge-text">Verified Process</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Who is it for */}
            <section className="section section-gray">
                <div className="container">
                    <h2 className="section-title">Designed for Everyone in the Ecosystem</h2>
                    <div className="audience-grid">
                        {targetAudience.map((target, idx) => (
                            <div key={idx} className="audience-card">
                                <h4 className="audience-role">{target.role}</h4>
                                <p className="audience-benefit">{target.benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-box">
                        <h2 className="cta-title">Start your journey with verified opportunities.</h2>
                        <button className="cta-button">
                            Join AtechLancer Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
