import React, { useState } from 'react';
import { User, Mail, MapPin, Award, BookOpen, CheckCircle, Camera } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const TeacherProfile = () => {
    const { user } = useAuth();

    // Mock Profile State (Would connect to profileService)
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>

                {/* Main Profile Info */}
                <div className="flex-col gap-xl">

                    {/* Identity Card */}
                    <div className="card">
                        <div className="flex-row-gap gap-lg" style={{ alignItems: 'flex-start' }}>
                            <div style={{ position: 'relative' }}>
                                <div style={{
                                    width: '120px', height: '120px', borderRadius: '50%',
                                    backgroundColor: 'var(--primary-100)', display: 'flex',
                                    alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-700)'
                                }}>
                                    {user?.name?.substring(0, 2).toUpperCase() || 'TE'}
                                </div>
                                <button style={{
                                    position: 'absolute', bottom: 0, right: 0,
                                    background: 'white', border: '1px solid #ccc',
                                    borderRadius: '50%', padding: '0.4rem', cursor: 'pointer'
                                }}>
                                    <Camera size={16} />
                                </button>
                            </div>

                            <div style={{ flex: 1 }}>
                                <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold' }}>{user?.name || 'Professor Name'}</h2>
                                <p className="text-primary mb-md" style={{ fontWeight: '500', fontSize: '1.1rem' }}>{profile.title}</p>

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
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Professional Bio</label>
                            <textarea
                                className="search-input"
                                rows="4"
                                style={{ width: '100%', resize: 'none' }}
                                defaultValue={profile.bio}
                            />
                        </div>
                    </div>

                    {/* Qualifications & Subjects */}
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Expertise & Qualifications</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subjects Taught</label>
                                <div className="flex-row-gap gap-sm" style={{ flexWrap: 'wrap' }}>
                                    {profile.subjects.map(sub => (
                                        <span key={sub} className="tag tag-blue">{sub}</span>
                                    ))}
                                    <button className="tag" style={{ border: '1px dashed #ccc', background: 'none', cursor: 'pointer' }}>+ Add Subject</button>
                                </div>
                            </div>

                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Degrees & Certifications</label>
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
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>150+</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Students Mentored</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>12</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Courses Published</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>4.9</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Rating</div>
                            </div>
                            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--gray-50)', borderRadius: '8px' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>{profile.experience}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>Experience</div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="card-title">Verification Status</h3>
                        <ul className="flex-col gap-md" style={{ listStyle: 'none', padding: 0, marginTop: '1rem' }}>
                            <li className="flex-row-gap gap-md">
                                <CheckCircle size={18} className="text-accent" /> University ID Verified
                            </li>
                            <li className="flex-row-gap gap-md">
                                <CheckCircle size={18} className="text-accent" /> Degree Attested
                            </li>
                            <li className="flex-row-gap gap-md">
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
