import React, { useState, useRef } from 'react';
import { Camera, MapPin, Link as LinkIcon, Edit2, CheckCircle, Loader2 } from 'lucide-react';
import { profileService } from '../../services/profileService';

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

    // Maxi-D Card Style
    const cardStyle = {
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    };

    const inputStyle = {
        width: '100%',
        padding: '6px 10px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '14px',
        marginBottom: '8px',
        outline: 'none'
    };

    return (
        <div style={cardStyle}>
            {/* Avatar Section */}
            <div
                onClick={handlePhotoClick}
                style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    backgroundColor: '#f3f4f6',
                    flexShrink: 0,
                    cursor: isOwnProfile ? 'pointer' : 'default',
                    border: '1px solid #e5e7eb'
                }}
            >
                {profile.photo ? (
                    <img src={profile.photo} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', color: '#9ca3af' }}>
                        {user.name?.substring(0, 2).toUpperCase()}
                    </div>
                )}

                {uploading && (
                    <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Loader2 className="animate-spin" color="white" size={24} />
                    </div>
                )}

                <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
            </div>

            {/* User Info Section */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, marginRight: '16px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' }}>{user.name}</h2>

                        {isEditing ? (
                            <div style={{ marginTop: '8px', maxWidth: '300px' }}>
                                <input
                                    style={inputStyle}
                                    placeholder="Headline / Title"
                                    value={headerData.title}
                                    onChange={e => setHeaderData({ ...headerData, title: e.target.value })}
                                />
                                <input
                                    style={inputStyle}
                                    placeholder="Location"
                                    value={headerData.location}
                                    onChange={e => setHeaderData({ ...headerData, location: e.target.value })}
                                />
                                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                    <button
                                        onClick={handleSave}
                                        style={{ padding: '4px 12px', backgroundColor: '#111827', color: 'white', borderRadius: '4px', fontSize: '13px', border: 'none', cursor: 'pointer' }}
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        style={{ padding: '4px 12px', backgroundColor: '#f3f4f6', color: '#374151', borderRadius: '4px', fontSize: '13px', border: '1px solid #e5e7eb', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <p style={{ fontSize: '15px', color: '#4b5563', margin: 0 }}>{profile.title || user.role}</p>
                                {profile.location && (
                                    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
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
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '6px 12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '6px',
                                backgroundColor: '#fff',
                                color: '#374151',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer'
                            }}
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

    const cardStyle = {
        backgroundColor: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        borderBottom: '1px solid #f3f4f6',
        paddingBottom: '16px'
    };

    const titleStyle = {
        fontSize: '18px',
        fontWeight: '600',
        color: '#111827',
        margin: 0
    };

    const editBtnStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        backgroundColor: '#fff',
        color: '#374151',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '14px',
        color: '#6b7280',
        marginBottom: '4px'
    };

    const valueStyle = {
        display: 'block',
        fontSize: '16px',
        color: '#111827',
        fontWeight: '500'
    };

    if (isEditing) {
        return (
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h3 style={titleStyle}>Personal Information</h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                    <div>
                        <label style={labelStyle}>Professional Title</label>
                        <input
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '15px', outline: 'none' }}
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="e.g. Senior Full Stack Developer"
                        />
                    </div>
                    <div>
                        <label style={labelStyle}>Location</label>
                        <input
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '15px', outline: 'none' }}
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                            placeholder="e.g. New York, USA"
                        />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>Bio</label>
                        <textarea
                            style={{ width: '100%', padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '15px', outline: 'none', resize: 'vertical' }}
                            rows="4"
                            value={formData.bio}
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                            maxLength={500}
                        />
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                        <label style={labelStyle}>Skills</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                            {formData.skills.map(skill => (
                                <span key={skill} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', backgroundColor: '#f3f4f6', borderRadius: '4px', fontSize: '14px', color: '#1f2937' }}>
                                    {skill}
                                    <button onClick={() => removeSkill(skill)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6b7280' }}>&times;</button>
                                </span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <input
                                style={{ flex: 1, padding: '8px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '15px', outline: 'none' }}
                                value={newSkill}
                                onChange={e => setNewSkill(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && addSkill()}
                                placeholder="Add a skill..."
                            />
                            <button type="button" onClick={addSkill} style={{ padding: '8px 16px', backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontWeight: '500' }}>Add</button>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                    <button onClick={() => setIsEditing(false)} style={{ ...editBtnStyle, border: 'none' }}>Cancel</button>
                    <button onClick={handleSave} style={{ ...editBtnStyle, backgroundColor: '#111827', color: '#fff', border: '1px solid #111827' }}>Save Changes</button>
                </div>
            </div>
        );
    }

    // View Mode
    return (
        <div style={cardStyle}>
            <div style={headerStyle}>
                <h3 style={titleStyle}>Personal Information</h3>
                {isOwnProfile && (
                    <button onClick={() => setIsEditing(true)} style={editBtnStyle}>
                        Edit <Edit2 size={14} />
                    </button>
                )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div>
                    <span style={labelStyle}>Full Name</span>
                    <span style={valueStyle}>{user?.name || 'User'}</span>
                </div>

                <div>
                    <span style={labelStyle}>Position</span>
                    <span style={valueStyle}>{profile.title || 'Not Set'}</span>
                </div>

                <div>
                    <span style={labelStyle}>Location</span>
                    <span style={valueStyle}>{profile.location || 'Not Set'}</span>
                </div>

                <div>
                    <span style={labelStyle}>Email Address</span>
                    <span style={valueStyle}>{user.email || 'hidden'}</span>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <span style={labelStyle}>Bio</span>
                    <p style={{ marginTop: '4px', fontSize: '15px', color: '#374151', lineHeight: '1.6' }}>
                        {profile.bio || 'No bio provided.'}
                    </p>
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                    <span style={labelStyle}>Skills</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '6px' }}>
                        {profile.skills && profile.skills.length > 0 ? (
                            profile.skills.map(skill => (
                                <span key={skill} style={{ padding: '4px 10px', backgroundColor: '#f3f4f6', borderRadius: '6px', fontSize: '13px', fontWeight: '500', color: '#374151' }}>{skill}</span>
                            ))
                        ) : (
                            <span style={{ color: '#9ca3af', fontSize: '14px' }}>No skills listed.</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
