import React from 'react';
import { Check, Circle, Clock, Package, Award } from 'lucide-react';

const OrderProgress = ({ status }) => {
    const steps = [
        { id: 'pending', label: 'Order Placed', icon: Clock },
        { id: 'in_progress', label: 'In Progress', icon: Package },
        { id: 'delivered', label: 'Delivered', icon: Check },
        { id: 'completed', label: 'Completed', icon: Award },
    ];

    // Determine current step index
    const getStepIndex = (s) => {
        if (s === 'cancelled') return -1;
        return steps.findIndex(step => step.id === s) || 0; // Default to 0 if not found (or mapped elsewhere)
    };

    // Mapping complex statuses to simple steps
    const mappedStatus =
        status === 'active' ? 'in_progress' :
            status === 'revision' ? 'delivered' : // Revision essentially means delivery attempted
                status;

    const currentIndex = getStepIndex(mappedStatus);

    return (
        <div className="w-full py-6">
            <div className="relative flex items-center justify-between w-full">

                {/* Background Line */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>

                {/* Colored Progress Line */}
                <div
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-accent-500 -z-10 transition-all duration-500 rounded-full"
                    style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
                ></div>

                {steps.map((step, index) => {
                    const isCompleted = index <= currentIndex;
                    const isCurrent = index === currentIndex;
                    const Icon = step.icon;

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-2">
                            <div
                                className={`
                                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                                    ${isCompleted ? 'bg-accent-500 border-accent-500 text-white shadow-md scale-110' : 'bg-white border-gray-300 text-gray-300'}
                                    ${isCurrent ? 'ring-4 ring-accent-100' : ''}
                                `}
                            >
                                <Icon size={18} strokeWidth={2.5} />
                            </div>
                            <span
                                className={`
                                    text-xs font-bold uppercase tracking-wider transition-colors duration-300
                                    ${isCompleted ? 'text-navy-900' : 'text-gray-400'}
                                `}
                            >
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {status === 'cancelled' && (
                <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-center font-bold text-sm border border-red-100">
                    Order Cancelled
                </div>
            )}
        </div>
    );
};

export default OrderProgress;
