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
            <header className="admin-page-header">
                <div>
                    <h1>System Logs</h1>
                    <p>Track every administrative action performed on the platform</p>
                </div>
            </header>

            <div className="admin-table-container">
                {logs.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', padding: '1rem' }}>
                        {logs.map(log => (
                            <div key={log._id} className="admin-card no-hover" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    background: 'var(--admin-bg)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <Clock size={20} color="var(--primary-500)" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                            <span style={{ fontWeight: 800, color: 'var(--admin-primary)' }}>{log.adminId?.name || 'System'}</span>
                                            <span className={`admin-badge ${getActionColor(log.action) === 'text-success' ? 'success' : getActionColor(log.action) === 'text-error' ? 'danger' : 'info'}`}>
                                                {log.action}
                                            </span>
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)', fontWeight: 600 }}>
                                            {new Date(log.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--gray-600)', fontSize: '0.9rem' }}>
                                        <span style={{ opacity: 0.6 }}>Modified</span>
                                        <strong style={{ color: 'var(--admin-primary)' }}>{log.targetType}</strong>
                                        <code style={{ background: 'var(--admin-bg)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.75rem' }}>{log.targetId}</code>
                                    </div>
                                    {log.details && Object.keys(log.details).length > 0 && (
                                        <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: 'var(--admin-bg)', borderRadius: '8px', border: '1px solid var(--admin-card-border)' }}>
                                            <pre style={{ margin: 0, fontSize: '0.75rem', color: 'var(--gray-600)', overflowX: 'auto' }}>
                                                {JSON.stringify(log.details, null, 2)}
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="admin-empty-state">
                        <History size={48} />
                        <h3>Clean Trail</h3>
                        <p>No administrative activity has been recorded yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LogHistory;
