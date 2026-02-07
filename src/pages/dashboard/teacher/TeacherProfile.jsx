import React, { useState } from 'react';
import { User, Mail, MapPin, Award, BookOpen, CheckCircle, Camera } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import './teacher.css';

const TeacherProfile = () => {
    const { user } = useAuth();

    // Mock Profile State
    const [profile, setProfile] = useState({
        title: 'Senior Computer Science Lecturer',
        bio: 'Passionate educator with 10+ years of experience in teaching algorithms, data structures, and web development. Committed to mentoring the next generation of tech leaders.',
        location: 'Lahore, Pakistan',
        email: user?.email || 'teacher@example.com',
        subjects: ['Computer Science', 'Mathematics', 'Software Engineering'],
        qualifications: ['PhD in CS (UET)', 'MSc Artificial Intelligence'],
        experience: '12 Years'
    });

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Teacher Profile</h1>
                    <p className="page-description">Manage your professional bio, qualifications, and teaching subjects.</p>
                </div>
                <button className="btn btn-primary">Save Changes</button>
            </div>

            <div className="teacher-profile-layout">

                {/* Main Profile Info */}
                <div className="flex-col gap-xl">

                    {/* Identity Card */}
                    <div className="card">
                        <div className="flex-row-gap gap-xl" style={{ alignItems: 'flex-start' }}>
                            <div className="teacher-avatar-container">
                                <div className="teacher-avatar-large">
                                    {user?.name?.substring(0, 2).toUpperCase() || 'TE'}
                                </div>
                                <button className="camera-upload-btn">
                                    <Camera size={16} />
                                </button>
                            </div>

                            <div className="teacher-info-section">
                                <h2 className="teacher-name-h2">{user?.name || 'Professor Name'}</h2>
                                <p className="teacher-title-p">{profile.title}</p>

                                <div className="flex-row-gap gap-lg text-muted">
                                    <span className="flex-row-gap gap-sm">
                                        <MapPin size={16} /> {profile.location}
                                    </span>
                                    <span className="flex-row-gap gap-sm">
                                        <Mail size={16} /> {profile.email}
                                    </span>
                                    <span className="tag tag-verification">
                                        <CheckCircle size={14} style={{ marginRight: '4px' }} /> Verified Educator
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Professional Bio</label>
                            <textarea
                                className="search-input w-full"
                                rows="4"
                                style={{ resize: 'none' }}
                                defaultValue={profile.bio}
                            />
                        </div>
                    </div>

                    {/* Qualifications & Subjects */}
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Expertise & Qualifications</h3>

                        <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Subjects Taught</label>
                                <div className="flex-row-gap gap-sm" style={{ flexWrap: 'wrap' }}>
                                    {profile.subjects.map(sub => (
                                        <span key={sub} className="tag tag-blue">{sub}</span>
                                    ))}
                                    <button className="tag" style={{ border: '1px dashed var(--gray-300)', background: 'none', cursor: 'pointer' }}>+ Add Subject</button>
                                </div>
                            </div>

                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Degrees & Certifications</label>
                                <ul style={{ listStyle: 'none', padding: 0 }} className="flex-col gap-sm">
                                    {profile.qualifications.map((qual, idx) => (
                                        <li key={idx} className="flex-row-gap gap-sm">
                                            <Award size={16} className="text-secondary" /> {qual}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="flex-col gap-lg">
                    <div className="card">
                        <h3 className="card-title">Impact Stats</h3>
                        <div className="impact-stats-grid">
                            <div className="impact-stat-item">
                                <div className="impact-stat-value">150+</div>
                                <div className="impact-stat-label">Students</div>
                            </div>
                            <div className="impact-stat-item">
                                <div className="impact-stat-value">12</div>
                                <div className="impact-stat-label">Courses</div>
                            </div>
                            <div className="impact-stat-item">
                                <div className="impact-stat-value">4.9</div>
                                <div className="impact-stat-label">Rating</div>
                            </div>
                            <div className="impact-stat-item">
                                <div className="impact-stat-value">{profile.experience}</div>
                                <div className="impact-stat-label">Experience</div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="card-title">Verification Status</h3>
                        <ul className="verification-status-list">
                            <li className="verification-status-item">
                                <CheckCircle size={18} className="text-accent" /> University ID Verified
                            </li>
                            <li className="verification-status-item">
                                <CheckCircle size={18} className="text-accent" /> Degree Attested
                            </li>
                            <li className="verification-status-item">
                                <CheckCircle size={18} className="text-accent" /> Email Confirmed
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
