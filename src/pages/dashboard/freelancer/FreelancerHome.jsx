import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';

const FreelancerHome = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Freelancer Dashboard</h1>
                    <p className="page-description">Manage your gigs and orders.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    + Create New Gig
                </button>
            </div>

            {/* KPI Cards */}
            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '2rem' }}>
                <StatsCard
                    title="Active Orders"
                    value="5"
                    subtext="In progress"
                />

                <StatsCard
                    title="Monthly Earnings"
                    value="$850.00"
                    subtext="+15% from last month"
                    highlightColor="var(--accent-500)"
                />

                <StatsCard
                    title="Rating"
                    value="4.9"
                    subtext="Based on 24 reviews"
                    highlightColor="#eab308"
                />
            </div>
        </div>
    );
};

export default FreelancerHome;
