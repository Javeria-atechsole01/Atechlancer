import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));
        onSubmit({ rating, feedback });
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-navy-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
                <div className="bg-navy-900 p-6 text-white text-center">
                    <h2 className="text-xl font-bold">Rate Your Experience</h2>
                    <p className="text-gray-400 text-xs mt-1">Your feedback helps maintain academic quality</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    className={`p-1 transition-all ${s <= (hover || rating) ? 'text-yellow-400 scale-125' : 'text-gray-200'}`}
                                    onMouseEnter={() => setHover(s)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(s)}
                                >
                                    <Star size={32} fill={s <= (hover || rating) ? "currentColor" : "none"} />
                                </button>
                            ))}
                        </div>
                        <p className="text-sm font-bold text-navy-900 uppercase tracking-widest">
                            {rating === 1 && 'Poor'}
                            {rating === 2 && 'Fair'}
                            {rating === 3 && 'Average'}
                            {rating === 4 && 'Good'}
                            {rating === 5 && 'Excellent'}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-navy-900 mb-3 flex items-center gap-2">
                            <MessageSquare size={18} className="text-primary-600" /> Feedback Text
                        </label>
                        <textarea
                            required
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                            className="search-input w-full min-h-[120px]"
                            placeholder="Share your thoughts on the solution quality, professionalism, and promptness..."
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                        >
                            Later
                        </button>
                        <button
                            type="submit"
                            disabled={loading || rating === 0}
                            className="flex-[2] bg-primary-600 text-white px-6 py-4 rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-100 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Submit Review <CheckCircle size={20} /></>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewModal;
