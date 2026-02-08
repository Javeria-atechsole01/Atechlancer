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
            <div className="panel-loading">
                <Loader2 className="animate-spin" size={48} />
                <p>Loading analytics...</p>
            </div>
        );
    }

    return (
        <div className="analytics-page">
            <div className="page-header">
                <div>
                    <h1>Platform Analytics</h1>
                    <p>Detailed insights and metrics</p>
                </div>
                <div className="period-selector">
                    <button
                        className={`period-btn ${period === 'week' ? 'active' : ''}`}
                        onClick={() => setPeriod('week')}
                    >
                        Week
                    </button>
                    <button
                        className={`period-btn ${period === 'month' ? 'active' : ''}`}
                        onClick={() => setPeriod('month')}
                    >
                        Month
                    </button>
                    <button
                        className={`period-btn ${period === 'year' ? 'active' : ''}`}
                        onClick={() => setPeriod('year')}
                    >
                        Year
                    </button>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="metrics-grid">
                <div className="metric-card">
                    <div className="metric-icon users">
                        <Users size={24} />
                    </div>
                    <div className="metric-content">
                        <span className="metric-label">New Users</span>
                        <h3 className="metric-value">{analytics?.newUsers?.toLocaleString() || 0}</h3>
                        <span className={`metric-change ${analytics?.userGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {analytics?.userGrowth >= 0 ? '+' : ''}{analytics?.userGrowth || 0}% vs last {period}
                        </span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon revenue">
                        <DollarSign size={24} />
                    </div>
                    <div className="metric-content">
                        <span className="metric-label">Revenue</span>
                        <h3 className="metric-value">${analytics?.revenue?.toLocaleString() || 0}</h3>
                        <span className={`metric-change ${analytics?.revenueGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {analytics?.revenueGrowth >= 0 ? '+' : ''}{analytics?.revenueGrowth || 0}% vs last {period}
                        </span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon orders">
                        <ShoppingBag size={24} />
                    </div>
                    <div className="metric-content">
                        <span className="metric-label">Orders</span>
                        <h3 className="metric-value">{analytics?.orders?.toLocaleString() || 0}</h3>
                        <span className={`metric-change ${analytics?.orderGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {analytics?.orderGrowth >= 0 ? '+' : ''}{analytics?.orderGrowth || 0}% vs last {period}
                        </span>
                    </div>
                </div>

                <div className="metric-card">
                    <div className="metric-icon growth">
                        <TrendingUp size={24} />
                    </div>
                    <div className="metric-content">
                        <span className="metric-label">Avg Order Value</span>
                        <h3 className="metric-value">${analytics?.avgOrderValue?.toFixed(2) || '0.00'}</h3>
                        <span className={`metric-change ${analytics?.aovGrowth >= 0 ? 'positive' : 'negative'}`}>
                            {analytics?.aovGrowth >= 0 ? '+' : ''}{analytics?.aovGrowth || 0}% vs last {period}
                        </span>
                    </div>
                </div>
            </div>

            {/* User Demographics */}
            <div className="analytics-section">
                <h2>User Demographics</h2>
                <div className="demographics-grid">
                    <div className="demo-card">
                        <h3>By Role</h3>
                        <div className="demo-list">
                            {analytics?.usersByRole?.map((item) => (
                                <div key={item.role} className="demo-item">
                                    <span className="demo-label">{item.role}</span>
                                    <div className="demo-bar">
                                        <div
                                            className="demo-bar-fill"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="demo-value">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="demo-card">
                        <h3>Top Categories</h3>
                        <div className="demo-list">
                            {analytics?.topCategories?.map((item) => (
                                <div key={item.category} className="demo-item">
                                    <span className="demo-label">{item.category}</span>
                                    <div className="demo-bar">
                                        <div
                                            className="demo-bar-fill"
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                    <span className="demo-value">{item.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="analytics-section">
                <h2>Revenue Breakdown</h2>
                <div className="revenue-cards">
                    <div className="revenue-card">
                        <span className="revenue-label">Gigs</span>
                        <h3 className="revenue-amount">${analytics?.revenueByType?.gigs?.toLocaleString() || 0}</h3>
                        <span className="revenue-percentage">
                            {analytics?.revenueByType?.gigsPercentage || 0}% of total
                        </span>
                    </div>
                    <div className="revenue-card">
                        <span className="revenue-label">Assignments</span>
                        <h3 className="revenue-amount">${analytics?.revenueByType?.assignments?.toLocaleString() || 0}</h3>
                        <span className="revenue-percentage">
                            {analytics?.revenueByType?.assignmentsPercentage || 0}% of total
                        </span>
                    </div>
                    <div className="revenue-card">
                        <span className="revenue-label">Courses</span>
                        <h3 className="revenue-amount">${analytics?.revenueByType?.courses?.toLocaleString() || 0}</h3>
                        <span className="revenue-percentage">
                            {analytics?.revenueByType?.coursesPercentage || 0}% of total
                        </span>
                    </div>
                    <div className="revenue-card">
                        <span className="revenue-label">Jobs</span>
                        <h3 className="revenue-amount">${analytics?.revenueByType?.jobs?.toLocaleString() || 0}</h3>
                        <span className="revenue-percentage">
                            {analytics?.revenueByType?.jobsPercentage || 0}% of total
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
