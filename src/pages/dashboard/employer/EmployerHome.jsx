import React from 'react';

const EmployerHome = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Employer Dashboard</h1>
                    <p className="page-description">Manage job postings and contracts.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    + Post a Job
                </button>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Active Jobs</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>4</div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Shortlisted Candidates</span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>12</div>
                </div>
            </div>
        </div>
    );
};

export default EmployerHome;
