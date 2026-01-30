import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { CheckCircle } from 'lucide-react';

const StudentHome = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Welcome back, Student!</h1>
                    <p className="page-description">Here is your daily activity overview.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    + New Project
                </button>
            </div>

            {/* KPI Cards */}
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
                <StatsCard
                    title="Active Assignments"
                    value="3"
                    subtext="2 due this week"
                />

                <StatsCard
                    title="Pending Submissions"
                    value="1"
                    subtext="Awaiting review"
                    highlightColor="#eab308"
                />

                <StatsCard
                    title="Wallet Balance"
                    value="$120.00"
                    subtext="Available for withdrawal"
                    highlightColor="var(--accent-500)"
                />

                {/* Verification Card (Custom for now or generic) */}
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Verification Status</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                        <CheckCircle size={20} color="var(--accent-500)" />
                        <span style={{ fontWeight: '600', color: 'var(--accent-500)' }}>Verified Student</span>
                    </div>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.5rem' }}>Access to all features</p>
                </div>
            </div>

            {/* Recent Activity Section */}
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--brand-navy)', marginBottom: '1rem' }}>Recent Assignments</h2>
            <div className="card">
                <p style={{ color: 'var(--gray-500)', padding: '1rem', textAlign: 'center' }}>No recent activity to show.</p>
            </div>
        </div>
    );
};

export default StudentHome;
