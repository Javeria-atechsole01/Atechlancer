import React from 'react';

const EmployerContracts = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Contracts</h1>
                    <p className="page-description">Track milestones and payments for active hires.</p>
                </div>
            </div>

            <div className="card">
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                            <th style={{ padding: '1rem' }}>Contract</th>
                            <th style={{ padding: '1rem' }}>Freelancer</th>
                            <th style={{ padding: '1rem' }}>Start Date</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Paid / Total</th>
                            <th style={{ padding: '1rem' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                            <td style={{ padding: '1rem', fontWeight: '600' }}>E-commerce UI Design</td>
                            <td style={{ padding: '1rem' }}>Alex Designer</td>
                            <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>Jan 10, 2026</td>
                            <td style={{ padding: '1rem' }}><span className="tag" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent-text)', margin: 0 }}>Active</span></td>
                            <td style={{ padding: '1rem' }}>$200 / $500</td>
                            <td style={{ padding: '1rem' }}><button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>Manage</button></td>
                        </tr>
                        <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                            <td style={{ padding: '1rem', fontWeight: '600' }}>Blog Content Writing</td>
                            <td style={{ padding: '1rem' }}>Sarah Writer</td>
                            <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>Jan 05, 2026</td>
                            <td style={{ padding: '1rem' }}><span className="tag" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--gray-600)', margin: 0 }}>Completed</span></td>
                            <td style={{ padding: '1rem' }}>$150 / $150</td>
                            <td style={{ padding: '1rem' }}><button className="btn btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployerContracts;
