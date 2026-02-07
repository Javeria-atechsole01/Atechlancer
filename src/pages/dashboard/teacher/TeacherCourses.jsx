import React from 'react';
import { BookOpen, Users, Video, Plus } from 'lucide-react';
import './teacher.css';

const TeacherCourses = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">My Courses</h1>
                    <p className="page-description">Create and manage your educational content.</p>
                </div>
                <button className="btn btn-primary flex-row-gap gap-sm">
                    <Plus size={18} /> New Course
                </button>
            </div>

            <div className="card-grid">
                <div className="card course-card">
                    <div className="course-thumbnail-placeholder">
                        Course Thumbnail
                    </div>
                    <div className="course-card-content">
                        <div className="course-card-meta">
                            <span className="tag">Development</span>
                            <span className="course-price">$49.99</span>
                        </div>
                        <h3 className="course-title-h3">Full Stack Web Development 2026</h3>
                        <p className="course-desc-p">Learn React, Node.js, and Modern UI Design from scratch.</p>

                        <div className="course-stats-row">
                            <div className="course-stat-inline"><Users size={16} /> 120 Students</div>
                            <div className="course-stat-inline"><Video size={16} /> 45 Lessons</div>
                        </div>

                        <div className="flex-row-gap gap-sm">
                            <button className="btn btn-secondary flex-1">Manage</button>
                            <button className="btn btn-primary flex-1">Edit Content</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherCourses;
