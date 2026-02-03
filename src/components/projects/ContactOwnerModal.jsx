import React, { useState } from 'react';
import { X, Send, Briefcase, Users, MessageSquare, CheckCircle } from 'lucide-react';

const ContactOwnerModal = ({ isOpen, onClose, studentName, projectTitle }) => {
    const [status, setStatus] = useState('idle'); // idle, sending, success
    const [formData, setFormData] = useState({
        purpose: 'Hiring',
        message: ''
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('sending');
        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setFormData({ purpose: 'Hiring', message: '' });
            }, 2000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 border border-gray-100 overflow-hidden">

                {status === 'success' ? (
                    <div className="p-12 text-center flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 animate-in zoom-in duration-300">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-navy-900 mb-2">Message Sent!</h3>
                        <p className="text-gray-500">Your message has been sent to {studentName}.</p>
                    </div>
                ) : (
                    <>
                        <div className="bg-navy-900 px-6 py-4 flex justify-between items-center">
                            <div>
                                <h3 className="text-white font-bold text-lg">Contact {studentName}</h3>
                                <p className="text-navy-200 text-xs">Regarding: {projectTitle}</p>
                            </div>
                            <button onClick={onClose} className="text-navy-300 hover:text-white transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Purpose</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['Hiring', 'Collaboration', 'Feedback'].map((type) => (
                                        <button
                                            key={type}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, purpose: type })}
                                            className={`py-2 px-3 rounded-lg text-sm font-semibold border transition-all flex flex-col items-center gap-1 ${formData.purpose === type
                                                    ? 'bg-primary-50 border-primary-500 text-primary-700'
                                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                                                }`}
                                        >
                                            {type === 'Hiring' && <Briefcase size={16} />}
                                            {type === 'Collaboration' && <Users size={16} />}
                                            {type === 'Feedback' && <MessageSquare size={16} />}
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                                <textarea
                                    required
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none min-h-[120px]"
                                    placeholder={`Hi ${studentName}, I saw your project and...`}
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {status === 'sending' ? 'Sending...' : <><Send size={18} /> Send Message</>}
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-3">
                                    By sending, you agree to our anti-spam policy.
                                </p>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default ContactOwnerModal;
