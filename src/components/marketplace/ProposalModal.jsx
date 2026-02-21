import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';

const ProposalModal = ({ onClose, onSubmit, processing, sellerName }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!message.trim()) return;
        onSubmit(message);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 bg-gradient-to-r from-navy-900 to-primary-700 flex justify-between items-center">
                    <div>
                        <h3 className="text-white text-lg font-bold">Contact {sellerName}</h3>
                        <p className="text-navy-200 text-xs">Send a quick message to start the conversation</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-white/80 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none min-h-[150px] resize-none"
                        placeholder={`Hi ${sellerName}, I noticed your gig and would like to discuss...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoFocus
                    />
                    <p className="text-xs text-gray-500 mt-2 text-right">
                        {message.length} characters
                    </p>
                </div>

                <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!message.trim() || processing}
                        className="px-6 py-2.5 rounded-lg font-bold text-white shadow-md flex items-center gap-2 disabled:opacity-70 transition-all"
                        style={{ backgroundImage: 'linear-gradient(90deg, var(--brand-navy), var(--primary-600))' }}
                    >
                        {processing ? <Loader2 className="animate-spin" size={18} /> : <> <Send size={18} /> Send Message </>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProposalModal;
