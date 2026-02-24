import React, { useState, useEffect } from 'react';
import { adminService } from '../../../services/adminService';
import {
    CheckCircle, XCircle, FileText,
    ExternalLink, Loader2, AlertCircle, Filter
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
            <header className="admin-page-header">
                <div>
                    <h1>Verification Center</h1>
                    <p>Approve trusted freelancers and industrial educators</p>
                </div>
            </header>

            {/* Filter */}
            <div className="admin-tab-nav">
                {['pending', 'approved', 'rejected'].map(s => (
                    <button
                        key={s}
                        className={`admin-tab-btn ${statusFilter === s ? 'active' : ''}`}
                        onClick={() => setStatusFilter(s)}
                    >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="admin-table-container">
                {requests.length > 0 ? (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Type</th>
                                <th>Documents</th>
                                <th>Skill Score</th>
                                <th>Requested</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req._id}>
                                    <td>
                                        <div className="user-profile-cell" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                            <div style={{
                                                width: '36px',
                                                height: '36px',
                                                borderRadius: '50%',
                                                background: 'var(--primary-100)',
                                                color: 'var(--primary-700)',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                fontWeight: 800,
                                                fontSize: '0.9rem'
                                            }}>
                                                {req.user?.name?.charAt(0)}
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{req.user?.name}</span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{req.user?.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${req.type === 'freelancer' ? 'info' : 'warning'}`}>
                                            {req.type}
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
                                                    style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', gap: '4px' }}
                                                >
                                                    <FileText size={12} />
                                                    Doc {i + 1}
                                                </a>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        {req.skillTestScore ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '3px', width: '60px', overflow: 'hidden' }}>
                                                    <div style={{
                                                        height: '100%',
                                                        width: `${req.skillTestScore}%`,
                                                        background: req.skillTestScore >= 80 ? '#10b981' : '#f59e0b'
                                                    }} />
                                                </div>
                                                <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{req.skillTestScore}%</span>
                                            </div>
                                        ) : (
                                            <span style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>Not Tested</span>
                                        )}
                                    </td>
                                    <td>{new Date(req.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                                    <td>
                                        {statusFilter === 'pending' ? (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button
                                                    className="admin-icon-btn"
                                                    style={{ color: '#059669', borderColor: '#10b981' }}
                                                    onClick={() => handleAction(req._id, 'approved')}
                                                    title="Approve"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    className="admin-icon-btn danger"
                                                    onClick={() => handleAction(req._id, 'rejected')}
                                                    title="Reject"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className={`admin-badge ${req.status === 'approved' ? 'success' : 'danger'}`}>
                                                {req.status}
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="admin-empty-state">
                        <CheckCircle size={48} color="var(--gray-300)" />
                        <h3>Inbox Zero</h3>
                        <p>No {statusFilter} verification requests found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminVerifications;
