import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
    AlertTriangle, Eye, Ban, Trash2, CheckCircle,
    Loader2, AlertCircle, MessageSquare, Star
} from 'lucide-react';
import './admin.css';

const ContentModeration = ({ defaultFilter = 'pending' }) => {
    const [reports, setReports] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(defaultFilter); // pending, reviewed, dismissed, reviews
    const [selectedReport, setSelectedReport] = useState(null);
    const [reason, setReason] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadData();
    }, [filter]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (filter === 'reviews') {
                const data = await adminService.getReviews();
                setReviews(data);
                setReports([]); // Clear reports when viewing reviews
            } else {
                const data = await adminService.getReportedContent(filter);
                setReports(data.reports || []);
                setReviews([]); // Clear reviews when viewing reports
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
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
            loadData(); // Call loadData instead of loadReports
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
        <div className="admin-page-container">
            <div className="admin-page-hero">
                <h1>Content Moderation</h1>
                <p>Review and moderate reported content to maintain platform integrity</p>
            </div>

            {/* Filter Tabs */}
            <div className="admin-tab-nav" style={{ marginBottom: '2rem' }}>
                <button
                    className={`admin-tab-btn ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    <AlertCircle size={18} />
                    Pending Reports
                </button>
                <button
                    className={`admin-tab-btn ${filter === 'reviews' ? 'active' : ''}`}
                    onClick={() => setFilter('reviews')}
                >
                    <MessageSquare size={18} />
                    User Reviews
                </button>
                <button
                    className={`admin-tab-btn ${filter === 'reviewed' ? 'active' : ''}`}
                    onClick={() => setFilter('reviewed')}
                >
                    <CheckCircle size={18} />
                    Reviewed Reports
                </button>
                <button
                    className={`admin-tab-btn ${filter === 'dismissed' ? 'active' : ''}`}
                    onClick={() => setFilter('dismissed')}
                >
                    <Ban size={18} />
                    Dismissed
                </button>
            </div>

            {/* Content Area */}
            {loading ? (
                <div className="admin-loading-state">
                    <Loader2 className="animate-spin" size={40} />
                    <p>Loading {filter}...</p>
                </div>
            ) : (
                <div className="admin-content-section">
                    {filter === 'reviews' ? (
                        reviews.length > 0 ? (
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                                {reviews.map(review => (
                                    <div key={review._id} className="admin-card review-card">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                                                    {review.userId?.name?.charAt(0) || '?'}
                                                </div>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontWeight: 700, color: 'var(--gray-700)', fontSize: '0.875rem' }}>{review.userId?.name}</span>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>{new Date(review.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b' }}>
                                                <Star size={14} fill="#f59e0b" />
                                                <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>{review.rating}</span>
                                            </div>
                                        </div>
                                        <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #f1f5f9', marginBottom: '1rem', minHeight: '80px' }}>
                                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.5 }}>"{review.comment}"</p>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontWeight: 600 }}>
                                                Target: <span style={{ color: 'var(--admin-primary)' }}>{review.courseId?.title || 'Unknown Item'}</span>
                                            </span>
                                            <button
                                                className="admin-icon-btn danger"
                                                title="Delete Review"
                                                onClick={async () => {
                                                    if (window.confirm('Delete this review permanently?')) {
                                                        await adminService.deleteReview(review._id);
                                                        loadData();
                                                    }
                                                }}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="admin-empty-state">
                                <MessageSquare size={48} />
                                <h3>No reviews found</h3>
                                <p>No user-submitted reviews are available in the system.</p>
                            </div>
                        )
                    ) : (
                        reports.length > 0 ? (
                            <div className="reports-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                {reports.map((report) => (
                                    <div key={report._id} className="admin-card report-card">
                                        <div className="report-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <AlertTriangle size={24} />
                                                </div>
                                                <div>
                                                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--admin-primary)', textTransform: 'capitalize' }}>{report.contentType} Report</h3>
                                                    <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)', fontWeight: 600 }}>ID: {report._id.slice(-8).toUpperCase()} • {formatDate(report.createdAt)}</span>
                                                </div>
                                            </div>
                                            {getReportTypeBadge(report.type)}
                                        </div>

                                        <div className="report-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                                            <div className="detail-item">
                                                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Reporter</span>
                                                <span style={{ fontWeight: 700, color: 'var(--gray-700)' }}>{report.reporter?.name || 'Anonymous'}</span>
                                            </div>
                                            <div className="detail-item">
                                                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Reported User</span>
                                                <span style={{ fontWeight: 700, color: 'var(--gray-700)' }}>{report.reportedUser?.name}</span>
                                            </div>
                                            <div className="detail-item" style={{ gridColumn: 'span 2' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Reason</span>
                                                <p style={{ margin: 0, color: 'var(--gray-600)', fontSize: '0.9rem' }}>{report.description}</p>
                                            </div>
                                        </div>

                                        {report.contentPreview && (
                                            <div style={{ background: 'var(--gray-50)', padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', borderLeft: '4px solid var(--accent-500)' }}>
                                                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Content Preview</span>
                                                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--gray-700)', lineHeight: '1.6' }}>{report.contentPreview}</p>
                                            </div>
                                        )}

                                        <div className="report-footer" style={{ borderTop: '1px solid var(--gray-100)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'flex-end' }}>
                                            <button
                                                className="admin-btn admin-btn-outline"
                                                onClick={() => setSelectedReport(report)}
                                                style={{ padding: '0.6rem 1.2rem', fontWeight: 700, borderRadius: '10px' }}
                                            >
                                                <Eye size={18} style={{ marginRight: '8px' }} />
                                                Moderate Content
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="admin-empty-state">
                                <CheckCircle size={64} style={{ color: 'var(--accent-500)', marginBottom: '1.5rem' }} />
                                <h3>All Clear!</h3>
                                <p>Great job! There are no {filter} reports to review at this time.</p>
                            </div>
                        )
                    )}
                </div>
            )}

            {/* Moderation Modal */}
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
                                className="admin-btn admin-btn-outline"
                                onClick={() => handleModeration(selectedReport._id, 'dismiss')}
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        Dismiss Report
                                    </>
                                )}
                            </button>
                            <button
                                className="admin-btn admin-btn-primary"
                                style={{ backgroundColor: '#f59e0b', color: 'white' }}
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
                                className="admin-btn admin-btn-primary"
                                style={{ backgroundColor: '#ef4444', color: 'white' }}
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
                                className="admin-btn admin-btn-primary"
                                style={{ backgroundColor: '#991b1b', color: 'white' }}
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
