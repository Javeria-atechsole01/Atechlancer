import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import {
    Loader2, Clock, DollarSign, FileText, CheckCircle,
    ArrowLeft, ShieldCheck, MessageSquare, Send, Calendar,
    User, AlertTriangle
} from 'lucide-react';
import StatusTracker from '../../components/assignments/StatusTracker';

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

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen">
            <Loader2 className="animate-spin text-primary-600" size={48} />
        </div>
    );

    if (!data) return <div className="text-center py-20">Assignment not found.</div>;

    const { assignment, bids } = data;
    const isOwner = user._id === assignment.studentId._id;
    const canBid = user.roles?.includes('freelancer') || user.roles?.includes('teacher');
    const alreadyBid = bids?.some(b => b.freelancerId._id === user._id);

    return (
        <div className="bg-gray-50 min-h-screen py-10 px-4">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-navy-900 transition-colors mb-8 font-bold"
                >
                    <ArrowLeft size={20} /> Back to Marketplace
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Section: Description & Files */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Status Tracker */}
                        {assignment.status !== 'open' && (
                            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                                <StatusTracker status={assignment.status} />
                            </div>
                        )}

                        <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {assignment.subject}
                                </span>
                                <span className="px-3 py-1 bg-navy-50 text-navy-600 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {assignment.academicLevel}
                                </span>
                            </div>
                            <h1 className="text-3xl font-bold text-navy-900 mb-6">{assignment.title}</h1>

                            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-500 border-b border-gray-50 pb-6">
                                <div className="flex items-center gap-2">
                                    <User size={18} className="text-primary-600" />
                                    <span>Posted by <span className="font-bold text-navy-900">{assignment.studentId.name}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-primary-600" />
                                    <span>Posted {new Date(assignment.createdAt).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="prose prose-navy max-w-none text-gray-700 leading-relaxed">
                                <h3 className="text-navy-900 font-bold mb-4">Assignment Overview</h3>
                                <p className="whitespace-pre-line mb-8">{assignment.description}</p>

                                <h3 className="text-navy-900 font-bold mb-4">Key Objectives</h3>
                                <ul className="list-disc pl-5 space-y-2 mb-8">
                                    <li>Provide academic analysis and guidance</li>
                                    <li>Ensure all reference materials are accurately used</li>
                                    <li>Strict adherence to the provided deadline</li>
                                </ul>

                                {assignment.files?.length > 0 && (
                                    <div className="mb-8">
                                        <h3 className="text-navy-900 font-bold mb-4">Resource Files</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {assignment.files.map((file, i) => (
                                                <a key={i} href={file.url} download className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-gray-100 transition-colors group">
                                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                                                        <FileText size={20} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm font-bold text-navy-900 truncate">{file.name}</div>
                                                        <div className="text-[10px] text-gray-400 font-bold uppercase">{file.type || 'Document'}</div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Academic Integrity Notice */}
                            <div className="mt-10 p-6 bg-red-50 border border-red-100 rounded-2xl flex gap-4">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0">
                                    <AlertTriangle className="text-red-500" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-red-900 mb-1">Academic Integrity Policy</h4>
                                    <p className="text-sm text-red-700 leading-relaxed">
                                        This material is provided for study and reference purposes only. Submission of another person's work as your own is strictly prohibited and constitutes academic misconduct.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bids Section for Student */}
                        {isOwner && assignment.status === 'open' && (
                            <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                                <h2 className="text-2xl font-bold text-navy-900 mb-6">Received Bids ({bids.length})</h2>
                                <div className="space-y-4">
                                    {bids.length > 0 ? bids.map((bid) => (
                                        <div key={bid._id} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex gap-4">
                                                    <div className="w-12 h-12 bg-navy-50 rounded-full flex items-center justify-center text-navy-600 font-bold">
                                                        {bid.freelancerId.name[0]}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-navy-900">{bid.freelancerId.name}</div>
                                                        <div className="text-xs text-gray-400">Expert Rank: <span className="text-primary-600 font-bold uppercase tracking-wider">Top Rated</span></div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-primary-600">${bid.proposedPrice}</div>
                                                    <div className="text-[10px] text-gray-400 font-bold uppercase">Delivery in {bid.deliveryTime} Days</div>
                                                </div>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-6 leading-relaxed italic border-l-4 border-gray-100 pl-4">
                                                "{bid.coverMessage}"
                                            </p>
                                            <button
                                                onClick={() => handleAcceptBid(bid._id)}
                                                className="w-full bg-navy-900 text-white py-3 rounded-xl font-bold hover:bg-primary-600 transition-all shadow-md"
                                            >
                                                Accept Bid & Start
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="text-center py-10 text-gray-400">
                                            No bids received yet.
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Sticky Panel */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-navy-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Estimated Budget</div>
                                    <div className="text-4xl font-bold mb-8 text-primary-400">
                                        ${assignment.budget.min} - ${assignment.budget.max}
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <div className="flex justify-between items-center py-3 border-b border-navy-800">
                                            <span className="text-gray-400 flex items-center gap-2"><Clock size={16} /> Deadline</span>
                                            <span className="font-bold">{new Date(assignment.deadline).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between items-center py-3 border-b border-navy-800">
                                            <span className="text-gray-400 flex items-center gap-2"><ShieldCheck size={16} /> Academic Integrity</span>
                                            <span className="font-bold text-green-400">Mandated</span>
                                        </div>
                                    </div>

                                    {assignment.status === 'open' && !isOwner && (
                                        alreadyBid ? (
                                            <div className="bg-navy-800 p-4 rounded-xl text-center border border-navy-700">
                                                <p className="font-bold text-primary-400 flex items-center justify-center gap-2">
                                                    <CheckCircle size={18} /> Bid Submitted
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">Awaiting evaluation</p>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setShowBidModal(true)}
                                                className="w-full bg-primary-600 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-lg shadow-primary-900/50 hover:-translate-y-1 active:translate-y-0"
                                            >
                                                Submit New Bid
                                            </button>
                                        )
                                    )}

                                    {isOwner && (
                                        <div className="bg-navy-800 p-4 rounded-xl text-center border border-navy-700">
                                            <p className="font-bold text-gray-300">Evaluating Bids</p>
                                            <p className="text-xs text-gray-400 mt-1">Accept a bid to begin the process.</p>
                                        </div>
                                    )}
                                </div>
                                <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary-600 rounded-full opacity-10 -mr-16 -mb-16"></div>
                            </div>

                            <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
                                <h4 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                                    <ShieldCheck size={18} className="text-primary-600" /> AtechLancer Guarantee
                                </h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Payment is securely held in escrow and only released when the solution is approved by the student. Expert work is protected by our ethical compliance framework.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bid Modal */}
            {showBidModal && (
                <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="bg-navy-900 p-6 text-white flex justify-between items-center">
                            <h2 className="text-xl font-bold">Submit Your Expertise</h2>
                            <button onClick={() => setShowBidModal(false)} className="text-gray-400 hover:text-white">×</button>
                        </div>
                        <form onSubmit={handleBidSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-navy-900 mb-2">My Bid ($)</label>
                                    <div className="relative">
                                        <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="number"
                                            required
                                            value={bidData.proposedPrice}
                                            onChange={(e) => setBidData({ ...bidData, proposedPrice: e.target.value })}
                                            className="search-input w-full pl-10"
                                            placeholder="50"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-navy-900 mb-2">Delivery (Days)</label>
                                    <div className="relative">
                                        <Clock size={16} className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="number"
                                            required
                                            value={bidData.deliveryTime}
                                            onChange={(e) => setBidData({ ...bidData, deliveryTime: e.target.value })}
                                            className="search-input w-full pl-10"
                                            placeholder="3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-navy-900 mb-2">Cover Message</label>
                                <textarea
                                    required
                                    value={bidData.coverMessage}
                                    onChange={(e) => setBidData({ ...bidData, coverMessage: e.target.value })}
                                    className="search-input w-full min-h-[120px]"
                                    placeholder="Briefly explain your relevant experience and how you approach this specific assignment..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={submittingBid}
                                className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                            >
                                {submittingBid ? <Loader2 className="animate-spin" /> : <>Submit Bid <Send size={20} /></>}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignmentDetails;
