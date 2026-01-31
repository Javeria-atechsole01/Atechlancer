import React, { useState } from 'react';
import { MapPin, CheckCircle, Star, ArrowLeft, Mail, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
        <div style={{ backgroundColor: 'var(--gray-50)', minHeight: '100vh', padding: '2rem' }}>
            <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>

                {/* Back / Navigation */}
                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-outline mb-lg flex-row-gap gap-sm"
                    style={{ border: 'none', background: 'transparent', paddingLeft: 0 }}
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem' }}>

                    {/* Main Content */}
                    <div className="flex-col gap-xl">

                        {/* Header Card */}
                        <div className="card">
                            <div className="flex-row-gap gap-xl" style={{ alignItems: 'flex-start' }}>
                                <div style={{
                                    width: '120px', height: '120px', borderRadius: '50%',
                                    backgroundColor: 'var(--brand-navy)', color: 'white',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2.5rem', fontWeight: 'bold'
                                }}>
                                    {freelancer.name.substring(0, 2).toUpperCase()}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>
                                        {freelancer.name}
                                    </h1>
                                    <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-600)', fontWeight: '500', marginBottom: '1rem' }}>
                                        {freelancer.title}
                                    </h2>

                                    <div className="flex-row-gap gap-lg text-muted">
                                        <span className="flex-row-gap gap-sm"><MapPin size={16} /> {freelancer.location}</span>
                                        <span className="flex-row-gap gap-sm"><Star size={16} fill="#eab308" color="#eab308" /> {freelancer.rating} ({freelancer.reviews} Reviews)</span>
                                        <span className="tag tag-verification"><CheckCircle size={14} style={{ marginRight: '4px' }} /> Verified Pro</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginTop: '2rem', fontSize: '1.05rem', color: 'var(--gray-700)', lineHeight: '1.6' }}>
                                {freelancer.bio}
                            </div>
                        </div>

                        {/* Portfolio */}
                        <div className="card">
                            <h3 className="card-title mb-lg">Portfolio</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                                {freelancer.portfolio.map(item => (
                                    <div key={item.id} style={{
                                        borderRadius: 'var(--radius-md)', overflow: 'hidden',
                                        border: '1px solid var(--gray-200)', transition: 'transform 0.2s',
                                        cursor: 'pointer'
                                    }} className="hover-card">
                                        <div style={{
                                            height: '160px', backgroundColor: 'var(--gray-100)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: 'var(--gray-400)', fontWeight: '600'
                                        }}>
                                            PROJECT PREVIEW
                                        </div>
                                        <div style={{ padding: '1rem' }}>
                                            <h4 style={{ fontWeight: '600', color: 'var(--brand-navy)', marginBottom: '0.25rem' }}>{item.title}</h4>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{item.tech}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="flex-col gap-lg">
                        <div className="card">
                            <div className="flex-row-between mb-md">
                                <span className="text-muted">Hourly Rate</span>
                                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>${freelancer.hourlyRate}</span>
                            </div>
                            <button className="btn btn-primary w-full mb-md">Hire Me</button>
                            <button className="btn btn-outline w-full flex-row-gap gap-sm" style={{ justifyContent: 'center' }}>
                                <Mail size={18} /> Contact
                            </button>
                        </div>

                        <div className="card">
                            <h3 className="card-title mb-md">Skills</h3>
                            <div className="flex-row-gap gap-sm" style={{ flexWrap: 'wrap' }}>
                                {freelancer.skills.map(skill => (
                                    <span key={skill} className="tag">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="card">
                            <h3 className="card-title mb-md">Share Profile</h3>
                            <button className="btn btn-outline w-full flex-row-gap gap-sm" style={{ justifyContent: 'center' }}>
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
