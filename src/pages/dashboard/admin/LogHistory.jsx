import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import {
    History, Clock, User, HardDrive,
    ArrowRight, Loader2, Filter
} from 'lucide-react';
import './../../admin/admin.css';

const LogHistory = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLogs();
    }, []);

    const loadLogs = async () => {
        setLoading(true);
        try {
            const data = await adminService.getAdminLogs();
            setLogs(data);
        } catch (error) {
            console.error('Failed to load logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const getActionColor = (action) => {
        const a = action.toLowerCase();
        if (a.includes('delete') || a.includes('ban')) return 'text-error';
        if (a.includes('approve') || a.includes('active')) return 'text-success';
        if (a.includes('update')) return 'text-warning';
        return 'text-accent';
    };

    if (loading) {
        return (
            <div className="admin-loading-state">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p>Retrieving system trail...</p>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <div className="admin-page-hero">
                <h1>Platform Audit Trail</h1>
                <p>Immutable record of all administrative actions and system-level events</p>
            </div>

            {/* Filter Bar */}
            <div className="admin-filters-bar">
                <div className="admin-search-box">
                    <History size={20} />
                    <input type="text" placeholder="Search logs by action, user, or entity..." />
                </div>
                <select className="admin-select">
                    <option>All Event Types</option>
                    <option>User Actions</option>
                    <option>System Events</option>
                    <option>Financial Logs</option>
                </select>
                <button className="admin-btn admin-btn-outline">
                    <Filter size={18} />
                    Advanced Filters
                </button>
            </div>

            {/* Log List Area */}
            <div className="admin-table-container card-glow" style={{ border: 'none', boxShadow: 'var(--admin-card-shadow)' }}>
                {logs.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Operative</th>
                                <th>Interaction / Action</th>
                                <th>Target Entity</th>
                                <th style={{ textAlign: 'right' }}>Audit Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => (
                                <tr key={log._id}>
                                    <td style={{ whiteSpace: 'nowrap' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Clock size={14} color="var(--gray-400)" />
                                            <span style={{ fontWeight: 700, color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                                                {new Date(log.createdAt).toLocaleString()}
                                            </span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <div style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '8px',
                                                background: 'var(--admin-primary)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 800,
                                                fontSize: '0.8rem'
                                            }}>
                                                {log.adminId?.name?.charAt(0) || 'S'}
                                            </div>
                                            <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{log.adminId?.name || 'System'}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--admin-accent)' }}></div>
                                            <span style={{ fontWeight: 700, color: 'var(--gray-700)' }}>{log.action}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span style={{
                                            fontSize: '0.8rem',
                                            background: '#f1f5f9',
                                            padding: '0.4rem 0.75rem',
                                            borderRadius: '8px',
                                            fontWeight: 800,
                                            color: 'var(--gray-600)',
                                            border: '1px solid #e2e8f0'
                                        }}>
                                            {log.targetType?.toUpperCase()}: {log.targetId?.slice(-8).toUpperCase() || 'CORE'}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <span className="admin-badge success" style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem' }}>
                                            VERIFIED
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty-state" style={{ padding: '8rem 2rem' }}>
                        <div className="empty-icon-wrapper">
                            <History size={48} />
                        </div>
                        <h3>Nexus records empty</h3>
                        <p>No log entries found for the selected period.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogHistory;
