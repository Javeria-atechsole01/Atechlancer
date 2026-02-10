import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import './profile-components.css';

export const EducationSection = ({ education = [], onUpdate, isOwnProfile }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: ''
    });

    const safeEducation = education || [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEdu = [...safeEducation, formData];
        await onUpdate({ education: newEdu });
        setIsAdding(false);
        setFormData({ institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: '' });
    };

    const handleDelete = async (index) => {
        if (window.confirm('Are you sure you want to delete this education entry?')) {
            const newEdu = safeEducation.filter((_, i) => i !== index);
            await onUpdate({ education: newEdu });
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-section-header">
                <h3 className="profile-section-title">Education</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-secondary btn-sm flex-row-gap gap-sm">
                        <Plus size={14} /> Add Education
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="banner banner-gray mb-lg">
                    {/* ... form fields same as before ... */}
                    <div className="profile-form-grid">
                        <div className="profile-form-full">
                            <label className="profile-label">Institution</label>
                            <input required className="search-input w-full" value={formData.institution} onChange={e => setFormData({ ...formData, institution: e.target.value })} placeholder="e.g. Harvard University" />
                        </div>
                        <div>
                            <label className="profile-label">Degree</label>
                            <input required className="search-input w-full" value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} placeholder="e.g. Bachelor's" />
                        </div>
                        <div>
                            <label className="profile-label">Field of Study</label>
                            <input required className="search-input w-full" value={formData.fieldOfStudy} onChange={e => setFormData({ ...formData, fieldOfStudy: e.target.value })} placeholder="e.g. Computer Science" />
                        </div>
                        <div>
                            <label className="profile-label">Start Year</label>
                            <input required className="search-input w-full" value={formData.startYear} onChange={e => setFormData({ ...formData, startYear: e.target.value })} placeholder="YYYY" />
                        </div>
                        <div>
                            <label className="profile-label">End Year</label>
                            <input required className="search-input w-full" value={formData.endYear} onChange={e => setFormData({ ...formData, endYear: e.target.value })} placeholder="YYYY or Present" />
                        </div>
                    </div>

                    <div className="flex-row-gap gap-sm mt-lg" style={{ justifyContent: 'flex-end' }}>
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost btn-sm">Cancel</button>
                        <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    </div>
                </form>
            )}

            <div className="profile-list-stack">
                {safeEducation.map((edu, index) => (
                    <div key={index} className="profile-item-row group">
                        <div className="profile-item-icon"><GraduationCap size={24} /></div>
                        <div className="profile-item-body">
                            <h4 className="profile-item-title-h4">{edu.institution}</h4>
                            <p className="profile-item-subtitle">{edu.degree}, {edu.fieldOfStudy}</p>
                            <p className="profile-item-meta">
                                <Calendar size={12} /> {edu.startYear} - {edu.endYear}
                            </p>
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} className="btn-icon btn-ghost btn-sm hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {safeEducation.length === 0 && !isAdding && <p className="text-muted text-sm italic">No education history added.</p>}
            </div>
        </div>
    );
};

export const ExperienceSection = ({ experience = [], onUpdate, isOwnProfile }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        title: '', company: '', startYear: '', endYear: '', description: ''
    });

    const safeExperience = experience || [];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExp = [...safeExperience, formData];
        await onUpdate({ experience: newExp });
        setIsAdding(false);
        setFormData({ title: '', company: '', startYear: '', endYear: '', description: '' });
    };

    const handleDelete = async (index) => {
        if (window.confirm('Are you sure you want to delete this experience entry?')) {
            const newExp = safeExperience.filter((_, i) => i !== index);
            await onUpdate({ experience: newExp });
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-section-header">
                <h3 className="profile-section-title">Experience</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-secondary btn-sm flex-row-gap gap-sm">
                        <Plus size={14} /> Add Experience
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="banner banner-gray mb-lg">
                    <div className="profile-form-grid">
                        <div className="profile-form-full">
                            <label className="profile-label">Job Title</label>
                            <input required className="search-input w-full" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Senior Frontend Developer" />
                        </div>
                        <div className="profile-form-full">
                            <label className="profile-label">Company / Organization</label>
                            <input required className="search-input w-full" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. TechCorp Inc." />
                        </div>
                        <div>
                            <label className="profile-label">Start Year</label>
                            <input required className="search-input w-full" value={formData.startYear} onChange={e => setFormData({ ...formData, startYear: e.target.value })} placeholder="YYYY" />
                        </div>
                        <div>
                            <label className="profile-label">End Year</label>
                            <input required className="search-input w-full" value={formData.endYear} onChange={e => setFormData({ ...formData, endYear: e.target.value })} placeholder="YYYY or Present" />
                        </div>
                        <div className="profile-form-full">
                            <label className="profile-label">Job Description</label>
                            <textarea className="search-input w-full textarea-experience-height" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your responsibilities..." />
                        </div>
                    </div>

                    <div className="actions-right">
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost btn-sm">Cancel</button>
                        <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    </div>
                </form>
            )}

            <div className="profile-list-stack">
                {safeExperience.map((exp, index) => (
                    <div key={index} className="profile-item-row group">
                        <div className="profile-item-icon"><Briefcase size={24} /></div>
                        <div className="profile-item-body">
                            <h4 className="profile-item-title-h4">{exp.title}</h4>
                            <p className="profile-item-subtitle">{exp.company}</p>
                            <p className="profile-item-meta">
                                <Calendar size={12} /> {exp.startYear} - {exp.endYear}
                            </p>
                            {exp.description && <p className="profile-item-desc">{exp.description}</p>}
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} className="btn-icon btn-ghost btn-sm hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {safeExperience.length === 0 && !isAdding && <p className="text-muted text-sm italic">No experience added yet.</p>}
            </div>
        </div>
    );
};

