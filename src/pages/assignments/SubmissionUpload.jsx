import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import {
    Loader2, Upload, CheckCircle, FileText, Send,
    ArrowLeft, AlertCircle, Clock
} from 'lucide-react';

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
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="text-green-600" size={48} />
                </div>
                <h1 className="text-3xl font-bold text-navy-900 mb-4">Submission Successful!</h1>
                <p className="text-gray-500 max-w-sm mx-auto">
                    Your solution has been sent to the student. They will review it and release payment or request a revision.
                </p>
                <p className="text-gray-400 text-sm mt-8">Redirecting you to the project details...</p>
            </div>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-500 hover:text-navy-900 transition-colors mb-8 font-bold"
                >
                    <ArrowLeft size={20} /> Back
                </button>

                <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-navy-900 mb-2">Upload Submission</h1>
                        <p className="text-gray-500">Submit your final solution or progress draft for review.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="border-2 border-dashed border-gray-200 rounded-2xl p-10 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                            <Upload className="mx-auto text-gray-300 mb-4 group-hover:text-primary-600 transition-colors" size={48} />
                            <p className="text-navy-900 font-bold mb-1">Select Solution Files</p>
                            <p className="text-gray-500 text-sm">Upload PDF, ZIP, or separate source files.</p>
                            <input type="file" className="hidden" multiple />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                                <FileText size={18} className="text-primary-600" /> Comments & Notes
                            </label>
                            <textarea
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                className="search-input w-full min-h-[150px]"
                                placeholder="Explain your approach, list any specific software needed to run the solution, or provide guidance for the student..."
                            />
                        </div>

                        <div className="bg-navy-900 p-6 rounded-2xl text-white flex gap-4">
                            <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center shrink-0">
                                <Clock size={20} />
                            </div>
                            <div className="text-sm">
                                <p className="font-bold mb-1 uppercase tracking-wider text-primary-400">Timely Delivery</p>
                                <p className="text-gray-400">Ensure your submission is uploaded before the deadline to maintain your expert rating.</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-100"
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
