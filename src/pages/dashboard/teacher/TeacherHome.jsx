import React from 'react';

const TeacherHome = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Teacher Dashboard</h1>
                    <p className="page-description">Track your courses and student progress.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    + Upload Course
                </button>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Active Courses</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>2</div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Total Students</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>145</div>
                </div>
            </div>
        </div>
    );
};

export default TeacherHome;
