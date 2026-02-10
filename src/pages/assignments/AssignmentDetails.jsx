import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import { chatService } from '../../services/chatService';
import {
    Loader2, Clock, DollarSign, FileText, CheckCircle,
    ArrowLeft, ShieldCheck, MessageSquare, Send, Calendar,
    User, AlertTriangle
} from 'lucide-react';
import StatusTracker from '../../components/assignments/StatusTracker';
import './assignments.css';

const AssignmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showBidModal, setShowBidModal] = useState(false);
    const [bidData, setBidData] = useState({
        proposedPrice: '',
        deliveryTime: '',
        coverMessage: ''
    });
    const [submittingBid, setSubmittingBid] = useState(false);

    // Get current user from local storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    useEffect(() => {
        loadAssignment();
    }, [id]);

    const loadAssignment = async () => {
        try {
            const result = await assignmentService.getById(id);
            setData(result);
        } catch (error) {
            console.error("Failed to load assignment", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBidSubmit = async (e) => {
        e.preventDefault();
        setSubmittingBid(true);
        try {
            await assignmentService.submitBid({
                assignmentId: id,
                ...bidData,
                proposedPrice: Number(bidData.proposedPrice),
                deliveryTime: Number(bidData.deliveryTime)
            });
            alert("Bid submitted successfully!");
            setShowBidModal(false);
            loadAssignment();
        } catch (error) {
            console.error(error);
            alert("Failed to submit bid.");
        } finally {
            setSubmittingBid(false);
        }
    };

    const handleAcceptBid = async (bidId) => {
        if (!window.confirm("Are you sure you want to accept this bid? This will initiate the project.")) return;
        try {
            await assignmentService.acceptBid(bidId);
            alert("Bid accepted! Project is now in progress.");
            loadAssignment();
        } catch (error) {
            console.error(error);
            alert("Failed to accept bid.");
        }
    };

    const handleContactStudent = async () => {
        if (!user || !user._id) {
            navigate('/login', { state: { from: `/assignments/${id}` } });
            return;
        }

        try {
            const conversation = await chatService.getOrCreateConversation(assignment.studentId._id, {
                type: 'assignment',
                id: assignment._id,
                title: assignment.title
            });
            navigate(`/chat/${conversation._id}`);
        } catch (err) {
            console.error('Failed to start conversation', err);
            alert('Failed to start conversation. Please try again.');
        }
    };

    if (loading) return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Loader2 className="animate-spin" style={{ color: 'var(--primary-600)' }} size={48} />
        </div>
    );

    if (!data) return <div className="assignment-details-page text-center">Assignment not found.</div>;

    const { assignment, bids } = data;
    const isOwner = user._id === assignment.studentId?._id;
    const canBid = user.role === 'freelancer' || user.role === 'teacher';
    const alreadyBid = bids?.some(b => b.freelancerId?._id === user._id);

    return (
        <div className="assignment-details-page">
            <div className="details-container">
                <button
                    onClick={() => navigate(-1)}
                    className="back-link"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                    <ArrowLeft size={20} /> Back to Marketplace
                </button>

                <div className="details-layout">
                    {/* Left Section: Description & Files */}
                    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Status Tracker */}
                        {assignment.status !== 'open' && (
                            <div className="assignment-card">
                                <StatusTracker status={assignment.status} />
                            </div>
                        )}

                        <div className="assignment-card">
                            <div className="assignment-meta-badges">
                                <span className="badge-base badge-primary">
                                    {assignment.subject}
                                </span>
                                <span className="badge-base badge-navy">
                                    {assignment.academicLevel}
                                </span>
                            </div>
                            <h1 className="hero-title" style={{ textAlign: 'left', color: 'var(--primary-900)', fontSize: '2.25rem', marginBottom: '1.5rem' }}>
                                {assignment.title}
                            </h1>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--gray-50)', marginBottom: '2rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                    <User size={18} style={{ color: 'var(--primary-600)' }} />
                                    <span>Posted by <span style={{ fontWeight: 700, color: 'var(--primary-900)' }}>{assignment.studentId?.name}</span></span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                    <Calendar size={18} style={{ color: 'var(--primary-600)' }} />
                                    <span>Posted {new Date(assignment.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="prose-content">
                                <h3 style={{ color: 'var(--primary-900)', fontWeight: 800, marginBottom: '1rem' }}>Assignment Overview</h3>
                                <p style={{ marginBottom: '2rem' }}>{assignment.description}</p>

                                <h3 style={{ color: 'var(--primary-900)', fontWeight: 800, marginBottom: '1rem' }}>Key Objectives</h3>
                                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <li>Provide academic analysis and guidance</li>
                                    <li>Ensure all reference materials are accurately used</li>
                                    <li>Strict adherence to the provided deadline</li>
                                </ul>

                                {assignment.files?.length > 0 && (
                                    <div style={{ marginTop: '2.5rem' }}>
                                        <h3 style={{ color: 'var(--primary-900)', fontWeight: 800, marginBottom: '1rem' }}>Resource Files</h3>
                                        <div className="files-grid">
                                            {assignment.files.map((file, i) => (
                                                <a key={i} href={file.url} download className="file-item">
                                                    <div className="file-icon-box">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary-900)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</div>
                                                        <div style={{ fontSize: '10px', color: 'var(--gray-400)', fontWeight: 800, textTransform: 'uppercase' }}>{file.type || 'Document'}</div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Academic Integrity Notice */}
                            <div className="integrity-notice">
                                <div className="integrity-icon">
                                    <AlertTriangle size={24} />
                                </div>
                                <div>
                                    <h4 style={{ fontWeight: 800, color: '#991b1b', marginBottom: '4px' }}>Academic Integrity Policy</h4>
                                    <p style={{ fontSize: '0.875rem', color: '#b91c1c', lineHeight: 1.6 }}>
                                        This material is provided for study and reference purposes only. Submission of another person's work as your own is strictly prohibited and constitutes academic misconduct.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bids Section for Student */}
                        {isOwner && assignment.status === 'open' && (
                            <div className="assignment-card">
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '1.5rem' }}>Received Bids ({bids.length})</h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {bids.length > 0 ? bids.map((bid) => (
                                        <div key={bid._id} className="bid-card">
                                            <div className="bid-header">
                                                <div className="expert-info">
                                                    <div className="expert-avatar">
                                                        {bid.freelancerId?.name ? bid.freelancerId.name[0] : 'U'}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 800, color: 'var(--primary-900)' }}>{bid.freelancerId?.name}</div>
                                                        <div style={{ fontSize: '10px', color: 'var(--gray-400)', fontWeight: 800, textTransform: 'uppercase' }}>Expert Rank: <span style={{ color: 'var(--primary-600)' }}>Top Rated</span></div>
                                                    </div>
                                                </div>
                                                <div className="bid-pricing">
                                                    <div className="bid-amount">${bid.proposedPrice}</div>
                                                    <div className="bid-delivery">Delivery in {bid.deliveryTime} Days</div>
                                                </div>
                                            </div>
                                            <p className="bid-message">
                                                "{bid.coverMessage}"
                                            </p>
                                            <button
                                                onClick={() => handleAcceptBid(bid._id)}
                                                className="btn btn-primary"
                                                style={{ width: '100%', padding: '1rem', borderRadius: '12px' }}
                                            >
                                                Accept Bid & Start
                                            </button>
                                        </div>
                                    )) : (
                                        <div style={{ textAlign: 'center', padding: '2.5rem 0', color: 'var(--gray-400)' }}>
                                            No bids received yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sticky Panel */}
                    <aside className="sticky-sidebar">
                        <div className="sticky-panel">
                            <div className="budget-label">Estimated Budget</div>
                            <div className="budget-value">
                                ${assignment.budget?.min} - ${assignment.budget?.max}
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <div className="panel-row">
                                    <span style={{ color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}><Clock size={16} /> Deadline</span>
                                    <span style={{ fontWeight: 700 }}>{new Date(assignment.deadline).toLocaleDateString()}</span>
                                </div>
                                <div className="panel-row">
                                    <span style={{ color: 'var(--gray-400)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem' }}><ShieldCheck size={16} /> Academic Integrity</span>
                                    <span style={{ fontWeight: 700, color: '#4ade80' }}>Mandated</span>
                                </div>
                            </div>

                            {assignment.status === 'open' && !isOwner && (
                                alreadyBid ? (
                                    <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <p style={{ fontWeight: 800, color: 'var(--accent-400)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                            <CheckCircle size={18} /> Bid Submitted
                                        </p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px' }}>Awaiting evaluation</p>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setShowBidModal(true)}
                                        className="btn btn-primary"
                                        style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem', borderRadius: '16px' }}
                                    >
                                        Submit New Bid
                                    </button>
                                )
                            )}

                            {assignment.status === 'open' && !isOwner && !alreadyBid && (
                                <button
                                    onClick={handleContactStudent}
                                    className="btn"
                                    style={{ width: '100%', marginTop: '1rem', background: 'white', border: '1px solid var(--primary-200)', color: 'var(--primary-700)', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    <MessageSquare size={18} /> Message Student
                                </button>
                            )}

                            {isOwner && (
                                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px', textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <p style={{ fontWeight: 800, color: 'var(--gray-300)' }}>Evaluating Bids</p>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)', marginTop: '4px' }}>Accept a bid to begin the process.</p>
                                </div>
                            )}
                        </div>

                        <div className="assignment-card" style={{ marginTop: '1.5rem' }}>
                            <h4 style={{ fontWeight: 800, color: 'var(--primary-900)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <ShieldCheck size={18} style={{ color: 'var(--primary-600)' }} /> AtechLancer Guarantee
                            </h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>
                                Payment is securely held in escrow and only released when the solution is approved by the student. Expert work is protected by our ethical compliance framework.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Bid Modal */}
            {showBidModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <header className="modal-header">
                            <h2 style={{ fontWeight: 800 }}>Submit Your Expertise</h2>
                            <button onClick={() => setShowBidModal(false)} style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
                        </header>
                        <div className="modal-body">
                            <form onSubmit={handleBidSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>My Bid ($)</label>
                                        <div style={{ position: 'relative' }}>
                                            <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--gray-400)' }} />
                                            <input
                                                type="number"
                                                required
                                                value={bidData.proposedPrice}
                                                onChange={(e) => setBidData({ ...bidData, proposedPrice: e.target.value })}
                                                className="search-input w-full"
                                                style={{ paddingLeft: '32px' }}
                                                placeholder="50"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>Delivery (Days)</label>
                                        <div style={{ position: 'relative' }}>
                                            <Clock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--gray-400)' }} />
                                            <input
                                                type="number"
                                                required
                                                value={bidData.deliveryTime}
                                                onChange={(e) => setBidData({ ...bidData, deliveryTime: e.target.value })}
                                                className="search-input w-full"
                                                style={{ paddingLeft: '32px' }}
                                                placeholder="3"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 800, color: 'var(--primary-900)', marginBottom: '0.5rem' }}>Cover Message</label>
                                    <textarea
                                        required
                                        value={bidData.coverMessage}
                                        onChange={(e) => setBidData({ ...bidData, coverMessage: e.target.value })}
                                        className="search-input w-full"
                                        style={{ minHeight: '120px', padding: '1rem' }}
                                        placeholder="Briefly explain your relevant experience and how you approach this specific assignment..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submittingBid}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '1.25rem', fontSize: '1.125rem', borderRadius: '16px', marginTop: '1rem' }}
                                >
                                    {submittingBid ? <Loader2 className="animate-spin" /> : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>Submit Bid <Send size={20} /></div>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentDetails;
