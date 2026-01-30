import React from 'react';
import { DollarSign, TrendingUp, Download } from 'lucide-react';

const FreelancerEarnings = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Earnings</h1>
                    <p className="page-description">Track your revenue and withdrawals.</p>
                </div>
                <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Download size={18} /> Export Report
                </button>
            </div>

            {/* KPI Cards */}
            <div className="dashboard-stats-grid">
                <div className="card stats-card">
                    <div className="card-header">
                        <span className="card-title">Net Income</span>
                        <div className="card-icon" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent-text)' }}><DollarSign size={20} /></div>
                    </div>
                    <div className="card-value">$2,450.00</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>Total earned this year</p>
                </div>
                <div className="card stats-card">
                    <div className="card-header">
                        <span className="card-title">Pending Clearance</span>
                        <div className="card-icon" style={{ backgroundColor: '#fff7ed', color: '#c2410c' }}><ClockIcon /></div>
                    </div>
                    <div className="card-value" style={{ color: '#c2410c' }}>$150.00</div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>Available in 7 days</p>
                </div>
                <div className="card stats-card">
                    <div className="card-header">
                        <span className="card-title">Available for Withdrawal</span>
                        <div className="card-icon" style={{ backgroundColor: 'var(--primary-50)', color: 'var(--brand-navy)' }}><TrendingUp size={20} /></div>
                    </div>
                    <div className="card-value">$850.00</div>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Withdraw Now</button>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="card" style={{ marginTop: '2rem' }}>
                <h3 className="card-title" style={{ marginBottom: '1rem' }}>Transaction History</h3>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                            <th style={{ padding: '1rem' }}>Date</th>
                            <th style={{ padding: '1rem' }}>For</th>
                            <th style={{ padding: '1rem' }}>Order ID</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map(i => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>Jan {20 - i}, 2026</td>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>React Dashboard Project</td>
                                <td style={{ padding: '1rem', color: 'var(--gray-500)' }}>#ORD-89{i}2</td>
                                <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', color: 'var(--accent-500)' }}>+$250.00</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ClockIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
)

export default FreelancerEarnings;
