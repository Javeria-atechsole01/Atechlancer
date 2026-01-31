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

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-6">
                <h3 className="card-title">Education</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-outline text-sm py-1 px-3 flex items-center gap-1">
                        <Plus size={14} /> Add
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required placeholder="Institution" className="search-input" value={formData.institution} onChange={e => setFormData({ ...formData, institution: e.target.value })} />
                        <input required placeholder="Degree" className="search-input" value={formData.degree} onChange={e => setFormData({ ...formData, degree: e.target.value })} />
                        <input required placeholder="Field of Study" className="search-input" value={formData.fieldOfStudy} onChange={e => setFormData({ ...formData, fieldOfStudy: e.target.value })} />
                    </div>
                    <div className="flex gap-4">
                        <input required placeholder="Start Year" className="search-input w-32" value={formData.startYear} onChange={e => setFormData({ ...formData, startYear: e.target.value })} />
                        <input required placeholder="End Year (or Present)" className="search-input w-32" value={formData.endYear} onChange={e => setFormData({ ...formData, endYear: e.target.value })} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            )}

            <div className="space-y-6">
                {education.map((edu, index) => (
                    <div key={index} className="flex gap-4 group">
                        <div className="mt-1 text-gray-400"><GraduationCap size={20} /></div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-navy-900">{edu.institution}</h4>
                            <p className="text-gray-700">{edu.degree}, {edu.fieldOfStudy}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <Calendar size={12} /> {edu.startYear} - {edu.endYear}
                            </p>
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {education.length === 0 && !isAdding && <p className="text-gray-400 text-sm">No education history added.</p>}
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

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-6">
                <h3 className="card-title">Experience</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-outline text-sm py-1 px-3 flex items-center gap-1">
                        <Plus size={14} /> Add
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input required placeholder="Job Title" className="search-input" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        <input required placeholder="Company / Organization" className="search-input" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                    </div>
                    <div className="flex gap-4">
                        <input required placeholder="Start Year" className="search-input w-32" value={formData.startYear} onChange={e => setFormData({ ...formData, startYear: e.target.value })} />
                        <input required placeholder="End Year (or Present)" className="search-input w-32" value={formData.endYear} onChange={e => setFormData({ ...formData, endYear: e.target.value })} />
                    </div>
                    <textarea placeholder="Description (Optional)" className="search-input w-full resize-none" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            )}

            <div className="space-y-6">
                {experience.map((exp, index) => (
                    <div key={index} className="flex gap-4 group">
                        <div className="mt-1 text-gray-400"><Briefcase size={20} /></div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-navy-900">{exp.title}</h4>
                            <p className="text-gray-700">{exp.company}</p>
                            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                                <Calendar size={12} /> {exp.startYear} - {exp.endYear}
                            </p>
                            {exp.description && <p className="text-sm text-gray-600 mt-2">{exp.description}</p>}
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {experience.length === 0 && !isAdding && <p className="text-gray-400 text-sm">No experience added yet.</p>}
            </div>
        </div>
    );
};
