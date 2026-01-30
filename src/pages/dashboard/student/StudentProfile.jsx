import React from 'react';
import { Camera, MapPin, Link as LinkIcon, Github, FileText } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

const StudentProfile = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Profile & Skills</h1>
                    <p className="page-description">Manage your public profile and verification.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Save Changes
                </button>
            </div>

            <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>

                {/* Main Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                    {/* Identity Card */}
                    <div className="card">
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: '50%',
                                    backgroundColor: 'var(--primary-100)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2rem',
                                    color: 'var(--brand-navy)',
                                    fontWeight: 'bold'
                                }}>
                                    SL
                                </div>
                                <button style={{
                                    position: 'absolute',
                                    bottom: '0',
                                    right: '0',
                                    backgroundColor: 'white',
                                    border: '1px solid var(--gray-200)',
                                    borderRadius: '50%',
                                    padding: '0.25rem',
                                    cursor: 'pointer'
                                }}>
                                    <Camera size={16} color="var(--gray-600)" />
                                </button>
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>Shani Local</h2>
                                        <p style={{ color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                            <MapPin size={16} /> Lahore, Pakistan
                                        </p>
                                    </div>
                                    <span className="tag tag-verification"><CheckCircle size={14} style={{ marginRight: '4px' }} /> Verified Student</span>
                                </div>

                                <div style={{ marginTop: '1.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Bio</label>
                                    <textarea
                                        className="search-input"
                                        rows="3"
                                        placeholder="Tell us about yourself..."
                                        defaultValue="Computer Science student at UET. Passionate about web development and AI. Looking for FYP partners and freelance gigs."
                                        style={{ width: '100%', resize: 'none' }}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Skills & Education */}
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Skills & Education</h3>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Skills (Tags)</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                <span className="tag">React.js</span>
                                <span className="tag">Node.js</span>
                                <span className="tag">Python</span>
                                <span className="tag">UI/UX Design</span>
                                <button style={{
                                    background: 'none',
                                    border: '1px dashed var(--gray-400)',
                                    borderRadius: '9999px',
                                    padding: '0.25rem 0.75rem',
                                    color: 'var(--gray-500)',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem'
                                }}>+ Add Skill</button>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>University / College</label>
                                <input type="text" className="search-input" defaultValue="University of Engineering and Technology" />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Degree / Major</label>
                                <input type="text" className="search-input" defaultValue="BS Computer Science" />
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Links */}
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Portfolio & Links</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '2.5rem', display: 'flex', justifyContent: 'center' }}><Github /></div>
                                <input type="text" className="search-input" placeholder="GitHub Profile URL" defaultValue="https://github.com/shani" />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '2.5rem', display: 'flex', justifyContent: 'center' }}><LinkIcon /></div>
                                <input type="text" className="search-input" placeholder="Personal Website / Portfolio" />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '2.5rem', display: 'flex', justifyContent: 'center' }}><FileText /></div>
                                <div style={{ flex: 1, padding: '0.5rem', border: '1px dashed var(--gray-300)', borderRadius: 'var(--radius-md)', textAlign: 'center', color: 'var(--gray-500)', cursor: 'pointer' }}>
                                    Upload Resume / CV (PDF)
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Sidebar Column (Right) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Profile Completion</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--brand-navy)' }}>85% Complete</span>
                        </div>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: '85%' }}></div>
                        </div>

                        <ul style={{ marginTop: '1.5rem', listStyle: 'none', fontSize: '0.875rem', color: 'var(--gray-600)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={16} color="var(--accent-500)" /> Verify Email
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={16} color="var(--accent-500)" /> Add Profile Picture
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CheckCircle size={16} color="var(--accent-500)" /> Add Education
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
                                <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--gray-300)' }}></div>
                                Link GitHub (Optional)
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentProfile;
