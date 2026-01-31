import React, { useState, useRef } from 'react';
import { Camera, MapPin, Link as LinkIcon, Edit2, CheckCircle, Loader2 } from 'lucide-react';
import { profileService } from '../../services/profileService';

export const ProfileHeader = ({ user, profile, onUpdate, isOwnProfile }) => {
    const [uploading, setUploading] = useState(false);
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
            onUpdate('photo', data.photo);
        } catch (error) {
            console.error('Upload failed', error);
            alert('Failed to upload photo');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="card">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="relative group cursor-pointer" onClick={handlePhotoClick}>
                    <div className={`w-32 h-32 rounded-full flex items-center justify-center overflow-hidden border-4 border-white shadow-lg bg-gray-100 ${uploading ? 'opacity-50' : ''}`}>
                        {profile.photo ? (
                            <img src={profile.photo} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-4xl font-bold text-gray-400">{user.name?.substring(0, 2).toUpperCase()}</span>
                        )}
                    </div>
                    {isOwnProfile && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Camera className="text-white" size={24} />
                        </div>
                    )}
                    {uploading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="animate-spin text-primary" size={32} />
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="image/*" />
                </div>

                <div className="flex-1 w-full">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-bold text-navy-900">{user.name}</h1>
                            <p className="text-lg text-gray-600 mt-1">{profile.title || user.role}</p>
                            <div className="flex items-center gap-2 text-gray-500 mt-2 text-sm">
                                {profile.location && (
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {profile.location}</span>
                                )}
                                {user.isEmailVerified && (
                                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                        <CheckCircle size={12} /> Verified
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-sm font-semibold text-gray-500 mb-1">Profile Completion</div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                                    style={{ width: `${profile.completionPercentage || 0}%` }}
                                ></div>
                            </div>
                            <div className="text-xs text-right mt-1 text-gray-400">{profile.completionPercentage || 0}%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const AboutSection = ({ profile, onUpdate, isOwnProfile }) => {
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
            <div className="card space-y-4">
                <h3 className="card-title">Edit About</h3>
                <div>
                    <label className="form-label">Professional Title</label>
                    <input
                        type="text"
                        className="search-input w-full"
                        value={formData.title}
                        onChange={e => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Senior Full Stack Developer"
                    />
                </div>
                <div>
                    <label className="form-label">Location</label>
                    <input
                        type="text"
                        className="search-input w-full"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. New York, USA"
                    />
                </div>
                <div>
                    <label className="form-label">Bio</label>
                    <textarea
                        className="search-input w-full resize-none"
                        rows="4"
                        value={formData.bio}
                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        maxLength={500}
                    />
                    <div className="text-xs text-right text-gray-400">{formData.bio.length}/500</div>
                </div>
                <div>
                    <label className="form-label">Skills</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.skills.map(skill => (
                            <span key={skill} className="tag flex items-center gap-1">
                                {skill} <button onClick={() => removeSkill(skill)} className="hover:text-red-500">&times;</button>
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="search-input flex-1"
                            value={newSkill}
                            onChange={e => setNewSkill(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addSkill()}
                            placeholder="Add a form skill..."
                        />
                        <button type="button" onClick={addSkill} className="btn btn-secondary">Add</button>
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        );
    }

    return (
        <div className="card relative group">
            {isOwnProfile && (
                <button onClick={() => setIsEditing(true)} className="absolute top-4 right-4 text-gray-400 hover:text-primary-600">
                    <Edit2 size={18} />
                </button>
            )}
            <h3 className="card-title mb-4">About</h3>
            <p className="text-gray-600 whitespace-pre-wrap mb-6">{profile.bio || "No bio added yet."}</p>

            <h4 className="font-semibold text-sm text-gray-700 mb-3">Skills</h4>
            <div className="flex flex-wrap gap-2">
                {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map(skill => (
                        <span key={skill} className="tag">{skill}</span>
                    ))
                ) : (
                    <span className="text-gray-400 text-sm">No skills listed.</span>
                )}
            </div>
        </div>
    );
};
