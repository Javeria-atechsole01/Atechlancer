import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
    Users, DollarSign, ShoppingBag, TrendingUp,
    AlertCircle, CheckCircle, Clock, Loader2,
    Briefcase, BookOpen, ShieldCheck, History,
    LayoutDashboard, ArrowUpRight
} from 'lucide-react';
import './admin.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardStats();
    }, []);

    const loadDashboardStats = async () => {
        setLoading(true);
        try {
            const data = await adminService.getDashboardStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to load dashboard stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading-state">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p>Syncing platform metrics...</p>
            </div>
        );
    }

    const modules = [
        { name: 'User Management', icon: <Users size={24} />, count: stats?.totalUsers || 0, path: 'users', color: 'blue' },
        { name: 'Verifications', icon: <ShieldCheck size={24} />, count: stats?.pendingVerifications || 0, path: 'verifications', color: 'green' },
        { name: 'Pending Reports', icon: <AlertCircle size={24} />, count: stats?.pendingReports || 0, path: 'reports', color: 'red' },
        { name: 'Withdrawals', icon: <DollarSign size={24} />, count: stats?.pendingWithdrawals || 0, path: 'payments', color: 'purple' },
    ];

    return (
        <div className="admin-page-container">
            <header className="admin-page-header">
                <div>
                    <h1>System Overview</h1>
                    <p>Live platform performance and management metrics</p>
                </div>
                <button className="admin-btn admin-btn-outline" onClick={loadDashboardStats}>
                    <Clock size={16} />
                    Refreshed: {new Date().toLocaleTimeString()}
                </button>
            </header>

            {/* Main KPI Grid */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-icon revenue">
                        <DollarSign size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Total Revenue</span>
                        <h3 className="admin-stat-value">${stats?.totalRevenue?.toLocaleString() || 0}</h3>
                        <span className="admin-stat-delta positive"><ArrowUpRight size={14} /> 12% Growth</span>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon users">
                        <Users size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Active Talents</span>
                        <h3 className="admin-stat-value">{stats?.totalUsers?.toLocaleString() || 0}</h3>
                        <span className="admin-stat-delta positive">+{stats?.newUsersThisMonth || 0} this month</span>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon orders">
                        <ShoppingBag size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Active Orders</span>
                        <h3 className="admin-stat-value">{stats?.activeOrders?.toLocaleString() || 0}</h3>
                        <span className="admin-stat-delta positive">{stats?.completedToday || 0} today</span>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon projects">
                        <Briefcase size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Total Gigs</span>
                        <h3 className="admin-stat-value">{(stats?.totalGigs + stats?.totalJobs + stats?.totalAssignments) || 0}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.2rem' }}>Platform listings</p>
                    </div>
                </div>
            </div>

            {/* Quick Management Module Grid */}
            <div className="admin-section" style={{ marginBottom: '3rem' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#243E56', marginBottom: '1.5rem' }}>Management Modules</h2>
                <div className="admin-module-grid">
                    {modules.map(module => (
                        <a key={module.name} href={`/dashboard/admin/${module.path}`} className={`admin-module-card ${module.color}`}>
                            <div className="admin-module-icon">{module.icon}</div>
                            <h3>{module.name}</h3>
                            <p>{module.count} {module.count === 1 ? 'item' : 'items'} for review</p>
                        </a>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Recent Activity Mini-List */}
                <div className="admin-card no-hover" style={{ flex: 1, minWidth: '400px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#243E56', margin: 0 }}>Administrative Trail</h2>
                        <a href="/dashboard/admin/logs" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#76A36D', textDecoration: 'none' }}>View All</a>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stats?.recentActivity?.length > 0 ? (
                            stats.recentActivity.map((log, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1rem',
                                    background: '#f8fafc',
                                    borderRadius: '12px',
                                    border: '1px solid #f1f5f9'
                                }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '8px',
                                        background: '#fff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                    }}>
                                        {log.type === 'verification' ? <ShieldCheck size={14} color="#76A36D" /> : <History size={14} color="#243E56" />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.9rem', color: '#334155', fontWeight: 500, margin: 0 }}>{log.message}</p>
                                        <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{log.time}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="admin-empty-state" style={{ padding: '2rem' }}>
                                <Clock size={32} />
                                <h3>No recent activity</h3>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Content Stats */}
                <div className="admin-card no-hover" style={{ width: '350px' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#243E56', marginBottom: '1.5rem' }}>Content Health</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { label: 'Gigs / Services', value: stats?.totalGigs, color: '#22c55e' },
                            { label: 'Job Postings', value: stats?.totalJobs, color: '#3b82f6' },
                            { label: 'Assignments', value: stats?.totalAssignments, color: '#f59e0b' },
                            { label: 'Active Courses', value: stats?.totalCourses, color: '#8b5cf6' }
                        ].map(item => (
                            <div key={item.label} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '0.75rem 0',
                                borderBottom: '1px solid #f1f5f9'
                            }}>
                                <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>{item.label}</span>
                                <strong style={{ fontSize: '1rem', color: '#243E56' }}>{item.value || 0}</strong>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2rem', padding: '1rem', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #d1fae5' }}>
                        <p style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 600, margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <TrendingUp size={14} />
                            Platform is growing healthy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
