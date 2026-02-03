import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';

const ProposalModal = ({ onClose, onSubmit, processing, sellerName }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (!message.trim()) return;
        onSubmit(message);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-lg font-bold text-navy-900">Contact {sellerName}</h3>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
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

                <div className="p-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        disabled={processing}
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={!message.trim() || processing}
                        className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-bold hover:bg-primary-700 transition-all shadow-sm flex items-center gap-2 disabled:opacity-70"
                    >
                        {processing ? <Loader2 className="animate-spin" size={18} /> : <> <Send size={18} /> Send Message </>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProposalModal;
