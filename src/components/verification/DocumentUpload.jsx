import React, { useState } from 'react';
import { verificationService } from '../../services/verificationService';
import { Upload, FileText, Image, CheckCircle, X, Loader2, AlertCircle } from 'lucide-react';
import '../../pages/verification/verification.css';

const DocumentUpload = ({ onComplete }) => {
    const [documents, setDocuments] = useState({
        idProof: null,
        portfolio: [],
        certificates: []
    });
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    const handleFileSelect = (type, files) => {
        if (type === 'idProof') {
            setDocuments({ ...documents, idProof: files[0] });
        } else {
            const fileArray = Array.from(files);
            setDocuments({ ...documents, [type]: [...documents[type], ...fileArray] });
        }
    };

    const removeFile = (type, index = null) => {
        if (type === 'idProof') {
            setDocuments({ ...documents, idProof: null });
        } else {
            const updated = documents[type].filter((_, i) => i !== index);
            setDocuments({ ...documents, [type]: updated });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!documents.idProof) {
            setError('ID proof is required');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('idProof', documents.idProof);

            documents.portfolio.forEach((file) => {
                formData.append('portfolio', file);
            });

            documents.certificates.forEach((file) => {
                formData.append('certificates', file);
            });

            await verificationService.uploadDocuments(formData);
            onComplete();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to upload documents');
        } finally {
            setUploading(false);
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    return (
        <div className="document-upload">
            <div className="upload-header">
                <h2>Upload Verification Documents</h2>
                <p>Please upload the required documents to verify your identity and credentials</p>
            </div>

            {error && (
                <div className="error-message">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="upload-form">
                {/* ID Proof */}
                <div className="upload-section">
                    <label className="upload-label required">
                        <FileText size={20} />
                        ID Proof (Required)
                    </label>
                    <p className="upload-hint">Government-issued ID (Passport, Driver's License, National ID)</p>

                    {!documents.idProof ? (
                        <label className="file-drop-zone">
                            <input
                                type="file"
                                accept="image/*,.pdf"
                                onChange={(e) => handleFileSelect('idProof', e.target.files)}
                            />
                            <Upload size={32} />
                            <span>Click to upload or drag and drop</span>
                            <span className="file-types">PNG, JPG or PDF (max 5MB)</span>
                        </label>
                    ) : (
                        <div className="file-preview">
                            <div className="file-info">
                                <FileText size={20} />
                                <div className="file-details">
                                    <span className="file-name">{documents.idProof.name}</span>
                                    <span className="file-size">{formatFileSize(documents.idProof.size)}</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                className="remove-file-btn"
                                onClick={() => removeFile('idProof')}
                            >
                                <X size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Portfolio */}
                <div className="upload-section">
                    <label className="upload-label">
                        <Image size={20} />
                        Portfolio (Optional)
                    </label>
                    <p className="upload-hint">Showcase your previous work (up to 5 files)</p>

                    <label className="file-drop-zone">
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            multiple
                            onChange={(e) => handleFileSelect('portfolio', e.target.files)}
                            disabled={documents.portfolio.length >= 5}
                        />
                        <Upload size={32} />
                        <span>Click to upload or drag and drop</span>
                        <span className="file-types">Images or PDF (max 5 files, 5MB each)</span>
                    </label>

                    {documents.portfolio.length > 0 && (
                        <div className="files-list">
                            {documents.portfolio.map((file, index) => (
                                <div key={index} className="file-preview">
                                    <div className="file-info">
                                        <Image size={20} />
                                        <div className="file-details">
                                            <span className="file-name">{file.name}</span>
                                            <span className="file-size">{formatFileSize(file.size)}</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-file-btn"
                                        onClick={() => removeFile('portfolio', index)}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Certificates */}
                <div className="upload-section">
                    <label className="upload-label">
                        <FileText size={20} />
                        Certificates (Optional)
                    </label>
                    <p className="upload-hint">Educational or professional certificates</p>

                    <label className="file-drop-zone">
                        <input
                            type="file"
                            accept="image/*,.pdf"
                            multiple
                            onChange={(e) => handleFileSelect('certificates', e.target.files)}
                        />
                        <Upload size={32} />
                        <span>Click to upload or drag and drop</span>
                        <span className="file-types">Images or PDF (max 5MB each)</span>
                    </label>

                    {documents.certificates.length > 0 && (
                        <div className="files-list">
                            {documents.certificates.map((file, index) => (
                                <div key={index} className="file-preview">
                                    <div className="file-info">
                                        <FileText size={20} />
                                        <div className="file-details">
                                            <span className="file-name">{file.name}</span>
                                            <span className="file-size">{formatFileSize(file.size)}</span>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="remove-file-btn"
                                        onClick={() => removeFile('certificates', index)}
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="upload-actions">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={uploading || !documents.idProof}
                    >
                        {uploading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Uploading...
                            </>
                        ) : (
                            <>
                                <CheckCircle size={18} />
                                Submit Documents
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DocumentUpload;
