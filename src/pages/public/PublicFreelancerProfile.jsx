import React from 'react';
import { MapPin, CheckCircle, Star, ArrowLeft, Mail, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './public-profile.css';

const PublicFreelancerProfile = () => {
    const navigate = useNavigate();

    // Mock Public Data (In real app, fetch by ID/Username)
    const freelancer = {
        name: 'Hamna Javaid',
        title: 'Frontend Developer',
        bio: 'Expert React & UI/UX Specialist with a passion for building pixel-perfect web experiences.',
        location: 'Remote',
        rating: 4.9,
        reviews: 24,
        hourlyRate: 35,
        skills: ['React', 'TypeScript', 'Tailwind', 'Figma', 'Node.js', 'Next.js'],
        portfolio: [
            { id: 1, title: 'E-commerce App 1', tech: 'React, Node.js' },
            { id: 2, title: 'E-commerce App 2', tech: 'React, Node.js' },
            { id: 3, title: 'E-commerce App 3', tech: 'React, Node.js' }
        ]
    };

    return (
        <div className="public-profile-page">
            <div className="profile-container">

                {/* Back / Navigation */}
                <button
                    onClick={() => navigate(-1)}
                    className="btn back-btn-ghost mb-lg flex-row-gap gap-sm"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="profile-grid">

                    {/* Main Content */}
                    <div className="flex-col gap-xl">

                        {/* Header Card */}
                        <div className="card">
                            <div className="profile-header-meta">
                                <div className="profile-avatar-large">
                                    {freelancer.name.substring(0, 2).toUpperCase()}
                                </div>

                                <div className="profile-info-main">
                                    <h1 className="profile-name-h1">
                                        {freelancer.name}
                                    </h1>
                                    <h2 className="profile-title-h2">
                                        {freelancer.title}
                                    </h2>

                                    <div className="flex-row-gap gap-lg text-muted">
                                        <span className="flex-row-gap gap-sm">
                                            <MapPin size={16} /> {freelancer.location}
                                        </span>
                                        <span className="flex-row-gap gap-sm">
                                            <Star size={16} fill="#eab308" color="#eab308" /> {freelancer.rating} ({freelancer.reviews} Reviews)
                                        </span>
                                        <span className="tag tag-verification">
                                            <CheckCircle size={14} style={{ marginRight: '4px' }} /> Verified Pro
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="profile-bio-text">
                                {freelancer.bio}
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div className="card">
                            <h3 className="card-title mb-lg">Portfolio</h3>
                            <div className="portfolio-grid">
                                {freelancer.portfolio.map(item => (
                                    <div key={item.id} className="portfolio-item-card">
                                        <div className="portfolio-preview-box">
                                            PROJECT PREVIEW
                                        </div>
                                        <div className="portfolio-info">
                                            <h4>{item.title}</h4>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{item.tech}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar-sticky-wrap">
                        <div className="card">
                            <div className="rate-display">
                                <span className="label">Hourly Rate</span>
                                <span className="value">${freelancer.hourlyRate}</span>
                            </div>
                            <button className="btn btn-primary w-full mb-md">Hire Me</button>
                            <button className="btn btn-outline w-full flex-row-gap gap-sm" style={{ justifyContent: 'center' }}>
                                <Mail size={18} /> Contact
                            </button>
                        </div>

                        <div className="card">
                            <h3 className="card-title mb-md">Skills</h3>
                            <div className="skills-cloud">
                                {freelancer.skills.map(skill => (
                                    <span key={skill} className="tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="card-title mb-md">Share Profile</h3>
                            <button className="btn btn-outline social-share-btn flex-row-gap gap-sm">
                                <Share2 size={18} /> Copy Link
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PublicFreelancerProfile;
