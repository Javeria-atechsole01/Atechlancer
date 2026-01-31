import React, { useState } from 'react';
import { DollarSign, TrendingUp, CreditCard, Download, Calendar } from 'lucide-react';

const TeacherEarnings = () => {
    // Mock Data
    const earnings = {
        total: 3500,
        pending: 450,
        available: 3050,
        history: [
            { id: 1, date: '2025-01-28', description: 'Course Sale: Intro to Python', amount: 45.00, status: 'Cleared' },
            { id: 2, date: '2025-01-27', description: 'Mentoring Session (1 hour)', amount: 60.00, status: 'Cleared' },
            { id: 3, date: '2025-01-25', description: 'Course Sale: Advanced Algorithms', amount: 55.00, status: 'Cleared' },
            { id: 4, date: '2025-01-20', description: 'Consultation Fee', amount: 100.00, status: 'Pending' },
        ]
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Earnings & Payouts</h1>
                    <p className="page-description">Track your revenue from courses and mentoring sessions.</p>
                </div>
                <button className="btn btn-outline flex-row-gap gap-sm">
                    <Download size={16} /> Export Report
                </button>
            </div>

            {/* Income Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon bg-green-100 text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <div className="stat-value">${earnings.total.toLocaleString()}</div>
                        <div className="stat-label">Total Earnings</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon bg-blue-100 text-blue-600">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <div className="stat-value">${earnings.available.toLocaleString()}</div>
                        <div className="stat-label">Available for Withdrawal</div>
                    </div>
                    <button className="btn btn-sm btn-primary" style={{ marginLeft: 'auto' }}>Withdraw</button>
                </div>
                <div className="stat-card">
                    <div className="stat-icon bg-orange-100 text-orange-600">
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div className="stat-value">${earnings.pending.toLocaleString()}</div>
                        <div className="stat-label">Pending Clearance</div>
                    </div>
                </div>
            </div>

            {/* Analytics (Placeholder Graph) */}
            <div className="card mb-xl">
                <div className="flex-row-between mb-lg">
                    <h3 className="card-title">Revenue Analytics</h3>
                    <select className="search-input" style={{ width: 'auto' }}>
                        <option>Last 30 Days</option>
                        <option>Last 3 Months</option>
                        <option>This Year</option>
                    </select>
                </div>
                <div style={{
                    height: '300px',
                    background: 'linear-gradient(180deg, rgba(20, 184, 166, 0.1) 0%, rgba(20, 184, 166, 0) 100%)',
                    borderRadius: '8px',
                    borderBottom: '2px solid var(--primary-500)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-600)'
                }}>
                    [Revenue Chart Placeholder]
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="card">
                <h3 className="card-title mb-md">Transaction History</h3>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--gray-200)', textAlign: 'left' }}>
                                <th style={{ padding: '1rem' }}>Date</th>
                                <th style={{ padding: '1rem' }}>Description</th>
                                <th style={{ padding: '1rem' }}>Status</th>
                                <th style={{ padding: '1rem', textAlign: 'right' }}>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {earnings.history.map(tx => (
                                <tr key={tx.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                    <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>
                                        <div className="flex-row-gap gap-sm">
                                            <Calendar size={14} /> {tx.date}
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem', fontWeight: '500' }}>{tx.description}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <span className={`tag ${tx.status === 'Cleared' ? 'tag-green' : 'tag-orange'}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', color: 'var(--green-600)' }}>
                                        +${tx.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TeacherEarnings;
