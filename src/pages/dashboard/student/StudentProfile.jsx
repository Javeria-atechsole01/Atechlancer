import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Link as LinkIcon, Github, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { profileService } from '../../../services/profileService';

const StudentProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Profile State
    const [profile, setProfile] = useState({
        bio: '',
        skills: [],
        education: '',
        degree: '',
        githubUrl: '',
        websiteUrl: '',
        location: 'Lahore, Pakistan' // Default or fetch from profile if added to model
    });

    const [newSkill, setNewSkill] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await profileService.getCurrentProfile();
            if (data) {
                setProfile(prev => ({
                    ...prev,
                    bio: data.bio || '',
                    skills: data.skills || [],
                    education: data.education || '',
                    // Mapping other fields if they exist in backend model or reusing existing ones
                    // Note: Backend Profile model has 'education' and 'experience' strings.
                    // We might need to adjust the backend model or map these fields accordingly.
                    // For now, assuming direct mapping where possible.
                }));
            }
        } catch (error) {
            console.error("Failed to load profile", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleAddSkill = () => {
        if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
            setProfile(prev => ({
                ...prev,
                skills: [...prev.skills, newSkill.trim()]
            }));
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setProfile(prev => ({
            ...prev,
            skills: prev.skills.filter(s => s !== skillToRemove)
        }));
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setMessage({ type: '', text: '' });

            // Prepare data for backend
            // The backend expects: bio, skills, education, experience, etc.
            const payload = {
                bio: profile.bio,
                skills: profile.skills,
                education: profile.education,
                // Add other fields as per backend model
            };

            await profileService.updateProfile(payload);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });

            // Hide message after 3 seconds
            setTimeout(() => setMessage({ type: '', text: '' }), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to update profile.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full p-20">
                <Loader2 className="animate-spin text-primary" size={40} />
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Profile & Skills</h1>
                    <p className="page-description">Manage your public profile and verification.</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    {saving && <Loader2 className="animate-spin" size={16} />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {message.text && (
                <div style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    marginBottom: '1rem',
                    backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
                    color: message.type === 'success' ? '#065f46' : '#991b1b',
                    border: `1px solid ${message.type === 'success' ? '#34d399' : '#f87171'}`
                }}>
                    {message.text}
                </div>
            )}

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
                                    fontWeight: 'bold',
                                    textTransform: 'uppercase'
                                }}>
                                    {user?.name?.substring(0, 2) || 'US'}
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
                                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>{user?.name}</h2>
                                        <p style={{ color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                                            <MapPin size={16} /> {profile.location}
                                        </p>
                                    </div>
                                    <span className="tag tag-verification"><CheckCircle size={14} style={{ marginRight: '4px' }} /> Verified {user?.role}</span>
                                </div>

                                <div style={{ marginTop: '1.5rem' }}>
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Bio</label>
                                    <textarea
                                        name="bio"
                                        className="search-input"
                                        rows="3"
                                        placeholder="Tell us about yourself..."
                                        value={profile.bio}
                                        onChange={handleChange}
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
                                {profile.skills.map(skill => (
                                    <span key={skill} className="tag" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        {skill}
                                        <button onClick={() => removeSkill(skill)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}>&times;</button>
                                    </span>
                                ))}
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        value={newSkill}
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Add skill..."
                                        style={{ padding: '0.25rem 0.5rem', borderRadius: '1rem', border: '1px solid #ccc', fontSize: '0.875rem' }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddSkill()}
                                    />
                                    <button onClick={handleAddSkill} style={{
                                        background: 'var(--primary-100)',
                                        border: 'none',
                                        borderRadius: '50%',
                                        width: '24px',
                                        height: '24px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: 'var(--primary-700)'
                                    }}>+</button>
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Education / Degree</label>
                                <input
                                    type="text"
                                    name="education"
                                    className="search-input"
                                    value={profile.education}
                                    onChange={handleChange}
                                    placeholder="e.g. BS Computer Science, UET"
                                />
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
                        </div>
                    </div>

                </div>

                {/* Sidebar Column (Right) - Simplified for now */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Profile Completion</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--brand-navy)' }}>
                                {profile.bio && profile.skills.length > 0 ? '100%' : '50%'} Complete
                            </span>
                        </div>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: profile.bio && profile.skills.length > 0 ? '100%' : '50%' }}></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default StudentProfile;
