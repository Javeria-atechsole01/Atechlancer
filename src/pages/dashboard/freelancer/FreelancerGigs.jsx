import React from 'react';
import { Briefcase, Clock, DollarSign, CheckCircle } from 'lucide-react';

const FreelancerGigs = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">My Gigs</h1>
                    <p className="page-description">Manage your service offerings.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    + Create New Gig
                </button>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {/* Gig Card Example 1 */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ height: '160px', backgroundColor: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)' }}>
                        Gig Cover Image
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>Modern React Web Development</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Starting at</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>$250</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--gray-100)', paddingTop: '1rem' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={14} /> 3 Days Delivery
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <CheckCircle size={14} color="var(--accent-500)" /> Active
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Edit</button>
                            <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Preview</button>
                        </div>
                    </div>
                </div>

                {/* Gig Card Example 2 */}
                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ height: '160px', backgroundColor: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)' }}>
                        Gig Cover Image
                    </div>
                    <div style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>Python AI Scripting</h3>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Starting at</span>
                            <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>$100</span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--gray-100)', paddingTop: '1rem' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <Clock size={14} /> 2 Days Delivery
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                <CheckCircle size={14} color="var(--accent-500)" /> Active
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                            <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Edit</button>
                            <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Preview</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FreelancerGigs;
