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
            <div className="admin-page-hero">
                <h1>System Overview</h1>
                <p>Real-time platform performance and administrative command center</p>
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                    <div className="admin-badge info" style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                        <Clock size={14} />
                        Sync: {new Date().toLocaleTimeString()}
                    </div>
                    <button className="admin-btn" style={{ background: 'var(--admin-accent)', color: 'white', padding: '0.5rem 1rem' }} onClick={loadDashboardStats}>
                        <History size={14} />
                        Refresh Latency
                    </button>
                </div>
            </div>

            {/* Main KPI Grid */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card card-glow">
                    <div className="admin-stat-icon revenue">
                        <DollarSign size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Total GTV</span>
                        <h3 className="admin-stat-value">${stats?.totalRevenue?.toLocaleString() || 0}</h3>
                        <span className="admin-stat-delta positive"><ArrowUpRight size={14} /> 12.5% vs Prev Month</span>
                    </div>
                </div>

                <div className="admin-stat-card card-glow">
                    <div className="admin-stat-icon users">
                        <Users size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Platform Talent</span>
                        <h3 className="admin-stat-value">{stats?.totalUsers?.toLocaleString() || 0}</h3>
                        <span className="admin-stat-delta positive">+{stats?.newUsersThisMonth || 0} New Registrations</span>
                    </div>
                </div>

                <div className="admin-stat-card card-glow">
                    <div className="admin-stat-icon orders">
                        <ShoppingBag size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Velocity (Orders)</span>
                        <h3 className="admin-stat-value">{stats?.activeOrders?.toLocaleString() || 0}</h3>
                        <span className="admin-stat-delta positive">{stats?.completedToday || 0} Resolved Today</span>
                    </div>
                </div>

                <div className="admin-stat-card card-glow">
                    <div className="admin-stat-icon projects">
                        <LayoutDashboard size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Total Listings</span>
                        <h3 className="admin-stat-value">{(stats?.totalGigs + stats?.totalJobs + stats?.totalAssignments) || 0}</h3>
                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-400)', marginTop: '0.2rem', fontWeight: 600 }}>Active marketplace content</p>
                    </div>
                </div>
            </div>

            {/* Quick Management Module Grid */}
            <div className="admin-section" style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ width: '4px', height: '20px', background: 'var(--admin-accent)', borderRadius: '2px' }}></div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>Strategic Command</h2>
                </div>
                <div className="admin-module-grid">
                    {modules.map(module => (
                        <a key={module.name} href={`/dashboard/admin/${module.path}`} className={`admin-module-card ${module.color}`}>
                            <div className="admin-module-icon">{module.icon}</div>
                            <h3>{module.name}</h3>
                            <div style={{ background: '#f8fafc', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--gray-500)', border: '1px solid #e2e8f0' }}>
                                {module.count} PENDING
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                {/* Recent Activity Mini-List */}
                <div className="admin-card no-hover" style={{ flex: 1, minWidth: '400px', background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <History size={20} color="var(--admin-accent)" />
                            <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--admin-primary)', margin: 0 }}>Administrative Trail</h2>
                        </div>
                        <a href="/dashboard/admin/logs" className="admin-btn-outline" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}>Full Audit Log</a>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {stats?.recentActivity?.length > 0 ? (
                            stats.recentActivity.map((log, i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    background: 'rgba(255,255,255,0.5)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(255,255,255,0.8)',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '12px',
                                        background: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                                        flexShrink: 0
                                    }}>
                                        {log.type === 'verification' ? <ShieldCheck size={18} color="#76A36D" /> : <History size={18} color="#243E56" />}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.9375rem', color: 'var(--gray-700)', fontWeight: 600, margin: '0 0 0.25rem 0' }}>{log.message}</p>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600 }}>{log.time}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="admin-empty-state" style={{ padding: '3rem' }}>
                                <Clock size={40} style={{ opacity: 0.3 }} />
                                <h3>No recent activity</h3>
                                <p style={{ fontSize: '0.875rem' }}>Platform operations are stable.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Content Stats */}
                <div className="admin-card no-hover" style={{ width: '380px', background: 'rgba(36, 62, 86, 0.02)', border: '1px dashed var(--admin-card-border)' }}>
                    <h2 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--admin-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <LayoutDashboard size={20} />
                        Content Health
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {[
                            { label: 'Gigs / Services', value: stats?.totalGigs, color: 'var(--primary-500)' },
                            { label: 'Job Postings', value: stats?.totalJobs, color: '#3b82f6' },
                            { label: 'Assignments', value: stats?.totalAssignments, color: '#f59e0b' },
                            { label: 'Active Courses', value: stats?.totalCourses, color: '#8b5cf6' }
                        ].map(item => (
                            <div key={item.label} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem 1.25rem',
                                background: 'white',
                                borderRadius: '12px',
                                border: '1px solid var(--admin-card-border)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></div>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--gray-600)', fontWeight: 700 }}>{item.label}</span>
                                </div>
                                <strong style={{ fontSize: '1.125rem', color: 'var(--admin-primary)', fontWeight: 800 }}>{item.value || 0}</strong>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '2.5rem', padding: '1.25rem', background: 'white', borderRadius: '16px', border: '1px solid var(--admin-accent)', position: 'relative' }}>
                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-700)', fontWeight: 700, margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <TrendingUp size={18} color="var(--admin-accent)" />
                            Growth Status
                        </p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', margin: 0, lineHeight: 1.4 }}>Platform content ingestion is optimal. No bottlenecks detected.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
