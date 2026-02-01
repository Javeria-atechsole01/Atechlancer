import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, Github, Linkedin, Globe, Award, Edit2 } from 'lucide-react';

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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="card-title">Portfolio & Projects</h3>
                {isOwnProfile && !isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                        <Plus size={14} /> Add Project
                    </button>
                )}
            </div>

            {/* Add Form */}
            {isAdding && (
                <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', backgroundColor: 'var(--gray-50)', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid var(--gray-200)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label className="form-label">Project Title</label>
                        <input required placeholder="e.g. E-Commerce Dashboard" className="search-input" style={{ width: '100%' }} value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                    </div>
                    <div>
                        <label className="form-label">Description</label>
                        <textarea required placeholder="What did you build? What problem did it solve?" className="search-input" style={{ width: '100%', resize: 'none' }} rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>
                    <div>
                        <label className="form-label">Technologies (comma separated)</label>
                        <input placeholder="React, Node.js, MongoDB" className="search-input" style={{ width: '100%' }} value={formData.technologies} onChange={e => setFormData({ ...formData, technologies: e.target.value })} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <input placeholder="Live Demo URL" className="search-input" value={formData.projectUrl} onChange={e => setFormData({ ...formData, projectUrl: e.target.value })} />
                        <input placeholder="GitHub Repo URL" className="search-input" value={formData.repoUrl} onChange={e => setFormData({ ...formData, repoUrl: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Project</button>
                    </div>
                </form>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                {projects.map((proj, index) => (
                    <div key={index} style={{ border: '1px solid var(--gray-200)', borderRadius: '0.5rem', padding: '1rem', position: 'relative', backgroundColor: 'white', transition: 'box-shadow 0.2s' }} className="hover:shadow-lg group">
                        <h4 style={{ fontWeight: 'bold', fontSize: '1.125rem', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>{proj.title}</h4>
                        <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{proj.description}</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                            {proj.technologies && proj.technologies.map(t => (
                                <span key={t} style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', backgroundColor: 'var(--gray-100)', borderRadius: '0.25rem', color: 'var(--gray-600)' }}>{t}</span>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem' }}>
                            {proj.projectUrl && (
                                <a href={proj.projectUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary-600)', textDecoration: 'none' }} className="hover:underline">
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                            )}
                            {proj.repoUrl && (
                                <a href={proj.repoUrl} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--gray-700)', textDecoration: 'none' }} className="hover:underline">
                                    <Github size={14} /> Code
                                </a>
                            )}
                        </div>

                        {isOwnProfile && (
                            <button
                                onClick={() => handleDelete(index)}
                                style={{
                                    position: 'absolute',
                                    top: '0.75rem',
                                    right: '0.75rem',
                                    background: 'rgba(255,255,255,0.8)',
                                    border: 'none',
                                    borderRadius: '0.25rem',
                                    padding: '0.25rem',
                                    cursor: 'pointer',
                                    color: 'var(--gray-400)'
                                }}
                                className="group-hover:opacity-100 hover:text-red-500"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {projects.length === 0 && !isAdding && (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--gray-400)', padding: '2rem', border: '2px dashed var(--gray-200)', borderRadius: '0.5rem' }}>
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

    if (isOwnProfile && isEditing) {
        return (
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h3 className="card-title" style={{ fontSize: '18px', margin: 0 }}>Social Links</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Github size={20} style={{ color: 'var(--gray-700)' }} />
                        <input className="search-input" style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }} placeholder="GitHub URL" value={formData.github || ''} onChange={e => setFormData({ ...formData, github: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Linkedin size={20} style={{ color: '#0077b5' }} />
                        <input className="search-input" style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }} placeholder="LinkedIn URL" value={formData.linkedin || ''} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Globe size={20} style={{ color: 'var(--gray-500)' }} />
                        <input className="search-input" style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }} placeholder="Portfolio Website" value={formData.website || ''} onChange={e => setFormData({ ...formData, website: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '20px', display: 'flex', justifyContent: 'center', fontWeight: 'bold', color: '#1769ff' }}>Be</div>
                        <input className="search-input" style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db' }} placeholder="Behance URL" value={formData.behance || ''} onChange={e => setFormData({ ...formData, behance: e.target.value })} />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                    <button style={{ ...editBtnStyle, border: 'none' }} onClick={() => setIsEditing(false)}>Cancel</button>
                    <button style={{ ...editBtnStyle, backgroundColor: '#111827', color: '#fff', border: '1px solid #111827' }} onClick={handleSave}>Save Changes</button>
                </div>
            </div>
        )
    }

    // View Mode
    return (
        <div style={cardStyle}>
            <div style={headerStyle}>
                <h3 className="card-title" style={{ fontSize: '18px', margin: 0 }}>On the Web</h3>
                {isOwnProfile && (
                    <button onClick={() => setIsEditing(true)} style={editBtnStyle}>
                        Edit <Edit2 size={14} />
                    </button>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {socialLinks.github && (
                    <a href={socialLinks.github} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', textDecoration: 'none', fontSize: '15px' }} className="hover:text-navy-900">
                        <Github size={20} /> GitHub
                    </a>
                )}
                {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', textDecoration: 'none', fontSize: '15px' }} className="hover:text-blue-700">
                        <Linkedin size={20} /> LinkedIn
                    </a>
                )}
                {socialLinks.website && (
                    <a href={socialLinks.website} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', textDecoration: 'none', fontSize: '15px' }} className="hover:text-primary-600">
                        <Globe size={20} /> Website
                    </a>
                )}
                {socialLinks.behance && (
                    <a href={socialLinks.behance} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#374151', textDecoration: 'none', fontSize: '15px' }} className="hover:text-blue-500">
                        <div style={{ width: '20px', textAlign: 'center', fontWeight: 'bold' }}>Be</div> Behance
                    </a>
                )}
                {!socialLinks.github && !socialLinks.linkedin && !socialLinks.website && (
                    <p style={{ color: '#9ca3af', fontSize: '14px' }}>No social links added.</p>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 className="card-title">Certifications</h3>
                {isOwnProfile && !isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="btn btn-outline"
                        style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                        <Plus size={14} /> Add
                    </button>
                )}
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} style={{ marginBottom: '1.5rem', backgroundColor: 'var(--gray-50)', padding: '1rem', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input required placeholder="Certification Name" className="search-input" style={{ width: '100%' }} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    <input required placeholder="Issuer (e.g. Google, Coursera)" className="search-input" style={{ width: '100%' }} value={formData.issuer} onChange={e => setFormData({ ...formData, issuer: e.target.value })} />
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input required placeholder="Year" className="search-input" style={{ width: '120px' }} value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                        <input placeholder="Credential URL (Optional)" className="search-input" style={{ flex: 1 }} value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button type="button" onClick={() => setIsAdding(false)} className="btn btn-outline">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {certifications.map((cert, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} className="group">
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <div style={{ marginTop: '0.25rem', color: '#d69e2e' }}><Award size={20} /></div>
                            <div>
                                <h4 style={{ fontWeight: '600', color: 'var(--navy-900)' }}>{cert.name}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)' }}>{cert.issuer} • {cert.year}</p>
                                {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: 'var(--primary-600)', textDecoration: 'none' }} className="hover:underline">View Credential</a>}
                            </div>
                        </div>
                        {isOwnProfile && (
                            <button onClick={() => handleDelete(index)} style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--gray-400)' }} className="hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                {certifications.length === 0 && !isAdding && <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem' }}>No certifications listed.</p>}
            </div>
        </div>
    );
}
