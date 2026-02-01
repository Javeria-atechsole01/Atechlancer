import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Briefcase, GraduationCap, Edit2 } from 'lucide-react';

export const EducationSection = ({ education = [], onUpdate, isOwnProfile }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newEdu = [...education, formData];
        await onUpdate({ education: newEdu });
        setIsAdding(false);
        setFormData({ institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', description: '' });
    };

    const handleDelete = async (index) => {
        if (window.confirm('Are you sure?')) {
            const newEdu = education.filter((_, i) => i !== index);
            await onUpdate({ education: newEdu });
        }
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

    const btnStyle = {
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

    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '15px',
        outline: 'none'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        color: '#6b7280',
        marginBottom: '4px',
        fontWeight: '500'
    };

    return (
        <div style={cardStyle}>
            <div style={headerStyle}>
                <h3 className="card-title" style={{ fontSize: '18px', margin: 0 }}>Education</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} style={btnStyle}>
                        <Plus size={14} /> Add Education
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>Institution</label>
                            <input required style={inputStyle} value={formData.institution} onChange={e => setFormData({ ...formData, institution: e.target.value })} placeholder="e.g. Harvard University" />
                        </div>
                        <div>
                            <label style={labelStyle}>Degree</label>
                            <input required style={inputStyle} value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} placeholder="e.g. Bachelor's" />
                        </div>
                        <div>
                            <label style={labelStyle}>Field of Study</label>
                            <input required style={inputStyle} value={formData.fieldOfStudy} onChange={e => setFormData({ ...formData, fieldOfStudy: e.target.value })} placeholder="e.g. Computer Science" />
                        </div>
                        <div>
                            <label style={labelStyle}>Start Year</label>
                            <input required style={inputStyle} value={formData.startYear} onChange={e => setFormData({ ...formData, startYear: e.target.value })} placeholder="YYYY" />
                        </div>
                        <div>
                            <label style={labelStyle}>End Year</label>
                            <input required style={inputStyle} value={formData.endYear} onChange={e => setFormData({ ...formData, endYear: e.target.value })} placeholder="YYYY or Present" />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button type="button" onClick={() => setIsAdding(false)} style={{ ...btnStyle, border: 'none' }}>Cancel</button>
                        <button type="submit" style={{ ...btnStyle, backgroundColor: '#111827', color: '#fff', border: '1px solid #111827' }}>Save</button>
                    </div>
                </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {education.map((edu, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px', position: 'relative' }} className="group">
                        <div style={{ marginTop: '4px', color: '#d1d5db' }}><GraduationCap size={24} /></div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>{edu.institution}</h4>
                            <p style={{ fontSize: '15px', color: '#4b5563', margin: '2px 0' }}>{edu.degree}, {edu.fieldOfStudy}</p>
                            <p style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                <Calendar size={12} /> {edu.startYear} - {edu.endYear}
                            </p>
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af' }} className="hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {education.length === 0 && !isAdding && <p style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>No education history added.</p>}
            </div>
        </div>
    );
};

export const ExperienceSection = ({ experience = [], onUpdate, isOwnProfile }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        title: '', company: '', startYear: '', endYear: '', description: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExp = [...experience, formData];
        await onUpdate({ experience: newExp });
        setIsAdding(false);
        setFormData({ title: '', company: '', startYear: '', endYear: '', description: '' });
    };

    const handleDelete = async (index) => {
        if (window.confirm('Are you sure?')) {
            const newExp = experience.filter((_, i) => i !== index);
            await onUpdate({ experience: newExp });
        }
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

    const btnStyle = {
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

    const inputStyle = {
        width: '100%',
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid #d1d5db',
        fontSize: '15px',
        outline: 'none'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        color: '#6b7280',
        marginBottom: '4px',
        fontWeight: '500'
    };

    return (
        <div style={cardStyle}>
            <div style={headerStyle}>
                <h3 className="card-title" style={{ fontSize: '18px', margin: 0 }}>Experience</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} style={btnStyle}>
                        <Plus size={14} /> Add Experience
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} style={{ marginBottom: '24px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>Job Title</label>
                            <input required style={inputStyle} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Senior Frontend Developer" />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>Company / Organization</label>
                            <input required style={inputStyle} value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} placeholder="e.g. TechCorp Inc." />
                        </div>
                        <div>
                            <label style={labelStyle}>Start Year</label>
                            <input required style={inputStyle} value={formData.startYear} onChange={e => setFormData({ ...formData, startYear: e.target.value })} placeholder="YYYY" />
                        </div>
                        <div>
                            <label style={labelStyle}>End Year</label>
                            <input required style={inputStyle} value={formData.endYear} onChange={e => setFormData({ ...formData, endYear: e.target.value })} placeholder="YYYY or Present" />
                        </div>
                        <div style={{ gridColumn: '1 / -1' }}>
                            <label style={labelStyle}>Description (Optional)</label>
                            <textarea style={{ ...inputStyle, resize: 'vertical' }} rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your responsibilities..." />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button type="button" onClick={() => setIsAdding(false)} style={{ ...btnStyle, border: 'none' }}>Cancel</button>
                        <button type="submit" style={{ ...btnStyle, backgroundColor: '#111827', color: '#fff', border: '1px solid #111827' }}>Save</button>
                    </div>
                </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {experience.map((exp, index) => (
                    <div key={index} style={{ display: 'flex', gap: '16px', position: 'relative' }} className="group">
                        <div style={{ marginTop: '4px', color: '#d1d5db' }}><Briefcase size={24} /></div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#111827', margin: 0 }}>{exp.title}</h4>
                            <p style={{ fontSize: '15px', color: '#4b5563', margin: '2px 0' }}>{exp.company}</p>
                            <p style={{ fontSize: '13px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                                <Calendar size={12} /> {exp.startYear} - {exp.endYear}
                            </p>
                            {exp.description && <p style={{ fontSize: '14px', color: '#374151', marginTop: '8px', lineHeight: '1.5' }}>{exp.description}</p>}
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#9ca3af' }} className="hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {experience.length === 0 && !isAdding && <p style={{ color: '#9ca3af', fontSize: '14px', fontStyle: 'italic' }}>No experience added yet.</p>}
            </div>
        </div>
    );
};
