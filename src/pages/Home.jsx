import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import {
    CheckCircle,
    ArrowRight,
    Briefcase,
    GraduationCap,
    Users,
    Building2,
    ShieldCheck,
    Lock,
    Globe
} from 'lucide-react';

const Home = () => {
    return (
        <div className="home-container">
            {/* 1. HERO SECTION (Investor-Ready) */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content">
                            <div className="hero-badge">
                                <ShieldCheck size={16} className="text-accent" />
                                <span>The Verified Tech Ecosystem</span>
                            </div>
                            <h1 className="hero-title">
                                Verified Talent. <br />
                                <span className="text-primary">Real Projects.</span>
                            </h1>
                            <p className="hero-sub">
                                The vetted platform where universities, freelancers, and enterprises collaborate.
                                Secure payments, identity verification, and proven skill sets.
                            </p>
                            <div className="hero-actions">
                                <Link to="/register" className="btn btn-primary">
                                    Get Started
                                </Link>
                                <Link to="/how-it-works" className="btn btn-outline">
                                    Why Atechlancer?
                                </Link>
                            </div>
                            <div className="trust-micro">
                                <div className="tm-item">
                                    <CheckCircle size={16} className="text-accent" /> Identity Verified
                                </div>
                                <div className="tm-item">
                                    <CheckCircle size={16} className="text-accent" /> Escrow Secured
                                </div>
                            </div>
                        </div>

                        {/* Abstract Dashboard Visual (CSS Drawn) */}
                        <div className="hero-visual">
                            <div className="glass-card main-card">
                                <div className="gc-header">
                                    <div className="gc-dots"></div>
                                    <div className="gc-badge">Verified Pro</div>
                                </div>
                                <div className="gc-body">
                                    <div className="gc-row">
                                        <div className="gc-avatar"></div>
                                        <div className="gc-lines">
                                            <div className="gc-line w-60"></div>
                                            <div className="gc-line w-40"></div>
                                        </div>
                                    </div>
                                    <div className="gc-stats">
                                        <div className="gc-stat">
                                            <div className="stat-val text-accent">98%</div>
                                            <div className="stat-lbl">Success</div>
                                        </div>
                                        <div className="gc-stat">
                                            <div className="stat-val text-primary">$12k+</div>
                                            <div className="stat-lbl">Earned</div>
                                        </div>
                                    </div>
                                    <div className="gc-skills">
                                        <div className="gc-pill">React</div>
                                        <div className="gc-pill">Node.js</div>
                                        <div className="gc-pill">Python</div>
                                    </div>
                                </div>
                            </div>
                            <div className="glass-card floating-card-1">
                                <ShieldCheck size={24} className="text-accent" />
                                <div>
                                    <div className="fc-title">Skill Verified</div>
                                    <div className="fc-sub">Top 5% Talent</div>
                                </div>
                            </div>
                            <div className="glass-card floating-card-2">
                                <Lock size={24} className="text-primary" />
                                <div>
                                    <div className="fc-title">Escrow Safe</div>
                                    <div className="fc-sub">Funds Protected</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. TRUST INDICATORS */}
            <div className="trust-strip">
                <div className="container">
                    <p className="trust-label">TRUSTED BY UNIVERSITIES & ENTERPRISES</p>
                    <div className="trust-grid">
                        <div className="trust-item">
                            <ShieldCheck size={20} className="text-accent" />
                            <span>Admin-Verified Sellers</span>
                        </div>
                        <div className="trust-item">
                            <CheckCircle size={20} className="text-accent" />
                            <span>Skill-Based Approval</span>
                        </div>
                        <div className="trust-item">
                            <Lock size={20} className="text-accent" />
                            <span>Escrow Payments</span>
                        </div>
                        <div className="trust-item">
                            <Globe size={20} className="text-accent" />
                            <span>Global Talent Pool</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. AUDIENCE SEGMENTS (4 Clean Cards) */}
            <section className="audience-section">
                <div className="container">
                    <div className="section-header">
                        <h2>A Unified Ecosystem</h2>
                        <p>Designed for every stakeholder in the tech economy.</p>
                    </div>
                    <div className="audience-grid">
                        <div className="audience-card">
                            <div className="ac-icon"><GraduationCap size={28} /></div>
                            <h3>Students</h3>
                            <p>Showcase projects & earn from real assignments.</p>
                            <Link to="/register?role=student" className="ac-link">Join as Student <ArrowRight size={16} /></Link>
                        </div>
                        <div className="audience-card">
                            <div className="ac-icon"><Briefcase size={28} /></div>
                            <h3>Freelancers</h3>
                            <p>Access high-value, verified tech projects.</p>
                            <Link to="/register?role=freelancer" className="ac-link">Join as Freelancer <ArrowRight size={16} /></Link>
                        </div>
                        <div className="audience-card">
                            <div className="ac-icon"><Users size={28} /></div>
                            <h3>Teachers</h3>
                            <p>Issue certificates & mentor the next generation.</p>
                            <Link to="/register?role=teacher" className="ac-link">Join as Teacher <ArrowRight size={16} /></Link>
                        </div>
                        <div className="audience-card">
                            <div className="ac-icon"><Building2 size={28} /></div>
                            <h3>Employers</h3>
                            <p>Hire pre-vetted talent with zero risk.</p>
                            <Link to="/register?role=employer" className="ac-link">Post a Job <ArrowRight size={16} /></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PROCESS FLOW (3 Steps) */}
            <section className="process-section">
                <div className="container">
                    <div className="process-wrapper">
                        <div className="process-step">
                            <div className="step-num">01</div>
                            <h4>Verify Identity</h4>
                            <p>Upload credentials to prove you are real.</p>
                        </div>
                        <div className="process-divider"></div>
                        <div className="process-step">
                            <div className="step-num">02</div>
                            <h4>Demonstrate Skill</h4>
                            <p>Pass domain-specific tests or portfolio reviews.</p>
                        </div>
                        <div className="process-divider"></div>
                        <div className="process-step">
                            <div className="step-num">03</div>
                            <h4>Work Securely</h4>
                            <p>Collaborate with escrow protection enabled.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. FINAL CTA */}
            <section className="final-cta">
                <div className="container">
                    <div className="cta-box">
                        <h2>Ready to work with verified professionals?</h2>
                        <p>Join the platform built on trust, transparency, and technical excellence.</p>
                        <div className="cta-buttons">
                            <Link to="/register" className="btn btn-white">Get Started</Link>
                            <Link to="/contact" className="btn btn-link">Contact Sales</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
