import React, { useState } from 'react';
import { X, Upload, Loader2, AlertCircle } from 'lucide-react';

const RequirementsModal = ({ onClose, onSubmit, price, processing }) => {
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);

    const handleSubmit = () => {
        if (!message.trim()) return;
        onSubmit({ message, files });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-navy-900">Order Requirements</h3>
                        <p className="text-sm text-gray-500">Provide details to start your order</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-3 text-sm text-blue-700">
                        <AlertCircle className="shrink-0" size={20} />
                        <p>The seller needs this information to start working on your order. Please be as detailed as possible.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Instructions & Requirements <span className="text-red-500">*</span></label>
                        <textarea
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none min-h-[120px]"
                            placeholder="Describe what you need, provide links, examples, or specific instructions..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Attachments (Optional)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                            <Upload className="mx-auto text-gray-400 group-hover:text-primary-500 mb-2 transition-colors" size={24} />
                            <p className="text-sm text-gray-500 font-medium">Click to upload files</p>
                            <p className="text-xs text-gray-400 mt-1">Max 50MB (Images, PDF, ZIP)</p>
                            {/* File input would go here - Mock implementation for now */}
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 flex items-center gap-2 text-navy-900 font-bold text-lg order-2 sm:order-1">
                        <span>Total:</span>
                        <span>${price}</span>
                    </div>
                    <button
                        className="flex-1 bg-navy-900 text-white py-3 rounded-lg font-bold hover:bg-navy-800 transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2 order-1 sm:order-2"
                        onClick={handleSubmit}
                        disabled={!message.trim() || processing}
                        style={{ backgroundColor: 'var(--brand-navy)' }}
                    >
                        {processing ? <Loader2 className="animate-spin" /> : 'Confirm & Pay'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RequirementsModal;
