import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import {
    FileText, Download, CheckCircle, XCircle,
    Loader2, AlertCircle, Eye
} from 'lucide-react';
import './admin.css';

const VerificationPanel = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [notes, setNotes] = useState('');
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadVerificationRequests();
    }, []);

    const loadVerificationRequests = async () => {
        setLoading(true);
        try {
            const data = await adminService.getVerificationRequests('pending');
            setRequests(data.requests || []);
        } catch (error) {
            console.error('Failed to load verification requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerification = async (verificationId, status) => {
        setProcessing(true);
        try {
            await adminService.updateVerificationStatus(verificationId, status, notes);
            setSelectedRequest(null);
            setNotes('');
            loadVerificationRequests();
        } catch (error) {
            console.error('Failed to update verification:', error);
        } finally {
            setProcessing(false);
        }
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
        <div className="verification-panel">
            <div className="page-header">
                <div>
                    <h1>Seller Verification</h1>
                    <p>Review and approve seller verification requests</p>
                </div>
            </div>

            {loading ? (
                <div className="panel-loading">
                    <Loader2 className="animate-spin" size={48} />
                    <p>Loading verification requests...</p>
                </div>
            ) : requests.length === 0 ? (
                <div className="panel-empty">
                    <CheckCircle size={64} />
                    <h3>All caught up!</h3>
                    <p>No pending verification requests</p>
                </div>
            ) : (
                <div className="verification-grid">
                    {requests.map((request) => (
                        <div key={request._id} className="verification-card">
                            <div className="card-header">
                                <div className="user-info">
                                    {request.user?.profilePicture ? (
                                        <img src={request.user.profilePicture} alt={request.user.name} />
                                    ) : (
                                        <div className="user-avatar">
                                            {request.user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <div>
                                        <h3>{request.user?.name}</h3>
                                        <span className="user-email">{request.user?.email}</span>
                                    </div>
                                </div>
                                <span className="request-date">{formatDate(request.createdAt)}</span>
                            </div>

                            <div className="card-content">
                                <div className="verification-type">
                                    <strong>Verification Type:</strong> {request.type}
                                </div>

                                {request.documents && request.documents.length > 0 && (
                                    <div className="documents-section">
                                        <strong>Documents:</strong>
                                        <div className="documents-list">
                                            {request.documents.map((doc, index) => (
                                                <a
                                                    key={index}
                                                    href={doc.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="document-link"
                                                >
                                                    <FileText size={16} />
                                                    {doc.name}
                                                    <Download size={14} />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {request.skillTestScore && (
                                    <div className="test-score">
                                        <strong>Skill Test Score:</strong> {request.skillTestScore}%
                                    </div>
                                )}
                            </div>

                            <div className="card-actions">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setSelectedRequest(request)}
                                >
                                    <Eye size={18} />
                                    Review
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Review Modal */}
            {selectedRequest && (
                <div className="modal-overlay" onClick={() => setSelectedRequest(null)}>
                    <div className="modal-content verification-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Review Verification Request</h2>
                            <button className="modal-close-btn" onClick={() => setSelectedRequest(null)}>
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="request-details">
                                <h3>{selectedRequest.user?.name}</h3>
                                <p>{selectedRequest.user?.email}</p>
                                <p><strong>Type:</strong> {selectedRequest.type}</p>

                                {selectedRequest.documents && (
                                    <div className="documents-preview">
                                        <h4>Submitted Documents:</h4>
                                        {selectedRequest.documents.map((doc, index) => (
                                            <a
                                                key={index}
                                                href={doc.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="document-preview-link"
                                            >
                                                <FileText size={18} />
                                                {doc.name}
                                                <Download size={16} />
                                            </a>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="notes">Admin Notes (Optional)</label>
                                <textarea
                                    id="notes"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    placeholder="Add any notes about this verification..."
                                    rows={4}
                                />
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button
                                className="btn btn-error"
                                onClick={() => handleVerification(selectedRequest._id, 'rejected')}
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <XCircle size={18} />
                                        Reject
                                    </>
                                )}
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() => handleVerification(selectedRequest._id, 'approved')}
                                disabled={processing}
                            >
                                {processing ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        <CheckCircle size={18} />
                                        Approve
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

export default VerificationPanel;
