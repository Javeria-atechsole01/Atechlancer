import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Github, Linkedin, Globe, Twitter, Award } from 'lucide-react';
import { profileService } from '../../services/profileService';

export const PortfolioSection = ({ projects = [], onUpdate, isOwnProfile }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({
        title: '', description: '', technologies: '', projectUrl: '', repoUrl: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProject = {
            ...formData,
            technologies: formData.technologies.split(',').map(t => t.trim())
        };
        const newProjects = [...projects, newProject];
        await onUpdate({ projects: newProjects });
        setIsAdding(false);
        setFormData({ title: '', description: '', technologies: '', projectUrl: '', repoUrl: '' });
    };

    const handleDelete = async (index) => {
        if (window.confirm('Delete this project?')) {
            const newProjects = projects.filter((_, i) => i !== index);
            await onUpdate({ projects: newProjects });
        }
    };

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-6">
                <h3 className="card-title">Portfolio & Projects</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-outline text-sm py-1 px-3 flex items-center gap-1">
                        <Plus size={14} /> Add Project
                    </button>
                )}
            </div>

            {/* Add Form */}
            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-4">
                    <div>
                        <label className="form-label">Project Title</label>
                        <input required placeholder="e.g. E-Commerce Dashboard" className="search-input w-full" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="form-label">Description</label>
                        <textarea required placeholder="What did you build? What problem did it solve?" className="search-input w-full resize-none" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div>
                        <label className="form-label">Technologies (comma separated)</label>
                        <input placeholder="React, Node.js, MongoDB" className="search-input w-full" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input placeholder="Live Demo URL" className="search-input" value={formData.projectUrl} onChange={e => setFormData({ ...formData, projectUrl: e.target.value })} />
                        <input placeholder="GitHub Repo URL" className="search-input" value={formData.repoUrl} onChange={e => setFormData({ ...formData, repoUrl: e.target.value })} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Project</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {projects.map((proj, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow relative group bg-white">
                        <h4 className="font-bold text-lg text-navy-900 mb-2">{proj.title}</h4>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{proj.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {proj.technologies && proj.technologies.map(t => (
                                <span key={t} className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{t}</span>
                            ))}
                        </div>

                        <div className="flex gap-3 text-sm">
                            {proj.projectUrl && (
                                <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-primary-600 hover:underline">
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                            )}
                            {proj.repoUrl && (
                                <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-700 hover:underline">
                                    <Github size={14} /> Code
                                </a>
                            )}
                        </div>

                        {isOwnProfile && (
                            <button
                                onClick={() => handleDelete(index)}
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-1 rounded"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {projects.length === 0 && !isAdding && <div className="col-span-2 text-center text-gray-400 py-8 border-2 border-dashed border-gray-200 rounded-lg">No projects added to portfolio yet.</div>}
            </div>
        </div>
    );
};

export const SocialLinksSection = ({ socialLinks = {}, onUpdate, isOwnProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...socialLinks });

    const handleSave = async () => {
        await onUpdate({ socialLinks: formData });
        setIsEditing(false);
    };

    if (isOwnProfile && isEditing) {
        return (
            <div className="card space-y-4">
                <h3 className="card-title">Social Links</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Github size={20} className="text-gray-700" />
                        <input className="search-input w-full" placeholder="GitHub URL" value={formData.github || ''} onChange={e => setFormData({ ...formData, github: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-3">
                        <Linkedin size={20} className="text-blue-600" />
                        <input className="search-input w-full" placeholder="LinkedIn URL" value={formData.linkedin || ''} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-3">
                        <Globe size={20} className="text-gray-500" />
                        <input className="search-input w-full" placeholder="Portfolio Website" value={formData.website || ''} onChange={e => setFormData({ ...formData, website: e.target.value })} />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-5 flex justify-center font-bold text-blue-400">Be</div>
                        <input className="search-input w-full" placeholder="Behance URL" value={formData.behance || ''} onChange={e => setFormData({ ...formData, behance: e.target.value })} />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button className="btn btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        )
    }

    // View Mode
    return (
        <div className="card">
            <div className="flex justify-between items-center mb-4">
                <h3 className="card-title">On the Web</h3>
                {isOwnProfile && <button onClick={() => setIsEditing(true)} className="text-primary-600 text-sm hover:underline">Edit</button>}
            </div>
            <div className="space-y-4">
                {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-navy-900">
                        <Github size={20} /> GitHub
                    </a>
                )}
                {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-700">
                        <Linkedin size={20} /> LinkedIn
                    </a>
                )}
                {socialLinks.website && (
                    <a href={socialLinks.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-primary-600">
                        <Globe size={20} /> Website
                    </a>
                )}
                {socialLinks.behance && (
                    <a href={socialLinks.behance} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-blue-500">
                        <div className="w-5 flex justify-center font-bold">Be</div> Behance
                    </a>
                )}
                {!socialLinks.github && !socialLinks.linkedin && !socialLinks.website && (
                    <p className="text-gray-400 text-sm">No social links added.</p>
                )}
            </div>
        </div>
    );
};

export const CertificationSection = ({ certifications = [], onUpdate, isOwnProfile }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [formData, setFormData] = useState({ name: '', issuer: '', year: '', url: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCerts = [...certifications, formData];
        await onUpdate({ certifications: newCerts });
        setIsAdding(false);
        setFormData({ name: '', issuer: '', year: '', url: '' });
    };

    const handleDelete = async (index) => {
        if (window.confirm('Delete this certification?')) {
            const newCerts = certifications.filter((_, i) => i !== index);
            await onUpdate({ certifications: newCerts });
        }
    };

    return (
        <div className="card">
            <div className="flex justify-between items-center mb-6">
                <h3 className="card-title">Certifications</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-outline text-sm py-1 px-3 flex items-center gap-1">
                        <Plus size={14} /> Add
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="mb-6 bg-gray-50 p-4 rounded-lg space-y-4">
                    <input required placeholder="Certification Name" className="search-input w-full" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <input required placeholder="Issuer (e.g. Google, Coursera)" className="search-input w-full" value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} />
                    <div className="flex gap-4">
                        <input required placeholder="Year" className="search-input w-32" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                        <input placeholder="Credential URL (Optional)" className="search-input flex-1" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            )}

            <div className="space-y-4">
                {certifications.map((cert, index) => (
                    <div key={index} className="flex justify-between items-start group">
                        <div className="flex gap-3">
                            <div className="mt-1 text-yellow-600"><Award size={20} /></div>
                            <div>
                                <h4 className="font-semibold text-navy-900">{cert.name}</h4>
                                <p className="text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
                                {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" className="text-xs text-primary-600 hover:underline">View Credential</a>}
                            </div>
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {certifications.length === 0 && !isAdding && <p className="text-gray-400 text-sm">No certifications listed.</p>}
            </div>
        </div>
    );
}
