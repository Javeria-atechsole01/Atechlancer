import React from 'react';
import StatsCard from '../../../components/dashboard/StatsCard';
import { CheckCircle, Plus } from 'lucide-react';
import './student.css';

const StudentHome = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Welcome back, Student!</h1>
                    <p className="page-description">Here is your daily activity overview.</p>
                </div>
                <button className="btn btn-primary flex-row-gap gap-sm">
                    <Plus size={18} /> New Project
                </button>
            </div>

            {/* KPI Cards */}
            <div className="dashboard-grid">
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

                {/* Verification Card */}
                <div className="card">
                    <div className="card-header">
                        <span className="card-title">Verification Status</span>
                    </div>
                    <div className="verification-status">
                        <CheckCircle size={20} />
                        <span>Verified Student</span>
                    </div>
                    <p className="verification-meta">Access to all features</p>
                </div>
            </div>

            {/* Recent Activity Section */}
            <h2 className="section-title-h2">Recent Assignments</h2>
            <div className="card">
                <div className="text-center py-xl">
                    <p className="text-muted italic">No recent activity to show.</p>
                </div>
            </div>
        </div>
    );
};

export default StudentHome;
