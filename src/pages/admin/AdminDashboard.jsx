import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
    Users, DollarSign, ShoppingBag, TrendingUp,
    AlertCircle, CheckCircle, Clock, Loader2
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
            <div className="admin-loading">
                <Loader2 className="animate-spin" size={48} />
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <p>Platform overview and management</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card primary">
                    <div className="stat-icon">
                        <Users size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total Users</span>
                        <h3 className="stat-value">{stats?.totalUsers?.toLocaleString() || 0}</h3>
                        <span className="stat-change positive">
                            +{stats?.newUsersThisMonth || 0} this month
                        </span>
                    </div>
                </div>

                <div className="stat-card success">
                    <div className="stat-icon">
                        <DollarSign size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Total Revenue</span>
                        <h3 className="stat-value">${stats?.totalRevenue?.toLocaleString() || 0}</h3>
                        <span className="stat-change positive">
                            +{stats?.revenueGrowth || 0}% vs last month
                        </span>
                    </div>
                </div>

                <div className="stat-card info">
                    <div className="stat-icon">
                        <ShoppingBag size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Active Orders</span>
                        <h3 className="stat-value">{stats?.activeOrders?.toLocaleString() || 0}</h3>
                        <span className="stat-change">
                            {stats?.completedToday || 0} completed today
                        </span>
                    </div>
                </div>

                <div className="stat-card warning">
                    <div className="stat-icon">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-content">
                        <span className="stat-label">Platform Growth</span>
                        <h3 className="stat-value">{stats?.growthRate || 0}%</h3>
                        <span className="stat-change positive">
                            Month over month
                        </span>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="actions-grid">
                    <a href="/admin/users" className="action-card">
                        <Users size={32} />
                        <h3>Manage Users</h3>
                        <p>View and manage all platform users</p>
                    </a>

                    <a href="/admin/verifications" className="action-card">
                        <CheckCircle size={32} />
                        <h3>Verifications</h3>
                        <p>{stats?.pendingVerifications || 0} pending requests</p>
                    </a>

                    <a href="/admin/reports" className="action-card">
                        <AlertCircle size={32} />
                        <h3>Content Reports</h3>
                        <p>{stats?.pendingReports || 0} reports to review</p>
                    </a>

                    <a href="/admin/analytics" className="action-card">
                        <TrendingUp size={32} />
                        <h3>Analytics</h3>
                        <p>View detailed platform analytics</p>
                    </a>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                    {stats?.recentActivity?.length > 0 ? (
                        stats.recentActivity.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className="activity-icon">
                                    {activity.type === 'user' && <Users size={18} />}
                                    {activity.type === 'order' && <ShoppingBag size={18} />}
                                    {activity.type === 'report' && <AlertCircle size={18} />}
                                    {activity.type === 'verification' && <CheckCircle size={18} />}
                                </div>
                                <div className="activity-content">
                                    <p className="activity-text">{activity.message}</p>
                                    <span className="activity-time">{activity.time}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="activity-empty">
                            <Clock size={48} />
                            <p>No recent activity</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
