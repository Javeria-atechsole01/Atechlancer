import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import {
    DollarSign, ArrowUpRight, ArrowDownLeft,
    CheckCircle, XCircle, Clock, Loader2, AlertCircle
} from 'lucide-react';
import './../../admin/admin.css';

const FinancialManagement = () => {
    const [stats, setStats] = useState(null);
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFinancialData();
    }, []);

    const loadFinancialData = async () => {
        setLoading(true);
        try {
            const [dashboardStats, withdrawalRequests] = await Promise.all([
                adminService.getDashboardStats(),
                adminService.getWithdrawalRequests()
            ]);
            setStats(dashboardStats);
            setWithdrawals(withdrawalRequests);
        } catch (error) {
            console.error('Failed to load financial data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleWithdrawalAction = async (id, status, reason = '') => {
        try {
            await adminService.updateWithdrawalStatus(id, status, reason);
            setWithdrawals(withdrawals.filter(w => w._id !== id));
            // Reload stats to reflect new balance
            const newStats = await adminService.getDashboardStats();
            setStats(newStats);
        } catch (error) {
            console.error('Failed to update withdrawal status:', error);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading-state">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p>Calculating platform financials...</p>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <div>
                    <h1>Financial Oversight</h1>
                    <p>Manage platform revenue, payouts, and life-time commissions</p>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-icon revenue">
                        <DollarSign size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Total Revenue</span>
                        <h3 className="admin-stat-value">${stats?.totalRevenue?.toLocaleString() || '0'}</h3>
                        <span className="admin-stat-delta positive"><ArrowUpRight size={14} /> 15% Growth</span>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon orders">
                        <Clock size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Pending Payouts</span>
                        <h3 className="admin-stat-value">${withdrawals.reduce((sum, w) => sum + Math.abs(w.amount), 0).toLocaleString()}</h3>
                        <span className="admin-stat-delta warning">{withdrawals.length} active requests</span>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon projects">
                        <ArrowUpRight size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Platform Profit (10%)</span>
                        <h3 className="admin-stat-value">${((stats?.totalRevenue || 0) * 0.1).toLocaleString()}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>Net commissions</p>
                    </div>
                </div>
            </div>

            {/* Withdrawal Requests */}
            <div className="admin-section" style={{ marginTop: '2rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#243E56', marginBottom: '1.5rem' }}>Pending Withdrawal Requests</h2>

                <div className="admin-table-container">
                    {withdrawals.length > 0 ? (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Payee Details</th>
                                    <th>Amount</th>
                                    <th>Payout Method</th>
                                    <th>Request Date</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawals.map(req => (
                                    <tr key={req._id}>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{req.userId?.name}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{req.userId?.email}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ fontWeight: 800, color: 'var(--admin-primary)', fontSize: '1.1rem' }}>
                                                ${Math.abs(req.amount).toFixed(2)}
                                            </div>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span className="admin-badge info" style={{ alignSelf: 'flex-start', marginBottom: '4px' }}>
                                                    {req.metadata?.withdrawalMethod || 'Manual'}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                    {typeof req.metadata?.payoutDetails === 'object' ? JSON.stringify(req.metadata?.payoutDetails) : req.metadata?.payoutDetails}
                                                </span>
                                            </div>
                                        </td>
                                        <td>{new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    className="admin-btn"
                                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', background: '#ecfdf5', color: '#059669', border: '1px solid #10b981' }}
                                                    onClick={() => handleWithdrawalAction(req._id, 'completed')}
                                                >
                                                    <CheckCircle size={14} style={{ marginRight: '4px' }} />
                                                    Approve
                                                </button>
                                                <button
                                                    className="admin-btn admin-btn-outline"
                                                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem', color: '#dc2626', borderColor: '#f87171' }}
                                                    onClick={() => {
                                                        const reason = window.prompt('Reason for rejection:');
                                                        if (reason) handleWithdrawalAction(req._id, 'failed', reason);
                                                    }}
                                                >
                                                    <XCircle size={14} style={{ marginRight: '4px' }} />
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="admin-empty-state" style={{ padding: '4rem 2rem' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                                <CheckCircle size={40} color="#10b981" />
                            </div>
                            <h3>All Caught Up!</h3>
                            <p>There are no pending withdrawal requests to review at this time.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FinancialManagement;
