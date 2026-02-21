import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import {
    Loader2, Upload, CheckCircle, FileText, Send,
    ArrowLeft, AlertCircle, Clock
} from 'lucide-react';
import './assignments.css';

const SubmissionUpload = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await assignmentService.submitSolution({
                assignmentId: id,
                comments,
                files: [
                    { name: 'Solution_Draft.pdf', url: '#', type: 'PDF' } // Mocked for now
                ]
            });
            setSubmitted(true);
            setTimeout(() => navigate(`/assignments/${id}`), 3000);
        } catch (error) {
            console.error(error);
            alert("Failed to submit solution.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) return (
        <div className="success-screen">
            <div style={{ maxWidth: '400px' }}>
                <div className="success-icon-wrap">
                    <CheckCircle size={48} />
                </div>
                <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '1rem' }}>Submission Successful!</h1>
                <p style={{ color: 'var(--gray-500)', lineHeight: 1.6 }}>
                    Your solution has been sent to the student. They will review it and release payment or request a revision.
                </p>
                <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem', marginTop: '2rem' }}>Redirecting you to the project details...</p>
            </div>
        </div>
    );

    return (
        <div className="submission-page">
            <div className="submission-container">
                <button
                    onClick={() => navigate(-1)}
                    className="back-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: '2rem' }}
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="submission-card">
                    <div style={{ marginBottom: '2.5rem' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>Upload Submission</h1>
                        <p style={{ color: 'var(--gray-500)' }}>Submit your final solution or progress draft for review.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="upload-area">
                            <Upload style={{ margin: '0 auto 1rem', color: 'var(--gray-300)' }} size={48} />
                            <p style={{ fontWeight: 800, color: 'var(--primary-900)', marginBottom: '4px' }}>Select Solution Files</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Upload PDF, ZIP, or separate source files.</p>
                            <input type="file" style={{ display: 'none' }} multiple />
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.75rem' }}>
                                <FileText size={18} style={{ color: 'var(--primary-600)' }} /> Comments & Notes
                            </label>
                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="search-input"
                                style={{ width: '100%', minHeight: '150px', padding: '1rem' }}
                                placeholder="Explain your approach, list any specific software needed to run the solution, or provide guidance for the student..."
                            />
                        </div>

                        <div className="delivery-box">
                            <div className="delivery-icon">
                                <Clock size={20} />
                            </div>
                            <div>
                                <p style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', color: 'var(--accent-400)', marginBottom: '2px' }}>Timely Delivery</p>
                                <p style={{ fontSize: '0.875rem', color: 'var(--gray-300)', lineHeight: 1.4 }}>Ensure your submission is uploaded before the deadline to maintain your expert rating.</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem', marginTop: '2rem', justifyContent: 'center' }}
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Complete Submission <Send size={20} /></>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubmissionUpload;
