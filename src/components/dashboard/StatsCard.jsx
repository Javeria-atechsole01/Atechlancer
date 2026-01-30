import React from 'react';

const StatsCard = ({ title, value, subtext, icon, trend, highlightColor }) => {
    return (
        <div className="card stats-card">
            <div className="card-header">
                <span className="card-title">{title}</span>
                {icon && <div className="card-icon">{icon}</div>}
            </div>

            <div
                className="card-value"
                style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: highlightColor || 'var(--brand-navy)',
                    marginTop: '0.5rem'
                }}
            >
                {value}
            </div>

            {subtext && (
                <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    {subtext}
                </p>
            )}

            {trend && (
                <div className={`trend ${trend.isPositive ? 'positive' : 'negative'}`}>
                    {trend.value}
                </div>
            )}
        </div>
    );
};

export default StatsCard;
