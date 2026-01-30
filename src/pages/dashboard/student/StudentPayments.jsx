import React from 'react';

const StudentPayments = () => {
    const transactions = [
        { id: 'TXN-001', date: 'Jan 28, 2026', description: 'Withdrawal to Bank', amount: '-$50.00', status: 'Completed' },
        { id: 'TXN-002', date: 'Jan 20, 2026', description: 'Prize Money - Hackathon', amount: '+$100.00', status: 'Completed' },
        { id: 'TXN-003', date: 'Jan 15, 2026', description: 'Course Purchase', amount: '-$20.00', status: 'Completed' },
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Payment History</h1>
                    <p className="page-description">View your earnings and potential expenses.</p>
                </div>
                <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>
                    Withdraw Funds
                </button>
            </div>

            <div className="card">
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                            <th style={{ padding: '1rem', color: 'var(--gray-500)', fontSize: '0.875rem' }}>Reference ID</th>
                            <th style={{ padding: '1rem', color: 'var(--gray-500)', fontSize: '0.875rem' }}>Date</th>
                            <th style={{ padding: '1rem', color: 'var(--gray-500)', fontSize: '0.875rem' }}>Description</th>
                            <th style={{ padding: '1rem', color: 'var(--gray-500)', fontSize: '0.875rem' }}>Status</th>
                            <th style={{ padding: '1rem', color: 'var(--gray-500)', fontSize: '0.875rem', textAlign: 'right' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(txn => (
                            <tr key={txn.id} style={{ borderBottom: '1px solid var(--gray-50)' }}>
                                <td style={{ padding: '1rem', fontFamily: 'monospace', color: 'var(--gray-600)' }}>{txn.id}</td>
                                <td style={{ padding: '1rem', color: 'var(--gray-900)' }}>{txn.date}</td>
                                <td style={{ padding: '1rem', color: 'var(--gray-700)' }}>{txn.description}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        color: 'var(--accent-text)',
                                        backgroundColor: 'var(--accent-bg)',
                                        padding: '0.25rem 0.5rem',
                                        borderRadius: '4px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600'
                                    }}>
                                        {txn.status}
                                    </span>
                                </td>
                                <td style={{
                                    padding: '1rem',
                                    textAlign: 'right',
                                    fontWeight: 'bold',
                                    color: txn.amount.startsWith('+') ? 'var(--accent-500)' : '#ef4444'
                                }}>
                                    {txn.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentPayments;
