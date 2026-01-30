import React from 'react';
import { Camera, MapPin, Link as LinkIcon, Github, FileText, CheckCircle, Star } from 'lucide-react';

const FreelancerProfile = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Freelancer Profile</h1>
                    <p className="page-description">Manage your brand and portfolio.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    View Public Profile
                </button>
            </div>

            <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Identity */}
                    <div className="card">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary-100)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: 'var(--brand-navy)'
                            }}>
                                FD
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>Frontend Developer</h2>
                                    <span className="tag tag-verification"><CheckCircle size={14} style={{ marginRight: '4px' }} /> Top Rated</span>
                                </div>
                                <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>Expert React & UI/UX Specialist</p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> Remote</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={14} fill="#eab308" color="#eab308" /> 4.9 (24 Reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="card-title" style={{ margin: 0 }}>Portfolio</h3>
                            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>+ Add Item</button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {[1, 2, 3].map(i => (
                                <div key={i} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                                    <div style={{ height: '140px', backgroundColor: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <ImagePlaceholder />
                                    </div>
                                    <div style={{ padding: '0.75rem' }}>
                                        <p style={{ fontWeight: '600', fontSize: '0.9375rem', color: 'var(--brand-navy)' }}>E-commerce App {i}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>React, Node.js</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Hourly Rate</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>$35 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--gray-500)' }}>/ hr</span></div>
                    </div>

                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <span className="tag">React</span>
                            <span className="tag">TypeScript</span>
                            <span className="tag">Tailwind</span>
                            <span className="tag">Figma</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ImagePlaceholder = () => (
    <div style={{ color: 'var(--gray-400)' }}>IMG</div>
);

export default FreelancerProfile;
