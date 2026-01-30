import React from 'react';
import { Upload, File, Github, Image, X } from 'lucide-react';

const StudentProjects = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Final Year Project (FYP)</h1>
                    <p className="page-description">Showcase your best work to potential employers.</p>
                </div>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 0' }}>
                <h2 className="card-title" style={{ marginBottom: '1.5rem' }}>Upload Project Details</h2>

                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {/* Project Title */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Project Title</label>
                        <input type="text" className="search-input" placeholder="e.g. AI-Powered Traffic Management System" />
                    </div>

                    {/* Description */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Description</label>
                        <textarea className="search-input" rows="4" placeholder="Describe your project's goals, technologies used, and outcomes..." style={{ resize: 'vertical' }}></textarea>
                    </div>

                    {/* File Upload Area */}
                    <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Project Files (PDF / Docs)</label>
                        <div style={{
                            border: '2px dashed var(--gray-300)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            backgroundColor: 'var(--gray-50)',
                            transition: 'all 0.2s'
                        }}>
                            <Upload size={32} style={{ color: 'var(--gray-400)', marginBottom: '0.5rem' }} />
                            <p style={{ fontWeight: '500', color: 'var(--gray-700)' }}>Click to upload or drag and drop</p>
                            <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>PDF, DOCX, PPTX (Max 10MB)</p>
                        </div>
                    </div>

                    {/* Links */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>GitHub Repository</label>
                            <div style={{ position: 'relative' }}>
                                <Github size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--gray-500)' }} />
                                <input type="text" className="search-input" style={{ paddingLeft: '2.5rem' }} placeholder="https://github.com/..." />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: 'var(--gray-700)', marginBottom: '0.5rem' }}>Live Demo URL</label>
                            <div style={{ position: 'relative' }}>
                                <Image size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--gray-500)' }} />
                                <input type="text" className="search-input" style={{ paddingLeft: '2.5rem' }} placeholder="https://..." />
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" className="btn btn-secondary">Cancel</button>
                        <button type="button" className="btn btn-primary">Save Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentProjects;
