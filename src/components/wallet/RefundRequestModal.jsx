import React, { useState } from 'react';
import { walletService } from '../../services/walletService';
import { X, Loader2, AlertCircle, Upload } from 'lucide-react';
import './wallet.css';

const RefundRequestModal = ({ orderId, orderAmount, onClose, onSuccess }) => {
    const [reason, setReason] = useState('');
    const [description, setDescription] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const refundReasons = [
        'Order not delivered',
        'Poor quality work',
        'Not as described',
        'Freelancer unresponsive',
        'Mutual agreement',
        'Other'
    ];

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);

        // Validate file size (5MB max per file)
        const validFiles = files.filter(file => {
            if (file.size > 5 * 1024 * 1024) {
                setError('Each file must be less than 5MB');
                return false;
            }
            return true;
        });

        setAttachments(prev => [...prev, ...validFiles].slice(0, 3)); // Max 3 files
    };

    const removeAttachment = (index) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!reason) {
            setError('Please select a reason for refund');
            return;
        }

        if (!description.trim()) {
            setError('Please provide a detailed description');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('orderId', orderId);
            formData.append('reason', reason);
            formData.append('description', description);

            attachments.forEach((file, index) => {
                formData.append(`attachment${index}`, file);
            });

            await walletService.requestRefund(formData);
            onSuccess();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to submit refund request');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content refund-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Request Refund</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="refund-form">
                    <div className="order-info">
                        <span>Order Amount:</span>
                        <strong>${orderAmount.toFixed(2)}</strong>
                    </div>

                    {error && (
                        <div className="error-message">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="reason">Reason for Refund *</label>
                        <select
                            id="reason"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            required
                        >
                            <option value="">Select a reason</option>
                            {refundReasons.map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Detailed Description *</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Please provide detailed information about why you're requesting a refund..."
                            rows={5}
                            required
                        />
                        <span className="input-hint">
                            {description.length}/500 characters
                        </span>
                    </div>

                    <div className="form-group">
                        <label>Supporting Documents (Optional)</label>
                        <div className="file-upload-area">
                            <input
                                type="file"
                                id="attachments"
                                onChange={handleFileSelect}
                                accept="image/*,.pdf,.doc,.docx"
                                multiple
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="attachments" className="file-upload-label">
                                <Upload size={24} />
                                <span>Click to upload files</span>
                                <span className="upload-hint">
                                    Images, PDFs, or documents (Max 3 files, 5MB each)
                                </span>
                            </label>
                        </div>

                        {attachments.length > 0 && (
                            <div className="attachment-list">
                                {attachments.map((file, index) => (
                                    <div key={index} className="attachment-item">
                                        <span className="attachment-name">{file.name}</span>
                                        <button
                                            type="button"
                                            className="remove-attachment-btn"
                                            onClick={() => removeAttachment(index)}
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="refund-info">
                        <p>
                            <strong>Note:</strong> Refund requests are reviewed within 2-3 business days.
                            You will be notified of the decision via email and notification.
                        </p>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Request'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RefundRequestModal;
