import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Github, ExternalLink, MessageCircle, ChevronLeft, Eye, Code, CheckCircle } from 'lucide-react';
import ContactOwnerModal from '../components/projects/ContactOwnerModal';
import './project-details.css';

const ProjectDetails = () => {
    const { id } = useParams();
    const [liked, setLiked] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    // Mock Data
    const project = {
        id: 1,
        title: 'AI-Powered Personal Finance Tracker',
        student: 'Sarah Smith',
        studentRole: 'Full Stack Developer',
        category: 'AI/Machine Learning',
        summary: 'A smart dashboard that categorizes expenses automatically using NLP and predicts future spending.',
        views: 342,
        likes: 28,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
        repoUrl: 'https://github.com',
        liveUrl: 'https://demo.com',
        description: `
            <div class="rich-content">
                <p>Managing personal finances can be tedious. This project aims to automate expense tracking by parsing bank statements and transaction SMS using Natural Language Processing.</p>
                <h3>Problem Statement</h3>
                <p>Most finance apps require manual entry or have poor categorization for local merchants. Users often lose track of subscriptions and small daily expenses.</p>
                <div class="quote-box">
                    "The goal was not just to track, but to provide actionable insights that actually save money."
                </div>
                <h3>Solution</h3>
                <p>I built a web app that allows CSV uploads and connects to Plaid API. Using OpenAI's GPT-3.5, categorization accuracy improved by 40% compared to rule-based systems.</p>
            </div>
        `,
        techStack: ['React', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
        tags: ['Fintech', 'AI', 'Automation', 'SaaS'],
        isVerified: true
    };

    return (
        <div className="project-details-page">
            <ContactOwnerModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                studentName={project.student}
                projectTitle={project.title}
            />

            {/* Hero Header */}
            <header className="project-hero">
                <div className="hero-pattern"></div>
                <div className="hero-container">
                    <Link to="/projects" className="back-link">
                        <ChevronLeft size={20} /> Back to Hub
                    </Link>

                    <div className="hero-content-row">
                        <div className="hero-info">
                            <div className="category-badge-strip">
                                <span className="category-tag">
                                    {project.category}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: '#cbd5e1' }}>
                                    <Eye size={16} /> {project.views} views
                                </span>
                            </div>
                            <h1>{project.title}</h1>
                            <p className="hero-summary">
                                {project.summary}
                            </p>
                        </div>

                        <div className="hero-actions">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-live">
                                    <ExternalLink size={18} /> View Live
                                </a>
                            )}
                            {project.repoUrl && (
                                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn-repo">
                                    <Github size={18} /> Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="project-content-grid">
                {/* Main Content */}
                <div className="detail-section">
                    {/* Main Image */}
                    <article className="project-card">
                        <div className="image-container house-relative">
                            <img src={project.image} alt={project.title} />
                        </div>
                        <div className="project-details-body">
                            <div dangerouslySetInnerHTML={{ __html: project.description }} />

                            <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--gray-100)' }}>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Code className="text-primary-600" size={24} /> Tech Stack
                                </h3>
                                <div className="tag-cloud">
                                    {project.techStack.map(tech => (
                                        <span key={tech} className="btn btn-secondary btn-sm" style={{ cursor: 'default' }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Sidebar */}
                <aside className="sidebar-section">
                    <div className="sidebar-sticky">
                        {/* Student Profile */}
                        <div className="student-card">
                            <div className="student-header">
                                <div className="profile-initial">
                                    {project.student[0]}
                                </div>
                                <div className="student-name">
                                    <h3>
                                        {project.student}
                                        {project.isVerified && <CheckCircle size={14} style={{ color: 'var(--accent-500)' }} />}
                                    </h3>
                                    <p className="student-title">{project.studentRole}</p>
                                    <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                                        <span className="badge">5 Projects</span>
                                        <span className="badge">120 Likes</span>
                                    </div>
                                </div>
                            </div>

                            <div className="actions-stack">
                                <button
                                    onClick={() => setIsContactOpen(true)}
                                    className="btn btn-primary"
                                    style={{ width: '100%' }}
                                >
                                    <MessageCircle size={18} /> Contact Student
                                </button>
                                <button className="btn btn-secondary" style={{ width: '100%', marginTop: '0.75rem' }}>
                                    View Full Profile
                                </button>
                            </div>

                            {/* Interaction Actions */}
                            <div className="stats-row">
                                <button
                                    onClick={() => setLiked(!liked)}
                                    className={`stat-btn ${liked ? 'active' : ''}`}
                                >
                                    <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
                                    <span className="stat-val">{liked ? project.likes + 1 : project.likes}</span>
                                    <span className="stat-lbl">Appreciate</span>
                                </button>
                                <button className="stat-btn">
                                    <Share2 size={24} />
                                    <span className="stat-val">Share</span>
                                    <span className="stat-lbl">Spread Word</span>
                                </button>
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="tags-card">
                            <h4>Related Topics</h4>
                            <div className="tag-cloud">
                                {project.tags.map(tag => (
                                    <span key={tag} className="tag-item">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    );
};

export default ProjectDetails;
