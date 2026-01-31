import React from 'react';
import { DollarSign, TrendingUp, Download, Clock } from 'lucide-react';

const FreelancerEarnings = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Earnings</h1>
                    <p className="page-description">Track your revenue and withdrawals.</p>
                </div>
                <button className="btn btn-outline flex-row-gap gap-sm">
                    <Download size={18} /> Export Report
                </button>
            </div>

            {/* KPI Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon bg-green-100 text-green-600">
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <div className="stat-value">$2,450.00</div>
                        <div className="stat-label">Net Income</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon bg-orange-100 text-orange-600">
                        <Clock size={24} />
                    </div>
                    <div>
                        <div className="stat-value text-orange-600">$150.00</div>
                        <div className="stat-label">Pending Clearance</div>
                    </div>
                </div>
                <div className="stat-card flex-col" style={{ alignItems: 'flex-start', gap: '1rem' }}>
                    <div className="flex-row-between w-full">
                        <div>
                            <div className="stat-value">$850.00</div>
                            <div className="stat-label">Available</div>
                        </div>
                        <div className="stat-icon bg-primary-100 text-primary-600" style={{ width: '2.5rem', height: '2.5rem' }}>
                            <TrendingUp size={20} />
                        </div>
                    </div>
                    <button className="btn btn-primary w-full">Withdraw Now</button>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="card">
                <h3 className="card-title mb-lg">Transaction History</h3>
                <div className="table-responsive">
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--gray-200)', textAlign: 'left' }}>
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
                                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 'bold', color: 'var(--green-600)' }}>+$250.00</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FreelancerEarnings;
