import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Link as LinkIcon, Github, FileText, CheckCircle, Star, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { profileService } from '../../../services/profileService';

const FreelancerProfile = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Profile State
    const [profile, setProfile] = useState({
        title: '',
        bio: '',
        location: '',
        hourlyRate: 0,
        skills: [],
        projects: [] // Portfolio items
    });

    // Form State (for main profile)
    const [formData, setFormData] = useState({ ...profile });
    const [newSkill, setNewSkill] = useState('');

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setLoading(true);
            const data = await profileService.getCurrentProfile();
            if (data) {
                const mappedProfile = {
                    title: data.title || '',
                    bio: data.bio || '',
                    location: data.location || '',
                    hourlyRate: data.hourlyRate || 0,
                    skills: data.skills || [],
                    projects: data.projects || []
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

    const handleViewPublic = () => {
        navigate('/profile/freelancer/view');
    };

    const handleSaveProfile = async () => {
        try {
            const updateData = {
                title: formData.title,
                bio: formData.bio,
                location: formData.location,
                hourlyRate: formData.hourlyRate,
                skills: formData.skills
            };
            await profileService.updateProfile(updateData);
            setProfile({ ...profile, ...updateData });
            setIsEditing(false);
            alert("Profile updated!");
        } catch (error) {
            console.error("Failed to update", error);
            alert("Failed to save changes");
        }
    };

    const handleAddProject = async (newItem) => {
        try {
            // Append new project to existing projects and update
            const updatedProjects = [...profile.projects, newItem];
            await profileService.updateProfile({ projects: updatedProjects });

            setProfile(prev => ({ ...prev, projects: updatedProjects }));
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to add project", error);
            alert("Failed to add project");
        }
    };

    const removeSkill = (skill) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    };

    const addSkill = () => {
        if (newSkill && !formData.skills.includes(newSkill)) {
            setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
            setNewSkill('');
        }
    };

    if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading Profile...</div>;

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Freelancer Profile</h1>
                    <p className="page-description">Manage your brand and portfolio.</p>
                </div>
                <div className="flex-row-gap gap-sm">
                    {isEditing ? (
                        <>
                            <button className="btn btn-ghost" onClick={() => { setIsEditing(false); setFormData(profile); }}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleSaveProfile}>Save All Changes</button>
                        </>
                    ) : (
                        <button className="btn btn-secondary" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                    <button
                        className="btn btn-outline"
                        style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                        onClick={handleViewPublic}
                    >
                        View Public Profile
                    </button>
                </div>
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
                                {user?.name?.substring(0, 2).toUpperCase() || 'FL'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>
                                        {user?.name || 'Freelancer Name'}
                                    </h2>
                                    <span className="tag tag-verification"><CheckCircle size={14} style={{ marginRight: '4px' }} /> Verified</span>
                                </div>

                                {isEditing ? (
                                    <input
                                        className="search-input w-full mt-sm"
                                        value={formData.title}
                                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                                        placeholder="Professional Title (e.g. Full Stack Developer)"
                                    />
                                ) : (
                                    <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>
                                        {profile.title || 'No Title Set'}
                                    </p>
                                )}

                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                        <MapPin size={14} />
                                        {isEditing ? (
                                            <input
                                                className="search-input"
                                                style={{ padding: '2px 8px' }}
                                                value={formData.location}
                                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                                placeholder="Location"
                                            />
                                        ) : (
                                            profile.location || 'Location not set'
                                        )}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={14} fill="#eab308" color="#eab308" /> 5.0 (0 Reviews)</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--gray-200)', paddingTop: '1rem' }}>
                            <label className="form-label">Bio / About Me</label>
                            {isEditing ? (
                                <textarea
                                    className="search-input w-full"
                                    rows="3"
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    placeholder="Tell clients about yourself..."
                                />
                            ) : (
                                <p className="text-muted">{profile.bio || 'No bio provided yet.'}</p>
                            )}
                        </div>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="card-title" style={{ margin: 0 }}>Portfolio</h3>
                            <button
                                className="btn btn-secondary"
                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Plus size={16} /> Add Item
                            </button>
                        </div>

                        {profile.projects.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                                {profile.projects.map((item, idx) => (
                                    <div key={idx} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                                        <div style={{ height: '140px', backgroundColor: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <div style={{ color: 'var(--gray-400)' }}>
                                                <FileText size={32} />
                                            </div>
                                        </div>
                                        <div style={{ padding: '0.75rem' }}>
                                            <p style={{ fontWeight: '600', fontSize: '0.9375rem', color: 'var(--brand-navy)' }}>{item.title}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                                                {item.technologies && item.technologies.join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center p-xl text-muted bg-gray-50 rounded-md">
                                No portfolio items yet. Click "Add Item" to showcase your work.
                            </div>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Hourly Rate</h3>
                        {isEditing ? (
                            <div className="flex-row-gap gap-sm">
                                <span style={{ fontWeight: 'bold' }}>$</span>
                                <input
                                    type="number"
                                    className="search-input"
                                    style={{ width: '100px' }}
                                    value={formData.hourlyRate}
                                    onChange={e => setFormData({ ...formData, hourlyRate: e.target.value })}
                                />
                                <span className="text-muted">/ hr</span>
                            </div>
                        ) : (
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>
                                ${profile.hourlyRate} <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--gray-500)' }}>/ hr</span>
                            </div>
                        )}
                    </div>

                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {(isEditing ? formData.skills : profile.skills).map(skill => (
                                <span key={skill} className="tag">
                                    {skill}
                                    {isEditing && <button onClick={() => removeSkill(skill)} style={{ marginLeft: 6, border: 'none', background: 'transparent', cursor: 'pointer', color: 'inherit' }}>&times;</button>}
                                </span>
                            ))}
                        </div>
                        {isEditing && (
                            <div className="flex-row-gap gap-sm mt-md">
                                <input
                                    className="search-input full-width"
                                    placeholder="Add Skill"
                                    value={newSkill}
                                    onChange={e => setNewSkill(e.target.value)}
                                    style={{ padding: '6px' }}
                                    onKeyDown={e => e.key === 'Enter' && addSkill()}
                                />
                                <button className="btn btn-sm btn-secondary" onClick={addSkill}>Add</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Add Item Modal */}
            {isModalOpen && (
                <AddItemModal
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddProject}
                />
            )}
        </div>
    );
};

const AddItemModal = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) return;

        onAdd({
            title,
            description,
            technologies: tech.split(',').map(t => t.trim()).filter(Boolean),
            imageUrl: '', // Can be added later
            projectUrl: '',
            repoUrl: ''
        });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="card-title">Add Portfolio Item</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-col gap-md">
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Project Title</label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="e.g. Finance Dashboard"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Tech Stack (comma separated)</label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="e.g. React, Python"
                            value={tech}
                            onChange={e => setTech(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                        <textarea
                            className="search-input"
                            rows="3"
                            placeholder="Brief details about the project..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FreelancerProfile;
