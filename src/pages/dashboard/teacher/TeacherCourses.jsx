import React from 'react';
import { BookOpen, Users, Video, Plus } from 'lucide-react';

const TeacherCourses = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">My Courses</h1>
                    <p className="page-description">Create and manage your educational content.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', gap: '0.5rem' }}>
                    <Plus size={18} /> New Course
                </button>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ height: '180px', backgroundColor: 'var(--brand-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        Course Thumbnail
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <span className="tag" style={{ margin: 0 }}>Development</span>
                            <span style={{ fontWeight: 'bold', color: 'var(--brand-navy)' }}>$49.99</span>
                        </div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>Full Stack Web Development 2026</h3>
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Learn React, Node.js, and Modern UI Design from scratch.</p>

                        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Users size={16} /> 120 Students</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Video size={16} /> 45 Lessons</div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem' }}>Manage</button>
                            <button className="btn btn-primary" style={{ flex: 1, padding: '0.5rem' }}>Edit Content</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherCourses;
