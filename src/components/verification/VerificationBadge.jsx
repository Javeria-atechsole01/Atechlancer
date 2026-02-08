import React from 'react';
import { CheckCircle, Shield } from 'lucide-react';
import './verification.css';

const VerificationBadge = ({ verified = false, level = 'basic', size = 'medium', showLabel = true }) => {
    const sizeClasses = {
        small: 'badge-sm',
        medium: 'badge-md',
        large: 'badge-lg'
    };

    const levelInfo = {
        basic: {
            label: 'Verified',
            color: 'badge-basic'
        },
        advanced: {
            label: 'Advanced Verified',
            color: 'badge-advanced'
        },
        expert: {
            label: 'Expert Verified',
            color: 'badge-expert'
        }
    };

    if (!verified) {
        return null;
    }

    const info = levelInfo[level] || levelInfo.basic;
    const iconSize = size === 'small' ? 14 : size === 'large' ? 24 : 18;

    return (
        <div className={`verification-badge ${sizeClasses[size]} ${info.color}`}>
            <Shield size={iconSize} fill="currentColor" />
            {showLabel && <span className="badge-label">{info.label}</span>}
        </div>
    );
};

export default VerificationBadge;
