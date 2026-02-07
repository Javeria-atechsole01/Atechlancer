import React, { useState, useRef } from 'react';
import { Camera, MapPin, Edit2, Loader2 } from 'lucide-react';
import { profileService } from '../../services/profileService';
import './profile-components.css';

export const ProfileHeader = ({ user, profile, onUpdate, isOwnProfile }) => {
    const [uploading, setUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [headerData, setHeaderData] = useState({
        title: profile?.title || '',
        location: profile?.location || ''
    });
    const fileInputRef = useRef(null);

    const handlePhotoClick = () => {
        if (isOwnProfile) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        try {
            setUploading(true);
            const formData = new FormData();
            formData.append('photo', file);
            const data = await profileService.uploadPhoto(formData);
            onUpdate({ photo: data.photo });
        } catch (error) {
            console.error('Upload failed', error);
            alert('Failed to upload photo');
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        await onUpdate({
            title: headerData.title,
            location: headerData.location
        });
        setIsEditing(false);
    };

    return (
        <div className="profile-card profile-header-card">
            {/* Avatar Section */}
            <div
                onClick={handlePhotoClick}
                className={`profile-avatar-wrapper ${isOwnProfile ? 'editable' : ''}`}
            >
                {profile.photo ? (
                    <img src={profile.photo} alt={user.name} className="profile-avatar-img" />
                ) : (
                    <div className="profile-avatar-placeholder">
                        {user.name?.substring(0, 2).toUpperCase()}
                    </div>
                )}

                {uploading && (
                    <div className="avatar-upload-overlay">
                        <Loader2 className="animate-spin text-white" size={24} />
                    </div>
                )}

                <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
            </div>

            {/* User Info Section */}
            <div className="profile-info-content">
                <div className="flex-row-between" style={{ alignItems: 'flex-start' }}>
                    <div className="flex-1 mr-md">
                        <h2 className="profile-name-h2">{user.name}</h2>

                        {isEditing ? (
                            <div className="flex-col gap-sm mt-sm" style={{ maxWidth: '300px' }}>
                                <input
                                    className="search-input w-full text-sm"
                                    placeholder="Headline / Title"
                                    value={headerData.title}
                                    onChange={e => setHeaderData({ ...headerData, title: e.target.value })}
                                />
                                <input
                                    className="search-input w-full text-sm"
                                    placeholder="Location"
                                    value={headerData.location}
                                    onChange={e => setHeaderData({ ...headerData, location: e.target.value })}
                                />
                                <div className="flex-row-gap gap-sm mt-sm">
                                    <button onClick={handleSave} className="btn btn-primary btn-sm">Save</button>
                                    <button onClick={() => setIsEditing(false)} className="btn btn-secondary btn-sm">Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p className="profile-title-p">{profile.title || user.role}</p>
                                {profile.location && (
                                    <p className="profile-meta-item">
                                        <MapPin size={14} /> {profile.location}
                                    </p>
                                )}
                            </>
                        )}
                    </div>

                    {isOwnProfile && !isEditing && (
                        <button
                            onClick={() => {
                                setHeaderData({ title: profile.title || '', location: profile.location || '' });
                                setIsEditing(true);
                            }}
                            className="btn btn-secondary btn-sm flex-row-gap gap-sm"
                        >
                            Edit <Edit2 size={14} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const AboutSection = ({ user, profile, onUpdate, isOwnProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        bio: profile.bio || '',
        title: profile.title || '',
        location: profile.location || '',
        skills: profile.skills || []
    });
    const [newSkill, setNewSkill] = useState('');

    const handleSave = async () => {
        await onUpdate({
            bio: formData.bio,
            title: formData.title,
            location: formData.location,
            skills: formData.skills
        });
        setIsEditing(false);
    };

    const addSkill = () => {
        if (newSkill && !formData.skills.includes(newSkill)) {
            setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
            setNewSkill('');
        }
    };

    const removeSkill = (skill) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    };

    if (isEditing) {
        return (
            <div className="profile-card">
                <div className="profile-section-header">
                    <h3 className="profile-section-title">Personal Information</h3>
                </div>

                <div className="profile-form-grid">
                    <div>
                        <label className="profile-label">Professional Title</label>
                        <input
                            className="search-input w-full"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Senior Full Stack Developer"
                        />
                    </div>
                    <div>
                        <label className="profile-label">Location</label>
                        <input
                            className="search-input w-full"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. New York, USA"
                        />
                    </div>
                    <div className="profile-form-full">
                        <label className="profile-label">Bio</label>
                        <textarea
                            className="search-input w-full"
                            style={{ minHeight: '120px', resize: 'vertical' }}
                            rows="4"
                            value={formData.bio}
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            maxLength={500}
                        />
                    </div>
                    <div className="profile-form-full">
                        <label className="profile-label">Skills</label>
                        <div className="skills-wrap mb-sm">
                            {formData.skills.map(skill => (
                                <span key={skill} className="skill-tag">
                                    {skill}
                                    <button onClick={() => removeSkill(skill)} className="skill-tag-remove">&times;</button>
                                </span>
                            ))}
                        </div>
                        <div className="flex-row-gap gap-sm">
                            <input
                                className="search-input flex-1"
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addSkill()}
                                placeholder="Add a skill..."
                            />
                            <button type="button" onClick={addSkill} className="btn btn-secondary">Add</button>
                        </div>
                    </div>
                </div>

                <div className="profile-actions-row">
                    <button onClick={() => setIsEditing(false)} className="btn btn-ghost">Cancel</button>
                    <button onClick={handleSave} className="btn btn-primary">Save Changes</button>
                </div>
            </div>
        );
    }

    // View Mode
    return (
        <div className="profile-card">
            <div className="profile-section-header">
                <h3 className="profile-section-title">Personal Information</h3>
                {isOwnProfile && (
                    <button onClick={() => setIsEditing(true)} className="btn btn-secondary btn-sm flex-row-gap gap-sm">
                        Edit <Edit2 size={14} />
                    </button>
                )}
            </div>

            <div className="profile-form-grid">
                <div>
                    <span className="profile-label">Full Name</span>
                    <span className="profile-value-display">{user?.name || 'User'}</span>
                </div>

                <div>
                    <span className="profile-label">Position</span>
                    <span className="profile-value-display">{profile.title || 'Not Set'}</span>
                </div>

                <div>
                    <span className="profile-label">Location</span>
                    <span className="profile-value-display">{profile.location || 'Not Set'}</span>
                </div>

                <div>
                    <span className="profile-label">Email Address</span>
                    <span className="profile-value-display">{user.email || 'hidden'}</span>
                </div>

                <div className="profile-form-full">
                    <span className="profile-label">Bio</span>
                    <p className="profile-bio-text">
                        {profile.bio || 'No bio provided.'}
                    </p>
                </div>

                <div className="profile-form-full">
                    <span className="profile-label">Skills</span>
                    <div className="skills-wrap">
                        {profile.skills && profile.skills.length > 0 ? (
                            profile.skills.map(skill => (
                                <span key={skill} className="skill-tag">{skill}</span>
                            ))
                        ) : (
                            <span className="text-muted text-sm italic">No skills listed.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
