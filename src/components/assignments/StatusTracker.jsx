import React from 'react';
import { CheckCircle, Clock, FileCheck, RefreshCw, Star } from 'lucide-react';

const StatusTracker = ({ status }) => {
    const states = [
        { key: 'open', label: 'Open', icon: <Clock size={18} /> },
        { key: 'in_progress', label: 'In Progress', icon: <RefreshCw size={18} /> },
        { key: 'submitted', label: 'Submitted', icon: <FileCheck size={18} /> },
        { key: 'completed', label: 'Completed', icon: <CheckCircle size={18} /> }
    ];

    const currentIdx = states.findIndex(s => s.key === status);
    const revisionIdx = status === 'revision_requested' ? 2 : -1;

    return (
        <div className="relative py-4">
            <div className="flex justify-between items-center relative z-10">
                {states.map((s, i) => {
                    const isActive = i <= (currentIdx === -1 ? revisionIdx : currentIdx);
                    const isProcessing = s.key === status || (s.key === 'submitted' && status === 'revision_requested');

                    return (
                        <div key={s.key} className="flex flex-col items-center">
                            <div className={`
                                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500
                                ${isActive ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-100' : 'bg-white border-gray-200 text-gray-300'}
                                ${isProcessing ? 'animate-pulse scale-110' : ''}
                            `}>
                                {s.icon}
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider mt-3 whitespace-nowrap ${isActive ? 'text-navy-900' : 'text-gray-400'}`}>
                                {s.label}
                                {s.key === 'submitted' && status === 'revision_requested' && (
                                    <span className="block text-red-500 text-[8px]">Revision Requested</span>
                                )}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Progress Bar background */}
            <div className="absolute top-[2.1rem] left-5 right-5 h-0.5 bg-gray-100 -z-0"></div>
            {/* Active Progress Bar */}
            <div
                className="absolute top-[2.1rem] left-5 h-0.5 bg-primary-600 -z-0 transition-all duration-1000 ease-in-out"
                style={{ width: `${(Math.max(0, currentIdx === -1 ? revisionIdx : currentIdx) / (states.length - 1)) * 94}%` }}
            ></div>
        </div>
    );
};

export default StatusTracker;
