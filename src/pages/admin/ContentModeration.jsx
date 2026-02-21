import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
    AlertTriangle, Eye, Ban, Trash2, CheckCircle,
    Loader2, AlertCircle
} from 'lucide-react';
import './admin.css';

const ContentModeration = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('pending');
    const [selectedReport, setSelectedReport] = useState(null);
    const [reason, setReason] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadReports();
    }, [filter]);

    const loadReports = async () => {
        setLoading(true);
        try {
            const data = await adminService.getReportedContent('all', filter);
            setReports(data.reports || []);
        } catch (error) {
            console.error('Failed to load reports:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleModeration = async (reportId, action) => {
        setProcessing(true);
        try {
            await adminService.moderateContent(reportId, action, reason);
            setSelectedReport(null);
            setReason('');
            loadReports();
        } catch (error) {
            console.error('Failed to moderate content:', error);
        } finally {
            setProcessing(false);
        }
    };

    const getReportTypeBadge = (type) => {
        const badges = {
            spam: { class: 'type-badge warning', text: 'Spam' },
            inappropriate: { class: 'type-badge error', text: 'Inappropriate' },
            harassment: { class: 'type-badge error', text: 'Harassment' },
            copyright: { class: 'type-badge info', text: 'Copyright' },
            other: { class: 'type-badge neutral', text: 'Other' }
        };

        const badge = badges[type] || badges.other;
        return <span className={badge.class}>{badge.text}</span>;
    };

    const formatDate = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="content-moderation">
            <div className="page-header">
                <div>
                    <h1>Content Moderation</h1>
                    <p>Review and moderate reported content</p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="filter-tabs">
                <button
                    className={`tab ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Pending
                </button>
                <button
                    className={`tab ${filter === 'reviewed' ? 'active' : ''}`}
                    onClick={() => setFilter('reviewed')}
                >
                    Reviewed
                </button>
                <button
                    className={`tab ${filter === 'dismissed' ? 'active' : ''}`}
                    onClick={() => setFilter('dismissed')}
                >
                    Dismissed
                </button>
            </div>

            {/* Reports List */}
            {loading ? (
                <div className="panel-loading">
                    <Loader2 className="animate-spin" size={48} />
                    <p>Loading reports...</p>
                </div>
            ) : reports.length === 0 ? (
                <div className="panel-empty">
                    <CheckCircle size={64} />
                    <h3>No reports found</h3>
                    <p>All clear!</p>
                </div>
            ) : (
                <div className="reports-list">
                    {reports.map((report) => (
                        <div key={report._id} className="report-card">
                            <div className="report-header">
                                <div className="report-info">
                                    <AlertTriangle size={20} className="report-icon" />
                                    <div>
                                        <h3>{report.contentType} Report</h3>
                                        <span className="report-date">{formatDate(report.createdAt)}</span>
                                    </div>
                                </div>
                                {getReportTypeBadge(report.type)}
                            </div>

                            <div className="report-content">
                                <div className="reporter-info">
                                    <strong>Reported by:</strong> {report.reporter?.name || 'Anonymous'}
                                </div>
                                <div className="reported-user">
                                    <strong>Reported user:</strong> {report.reportedUser?.name}
                                </div>
                                <div className="report-reason">
                                    <strong>Reason:</strong> {report.description}
                                </div>
                                {report.contentPreview && (
                                    <div className="content-preview">
                                        <strong>Content:</strong>
                                        <p>{report.contentPreview}</p>
                                    </div>
                                )}
                            </div>

                            <div className="report-actions">
                                <button
                                    className="btn btn-secondary btn-sm"
                                    onClick={() => setSelectedReport(report)}
                                >
                                    <Eye size={16} />
                                    Review
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Review Modal */}
            {selectedReport && (
                <div className="modal-overlay" onClick={() => setSelectedReport(null)}>
                    <div className="modal-content moderation-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Review Report</h2>
                            <button className="modal-close-btn" onClick={() => setSelectedReport(null)}>
                                <AlertCircle size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="report-details">
                                <p><strong>Type:</strong> {selectedReport.type}</p>
                                <p><strong>Content Type:</strong> {selectedReport.contentType}</p>
                                <p><strong>Reported User:</strong> {selectedReport.reportedUser?.name}</p>
                                <p><strong>Reporter:</strong> {selectedReport.reporter?.name || 'Anonymous'}</p>
                                <p><strong>Description:</strong> {selectedReport.description}</p>

                                {selectedReport.contentPreview && (
                                    <div className="full-content">
                                        <strong>Full Content:</strong>
                                        <div className="content-box">
                                            {selectedReport.contentPreview}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="reason">Moderation Reason (Optional)</label>
                                <textarea
                                    id="reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Add notes about your decision..."
                                    rows={3}
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="btn btn-secondary"
                                onClick={() => handleModeration(selectedReport._id, 'dismiss')}
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        Dismiss
                                    </>
                                )}
                            </button>
                            <button
                                className="btn btn-warning"
                                onClick={() => handleModeration(selectedReport._id, 'warn')}
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <AlertTriangle size={18} />
                                        Warn User
                                    </>
                                )}
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={() => handleModeration(selectedReport._id, 'remove')}
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <Trash2 size={18} />
                                        Remove Content
                                    </>
                                )}
                            </button>
                            <button
                                className="btn btn-error"
                                onClick={() => handleModeration(selectedReport._id, 'ban')}
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <Ban size={18} />
                                        Ban User
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentModeration;
