import React from 'react';
import { Upload, Github, Image } from 'lucide-react';
import './student.css';

const StudentProjects = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Final Year Project (FYP)</h1>
                    <p className="page-description">Showcase your best work to potential employers.</p>
                </div>
            </div>

            <div className="card">
                <h2 className="card-title mb-lg">Upload Project Details</h2>

                <form className="dashboard-form-stack">
                    {/* Project Title */}
                    <div className="form-group">
                        <label>Project Title</label>
                        <input type="text" className="search-input w-full" placeholder="e.g. AI-Powered Traffic Management System" />
                    </div>

                    {/* Description */}
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="search-input w-full textarea-resizable" rows="4" placeholder="Describe your project's goals, technologies used, and outcomes..." />
                    </div>

                    {/* File Upload Area */}
                    <div className="form-group">
                        <label>Project Files (PDF / Docs)</label>
                        <div className="upload-dropzone">
                            <Upload size={32} className="upload-dropzone-icon" />
                            <p className="upload-dropzone-text">Click to upload or drag and drop</p>
                            <p className="upload-dropzone-hint">PDF, DOCX, PPTX (Max 10MB)</p>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="profile-form-grid">
                        <div className="form-group">
                            <label>GitHub Repository</label>
                            <div className="input-with-icon">
                                <Github size={18} className="input-icon" />
                                <input type="text" className="search-input w-full" placeholder="https://github.com/..." />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Live Demo URL</label>
                            <div className="input-with-icon">
                                <Image size={18} className="input-icon" />
                                <input type="text" className="search-input w-full" placeholder="https://..." />
                            </div>
                        </div>
                    </div>

                    <div className="profile-actions-row">
                        <button type="button" className="btn btn-secondary">Cancel</button>
                        <button type="button" className="btn btn-primary">Save Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentProjects;
