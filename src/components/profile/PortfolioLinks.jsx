import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Github, Linkedin, Globe, Award, Edit2 } from 'lucide-react';
import './profile-components.css';

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
        if (window.confirm('Are you sure you want to delete this project?')) {
            const newProjects = projects.filter((_, i) => i !== index);
            await onUpdate({ projects: newProjects });
        }
    };

    return (
        <div className="profile-card">
            <div className="profile-section-header">
                <h3 className="profile-section-title">Portfolio & Projects</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-secondary btn-sm flex-row-gap gap-sm">
                        <Plus size={14} /> Add Project
                    </button>
                )}
            </div>

            {/* Add Form */}
            {isAdding && (
                <form onSubmit={handleSubmit} className="banner banner-gray mb-lg">
                    <div className="profile-form-grid">
                        <div className="profile-form-full">
                            <label className="profile-label">Project Title</label>
                            <input required placeholder="e.g. E-Commerce Dashboard" className="search-input w-full" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                        </div>
                        <div className="profile-form-full">
                            <label className="profile-label">Description</label>
                            <textarea required placeholder="What did you build? What problem did it solve?" className="search-input w-full textarea-portfolio-height" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="profile-form-full">
                            <label className="profile-label">Technologies (comma separated)</label>
                            <input placeholder="React, Node.js, MongoDB" className="search-input w-full" value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} />
                        </div>
                        <div>
                            <label className="profile-label">Live Demo URL</label>
                            <input placeholder="https://..." className="search-input w-full" value={formData.projectUrl} onChange={e => setFormData({ ...formData, projectUrl: e.target.value })} />
                        </div>
                        <div>
                            <label className="profile-label">GitHub Repo URL</label>
                            <input placeholder="https://github.com/..." className="search-input w-full" value={formData.repoUrl} onChange={e => setFormData({ ...formData, repoUrl: e.target.value })} />
                        </div>
                    </div>
                    <div className="actions-right">
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost btn-sm">Cancel</button>
                        <button type="submit" className="btn btn-primary btn-sm">Add Project</button>
                    </div>
                </form>
            )}

            <div className="portfolio-grid">
                {projects.map((proj, index) => (
                    <div key={index} className="portfolio-project-card group">
                        <h4 className="portfolio-card-title">{proj.title}</h4>
                        <p className="portfolio-card-desc">{proj.description}</p>

                        <div className="skills-wrap mb-md">
                            {proj.technologies && proj.technologies.map(t => (
                                <span key={t} className="skill-tag">{t}</span>
                            ))}
                        </div>

                        <div className="portfolio-card-links">
                            {proj.projectUrl && (
                                <a href={proj.projectUrl} target="_blank" rel="noreferrer" className="portfolio-link">
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                            )}
                            {proj.repoUrl && (
                                <a href={proj.repoUrl} target="_blank" rel="noreferrer" className="portfolio-link github">
                                    <Github size={14} /> Code
                                </a>
                            )}
                        </div>

                        {isOwnProfile && (
                            <button
                                onClick={() => handleDelete(index)}
                                className="icon-button text-red-500 pos-abs-top-right btn-icon btn-ghost btn-sm hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {projects.length === 0 && !isAdding && (
                    <div className="profile-form-full text-center py-xl border-dashed border-2 border-gray-200 rounded-lg text-muted italic">
                        No projects added to portfolio yet.
                    </div>
                )}
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
            <div className="profile-card">
                <div className="profile-section-header">
                    <h3 className="profile-section-title">Social Links</h3>
                </div>
                <div className="flex-col gap-md">
                    <div className="flex-row-gap gap-md">
                        <div className="social-icon-box"><Github size={20} className="text-gray-700" /></div>
                        <input className="search-input flex-1" placeholder="GitHub URL" value={formData.github || ''} onChange={e => setFormData({ ...formData, github: e.target.value })} />
                    </div>
                    <div className="flex-row-gap gap-md">
                        <div className="social-icon-box"><Linkedin size={20} className="color-linkedin" /></div>
                        <input className="search-input flex-1" placeholder="LinkedIn URL" value={formData.linkedin || ''} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
                    </div>
                    <div className="flex-row-gap gap-md">
                        <div className="social-icon-box"><Globe size={20} className="text-primary" /></div>
                        <input className="search-input flex-1" placeholder="Portfolio Website" value={formData.website || ''} onChange={e => setFormData({ ...formData, website: e.target.value })} />
                    </div>
                    <div className="flex-row-gap gap-md">
                        <div className="social-icon-box font-bold-behance">Be</div>
                        <input className="search-input flex-1" placeholder="Behance URL" value={formData.behance || ''} onChange={e => setFormData({ ...formData, behance: e.target.value })} />
                    </div>
                </div>
                <div className="profile-actions-row">
                    <button className="btn btn-ghost" onClick={() => setIsEditing(false)}>Cancel</button>
                    <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        )
    }

    return (
        <div className="profile-card">
            <div className="profile-section-header">
                <h3 className="profile-section-title">On the Web</h3>
                {isOwnProfile && (
                    <button onClick={() => setIsEditing(true)} className="btn btn-secondary btn-sm flex-row-gap gap-sm">
                        Edit <Edit2 size={14} />
                    </button>
                )}
            </div>
            <div className="social-links-stack">
                {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noreferrer" className="social-link-item">
                        <div className="social-icon-box"><Github size={20} /></div> GitHub
                    </a>
                )}
                {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-link-item linkedin">
                        <div className="social-icon-box"><Linkedin size={20} /></div> LinkedIn
                    </a>
                )}
                {socialLinks.website && (
                    <a href={socialLinks.website} target="_blank" rel="noreferrer" className="social-link-item website">
                        <div className="social-icon-box"><Globe size={20} /></div> Website
                    </a>
                )}
                {socialLinks.behance && (
                    <a href={socialLinks.behance} target="_blank" rel="noreferrer" className="social-link-item behance">
                        <div className="social-icon-box font-bold-behance">Be</div> Behance
                    </a>
                )}
                {!socialLinks.github && !socialLinks.linkedin && !socialLinks.website && !socialLinks.behance && (
                    <p className="text-muted text-sm italic">No social links added.</p>
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
        <div className="profile-card">
            <div className="profile-section-header">
                <h3 className="profile-section-title">Certifications</h3>
                {isOwnProfile && !isAdding && (
                    <button onClick={() => setIsAdding(true)} className="btn btn-secondary btn-sm">
                        <Plus size={14} /> Add
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="banner banner-gray mb-lg">
                    <div className="profile-form-grid">
                        <div className="profile-form-full">
                            <label className="profile-label">Certification Name</label>
                            <input required placeholder="e.g. AWS Certified Developer" className="search-input w-full" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="profile-form-full">
                            <label className="profile-label">Issuer</label>
                            <input required placeholder="e.g. Amazon Web Services" className="search-input w-full" value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} />
                        </div>
                        <div>
                            <label className="profile-label">Year</label>
                            <input required placeholder="YYYY" className="search-input w-full" value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                        </div>
                        <div>
                            <label className="profile-label">Credential URL (Optional)</label>
                            <input placeholder="https://..." className="search-input w-full" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex-row-gap gap-sm mt-lg" style={{ justifyContent: 'flex-end' }}>
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-ghost btn-sm">Cancel</button>
                        <button type="submit" className="btn btn-primary btn-sm">Save</button>
                    </div>
                </form>
            )}

            <div className="profile-list-stack">
                {certifications.map((cert, index) => (
                    <div key={index} className="profile-item-row group">
                        <div className="profile-item-icon gold"><Award size={20} /></div>
                        <div className="profile-item-body">
                            <h4 className="profile-item-title-h4">{cert.name}</h4>
                            <p className="profile-item-subtitle">{cert.issuer} • {cert.year}</p>
                            {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" className="portfolio-link text-xs-meta mt-025">View Credential</a>}
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} className="btn-icon btn-ghost btn-sm hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {certifications.length === 0 && !isAdding && <p className="text-muted text-sm italic">No certifications listed.</p>}
            </div>
        </div>
    );
};
