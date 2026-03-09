import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import {
    CheckCircle, XCircle, FileText, Clock,
    ExternalLink, Loader2, AlertCircle, Filter, ShieldCheck
} from 'lucide-react';
import './../../admin/admin.css';

const AdminVerifications = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('pending');

    useEffect(() => {
        loadVerifications();
    }, [statusFilter]);

    const loadVerifications = async () => {
        setLoading(true);
        try {
            const data = await adminService.getVerificationRequests(statusFilter);
            setRequests(data.requests || []);
        } catch (error) {
            console.error('Failed to load verifications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, status) => {
        const notes = window.prompt(`Notes for ${status}:`);
        if (notes === null) return;

        try {
            await adminService.updateVerificationStatus(id, status, notes);
            setRequests(requests.filter(r => r._id !== id));
        } catch (error) {
            console.error('Failed to update verification:', error);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading-state">
                <Loader2 className="animate-spin text-primary-500" size={48} />
                <p>Vetting verification requests...</p>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <div className="admin-page-hero">
                <h1>Verification Center</h1>
                <p>Vet and approve professional credentials for platform security and trust</p>
            </div>

            {/* Filter Tabs */}
            <div className="admin-tab-nav" style={{ marginBottom: '2.5rem' }}>
                {['pending', 'approved', 'rejected'].map(s => (
                    <button
                        key={s}
                        className={`admin-tab-btn ${statusFilter === s ? 'active' : ''}`}
                        onClick={() => setStatusFilter(s)}
                    >
                        {s === 'pending' && <Clock size={18} />}
                        {s === 'approved' && <CheckCircle size={18} />}
                        {s === 'rejected' && <XCircle size={18} />}
                        <span style={{ textTransform: 'capitalize' }}>{s} Requests</span>
                    </button>
                ))}
            </div>

            {/* Table Area */}
            <div className="admin-table-container card-glow" style={{ border: 'none', boxShadow: 'var(--admin-card-shadow)' }}>
                {requests.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Identity</th>
                                <th>Professional Tier</th>
                                <th>Verification Assets</th>
                                <th>Assessment Score</th>
                                <th>Submission Date</th>
                                <th style={{ textAlign: 'right' }}>Management Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req._id}>
                                    <td>
                                        <div className="user-profile-cell" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '42px',
                                                height: '42px',
                                                borderRadius: '12px',
                                                background: 'var(--admin-primary)',
                                                color: 'white',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 800,
                                                fontSize: '1rem',
                                                boxShadow: '0 4px 6px -1px rgba(36, 62, 86, 0.2)'
                                            }}>
                                                {req.user?.name?.charAt(0)}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 800, color: 'var(--admin-primary)', fontSize: '0.95rem' }}>{req.user?.name}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)', fontWeight: 600 }}>{req.user?.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${req.type === 'freelancer' ? 'info' : 'warning'}`} style={{ padding: '0.5rem 1rem', borderRadius: '10px' }}>
                                            {req.type?.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            {req.documents?.map((doc, i) => (
                                                <a
                                                    key={i}
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="admin-btn admin-btn-outline"
                                                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', gap: '6px', borderRadius: '8px', background: '#f8fafc' }}
                                                >
                                                    <FileText size={14} color="var(--admin-accent)" />
                                                    View Asset {i + 1}
                                                </a>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        {req.skillTestScore ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div style={{ flex: 1, height: '8px', background: '#f1f5f9', borderRadius: '4px', width: '80px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${req.skillTestScore}%`,
                                                        background: req.skillTestScore >= 80 ? 'var(--admin-accent)' : '#f59e0b',
                                                        boxShadow: '0 0 10px rgba(118, 163, 109, 0.3)'
                                                    }} />
                                                </div>
                                                <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--admin-primary)' }}>{req.skillTestScore}%</span>
                                            </div>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gray-400)' }}>
                                                <AlertCircle size={14} />
                                                <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>No Score</span>
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        <span style={{ fontWeight: 600, color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                                            {new Date(req.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        {statusFilter === 'pending' ? (
                                            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                                                <button
                                                    className="admin-icon-btn"
                                                    style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', borderColor: '#d1fae5' }}
                                                    onClick={() => handleAction(req._id, 'approved')}
                                                    title="Verify Talent"
                                                >
                                                    <CheckCircle size={20} />
                                                </button>
                                                <button
                                                    className="admin-icon-btn danger"
                                                    style={{ width: '42px', height: '42px', borderRadius: '12px' }}
                                                    onClick={() => handleAction(req._id, 'rejected')}
                                                    title="Reject Application"
                                                >
                                                    <XCircle size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className={`admin-badge ${req.status === 'approved' ? 'success' : 'danger'}`} style={{ padding: '0.5rem 1rem', borderRadius: '10px' }}>
                                                {req.status?.toUpperCase()}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty-state" style={{ padding: '8rem 2rem' }}>
                        <div className="empty-icon-wrapper">
                            <ShieldCheck size={48} />
                        </div>
                        <h3>Verification Queue Clear</h3>
                        <p>All {statusFilter} applications have been processed. Platform integrity is nominal.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminVerifications;
