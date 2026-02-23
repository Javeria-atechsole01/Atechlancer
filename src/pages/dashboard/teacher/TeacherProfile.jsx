import React, { useState } from 'react';
import { User, Mail, MapPin, Award, BookOpen, CheckCircle, Camera } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { profileService } from '../../../services/profileService';
import './teacher.css';

const TeacherProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        title: '',
        bio: '',
        location: '',
        subjects: [],
        qualifications: [], // Mapped from education/certifications
        experience: ''
    });

    // Form State
    const [formData, setFormData] = useState({ ...profile });
    const [newItem, setNewItem] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await profileService.getCurrentProfile();
            if (data) {
                // Map backend schema to local state
                const mappedProfile = {
                    title: data.title || '',
                    bio: data.bio || '',
                    location: data.location || '',
                    subjects: data.skills || [],
                    // Qualifications is a mix of education and certifications for display
                    qualifications: [
                        ...(data.education?.map(e => `${e.degree} in ${e.fieldOfStudy}`) || []),
                        ...(data.certifications?.map(c => c.name) || [])
                    ],
                    experience: data.experience?.[0] ? `${data.experience.length} Positions` : '0 Years' // Simplified
                };
                setProfile(mappedProfile);
                setFormData(mappedProfile);
            }
        } catch (error) {
            console.error("Failed to load profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            // We need to map back to the schema structure
            // For simplicity in this specific UI, we update generic fields
            // Real implementation would need complex forms for Education arrays
            const updateData = {
                title: formData.title,
                bio: formData.bio,
                location: formData.location,
                skills: formData.subjects
            };

            await profileService.updateProfile(updateData);
            setProfile(formData);
            setIsEditing(false);
            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Failed to update", error);
            alert("Failed to save changes.");
        }
    };

    const addSubject = () => {
        if (newItem && !formData.subjects.includes(newItem)) {
            setFormData(prev => ({ ...prev, subjects: [...prev.subjects, newItem] }));
            setNewItem('');
        }
    };

    const removeSubject = (subject) => {
        setFormData(prev => ({ ...prev, subjects: prev.subjects.filter(s => s !== subject) }));
    };

    if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading Profile...</div>;

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Teacher Profile</h1>
                    <p className="page-description">Manage your professional bio, qualifications, and teaching subjects.</p>
                </div>
                {isEditing ? (
                    <div className="flex-row-gap gap-sm">
                        <button className="btn btn-ghost" onClick={() => { setIsEditing(false); setFormData(profile); }}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                    </div>
                ) : (
                    <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                )}
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
                                {/* <button className="camera-upload-btn">
                                    <Camera size={16} />
                                </button> */}
                            </div>

                            <div className="teacher-info-section" style={{ flex: 1 }}>
                                <h2 className="teacher-name-h2">{user?.name || 'Professor Name'}</h2>

                                {isEditing ? (
                                    <input
                                        className="search-input w-full mb-sm"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Professional Title"
                                    />
                                ) : (
                                    <p className="teacher-title-p">{profile.title || 'No Title Set'}</p>
                                )}

                                <div className="flex-row-gap gap-lg text-muted">
                                    <span className="flex-row-gap gap-sm">
                                        <MapPin size={16} />
                                        {isEditing ? (
                                            <input
                                                className="search-input"
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="City, Country"
                                                style={{ padding: '4px 8px' }}
                                            />
                                        ) : (
                                            profile.location || 'Location not set'
                                        )}
                                    </span>
                                    <span className="flex-row-gap gap-sm">
                                        <Mail size={16} /> {user?.email}
                                    </span>
                                    <span className="tag tag-verification">
                                        <CheckCircle size={14} style={{ marginRight: '4px' }} /> Verified Educator
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '2rem' }}>
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Professional Bio</label>
                            {isEditing ? (
                                <textarea
                                    className="search-input w-full"
                                    rows="4"
                                    style={{ resize: 'none' }}
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Write about your teaching experience..."
                                />
                            ) : (
                                <p className="prose-text">{profile.bio || 'No bio provided yet.'}</p>
                            )}
                        </div>
                    </div>

                    {/* Qualifications & Subjects */}
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1.5rem' }}>Expertise & Qualifications</h3>

                        <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Subjects Taught</label>
                                <div className="flex-row-gap gap-sm" style={{ flexWrap: 'wrap' }}>
                                    {(isEditing ? formData.subjects : profile.subjects).map(sub => (
                                        <span key={sub} className="tag tag-blue">
                                            {sub}
                                            {isEditing && <button onClick={() => removeSubject(sub)} style={{ marginLeft: 6, border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit' }}>&times;</button>}
                                        </span>
                                    ))}

                                    {isEditing && (
                                        <div className="flex-row-gap gap-sm">
                                            <input
                                                className="search-input"
                                                style={{ width: '120px', padding: '4px 8px' }}
                                                placeholder="New Subject"
                                                value={newItem}
                                                onChange={e => setNewItem(e.target.value)}
                                                onKeyDown={e => e.key === 'Enter' && addSubject()}
                                            />
                                            <button className="btn btn-sm btn-secondary" onClick={addSubject}>Add</button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="form-label" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600 }}>Degrees & Certifications</label>
                                {profile.qualifications.length > 0 ? (
                                    <ul style={{ listStyle: 'none', padding: 0 }} className="flex-col gap-sm">
                                        {profile.qualifications.map((qual, idx) => (
                                            <li key={idx} className="flex-row-gap gap-sm">
                                                <Award size={16} className="text-secondary" /> {qual}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted text-sm">No qualifications listed yet.</p>
                                )}
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
                                <div className="impact-stat-value">0</div>
                                <div className="impact-stat-label">Students</div>
                            </div>
                            <div className="impact-stat-item">
                                <div className="impact-stat-value">0</div>
                                <div className="impact-stat-label">Courses</div>
                            </div>
                            <div className="impact-stat-item">
                                <div className="impact-stat-value">5.0</div>
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
                                <CheckCircle size={18} className="text-accent" /> Email Confirmed
                            </li>
                            <li className="verification-status-item" style={{ opacity: 0.5 }}>
                                <CheckCircle size={18} /> University ID Verified
                            </li>
                            <li className="verification-status-item" style={{ opacity: 0.5 }}>
                                <CheckCircle size={18} /> Degree Attested
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
