import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
    TrendingUp, Users, DollarSign, ShoppingBag,
    Loader2
} from 'lucide-react';
import './admin.css';

const Analytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [period, setPeriod] = useState('month');

    useEffect(() => {
        loadAnalytics();
    }, [period]);

    const loadAnalytics = async () => {
        setLoading(true);
        try {
            const data = await adminService.getAnalytics(period);
            setAnalytics(data);
        } catch (error) {
            console.error('Failed to load analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading-state">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p>Synthesizing platform data...</p>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <div className="admin-page-hero">
                <h1>Platform Analytics</h1>
                <p>Insightful data visualizations and growth metrics for your ecosystem</p>
            </div>

            <div className="admin-filters-bar" style={{ justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
                <div className="admin-tab-nav">
                    <button
                        className={`admin-tab-btn ${period === 'week' ? 'active' : ''}`}
                        onClick={() => setPeriod('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`admin-tab-btn ${period === 'month' ? 'active' : ''}`}
                        onClick={() => setPeriod('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`admin-tab-btn ${period === 'year' ? 'active' : ''}`}
                        onClick={() => setPeriod('year')}
                    >
                        Year
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="admin-stats-grid">
                <div className="admin-stat-card">
                    <div className="admin-stat-icon users">
                        <Users size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">New Talents</span>
                        <h3 className="admin-stat-value">{analytics?.newUsers?.toLocaleString() || 0}</h3>
                        <span className={`admin-stat-delta ${analytics?.userGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {analytics?.userGrowth >= 0 ? '+' : ''}{analytics?.userGrowth || 0}% <span style={{ fontWeight: 500, opacity: 0.7 }}>vs last {period}</span>
                        </span>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon revenue">
                        <DollarSign size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Gross Revenue</span>
                        <h3 className="admin-stat-value">${analytics?.revenue?.toLocaleString() || 0}</h3>
                        <span className={`admin-stat-delta ${analytics?.revenueGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {analytics?.revenueGrowth >= 0 ? '+' : ''}{analytics?.revenueGrowth || 0}% <span style={{ fontWeight: 500, opacity: 0.7 }}>vs last {period}</span>
                        </span>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon orders">
                        <ShoppingBag size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Total Transactions</span>
                        <h3 className="admin-stat-value">{analytics?.orders?.toLocaleString() || 0}</h3>
                        <span className={`admin-stat-delta ${analytics?.orderGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {analytics?.orderGrowth >= 0 ? '+' : ''}{analytics?.orderGrowth || 0}% <span style={{ fontWeight: 500, opacity: 0.7 }}>vs last {period}</span>
                        </span>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="admin-stat-icon projects">
                        <TrendingUp size={28} />
                    </div>
                    <div className="admin-stat-info">
                        <span className="admin-stat-label">Avg Order Value</span>
                        <h3 className="admin-stat-value">${analytics?.avgOrderValue?.toFixed(2) || '0.00'}</h3>
                        <span className={`admin-stat-delta ${analytics?.aovGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {analytics?.aovGrowth >= 0 ? '+' : ''}{analytics?.aovGrowth || 0}% <span style={{ fontWeight: 500, opacity: 0.7 }}>vs last {period}</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* User Demographics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div className="admin-card">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#243E56', marginBottom: '1.5rem' }}>User Demographics</h2>
                    <div className="demo-list">
                        {analytics?.usersByRole?.map((item) => (
                            <div key={item.role} className="demo-item" style={{ marginBottom: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span className="demo-label text-capitalize" style={{ fontWeight: 600, color: '#475569' }}>{item.role}</span>
                                    <span className="demo-value" style={{ fontWeight: 700, color: '#243E56' }}>{item.count}</span>
                                </div>
                                <div className="demo-bar" style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div
                                        className="demo-bar-fill"
                                        style={{
                                            width: `${item.percentage}%`,
                                            height: '100%',
                                            background: 'linear-gradient(90deg, var(--admin-primary) 0%, var(--accent-500) 100%)',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="admin-card">
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#243E56', marginBottom: '1.5rem' }}>Top Categories</h2>
                    <div className="demo-list">
                        {analytics?.topCategories?.map((item) => (
                            <div key={item.category} className="demo-item" style={{ marginBottom: '1.25rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                    <span className="demo-label" style={{ fontWeight: 600, color: '#475569' }}>{item.category}</span>
                                    <span className="demo-value" style={{ fontWeight: 700, color: '#243E56' }}>{item.count}</span>
                                </div>
                                <div className="demo-bar" style={{ height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div
                                        className="demo-bar-fill"
                                        style={{
                                            width: `${item.percentage}%`,
                                            height: '100%',
                                            background: 'linear-gradient(90deg, #3b82f6 0%, #60a5fa 100%)',
                                            borderRadius: '4px'
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="admin-card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#243E56', marginBottom: '2rem' }}>Revenue Stream Analysis</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { label: 'Gigs / Services', amount: analytics?.revenueByType?.gigs, percentage: analytics?.revenueByType?.gigsPercentage, color: '#10b981' },
                        { label: 'Academic Assignments', amount: analytics?.revenueByType?.assignments, percentage: analytics?.revenueByType?.assignmentsPercentage, color: '#f59e0b' },
                        { label: 'Skill Courses', amount: analytics?.revenueByType?.courses, percentage: analytics?.revenueByType?.coursesPercentage, color: '#8b5cf6' },
                        { label: 'Premium Jobs', amount: analytics?.revenueByType?.jobs, percentage: analytics?.revenueByType?.jobsPercentage, color: '#3b82f6' }
                    ].map((item) => (
                        <div key={item.label} style={{
                            padding: '1.5rem',
                            background: '#f8fafc',
                            borderRadius: '16px',
                            border: '1px solid #f1f5f9',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: item.color }} />
                            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#243E56', margin: '0.5rem 0' }}>${item.amount?.toLocaleString() || 0}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ flex: 1, height: '4px', background: '#e2e8f0', borderRadius: '2px' }}>
                                    <div style={{ width: `${item.percentage}%`, height: '100%', background: item.color, borderRadius: '2px' }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: item.color }}>{item.percentage || 0}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
