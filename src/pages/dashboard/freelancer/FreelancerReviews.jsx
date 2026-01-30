import React from 'react';
import { Star } from 'lucide-react';

const FreelancerReviews = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Client Reviews</h1>
                    <p className="page-description">See what people are saying about your work.</p>
                </div>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex' }}>
                                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="var(--accent-500)" color="var(--accent-500)" />)}
                            </div>
                            <span style={{ fontWeight: 'bold', color: 'var(--brand-navy)' }}>5.0</span>
                        </div>
                        <p style={{ color: 'var(--gray-700)', fontStyle: 'italic', marginBottom: '1rem' }}>
                            "Absolutely fantastic work! Delivered ahead of schedule and the code quality was top-notch. Will definitely hire again."
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                C
                            </div>
                            <div>
                                <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>Client Name</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Jan {30 - i}, 2026</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FreelancerReviews;
