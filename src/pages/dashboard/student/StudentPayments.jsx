import React from 'react';
import './student.css';

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
                <button className="btn btn-primary">
                    Withdraw Funds
                </button>
            </div>

            <div className="card dashboard-table-wrapper">
                <table className="dashboard-table">
                    <thead>
                        <tr>
                            <th>Reference ID</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th className="text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(txn => (
                            <tr key={txn.id}>
                                <td className="text-mono-gray">{txn.id}</td>
                                <td>{txn.date}</td>
                                <td className="item-meta">{txn.description}</td>
                                <td>
                                    <span className="tag tag-verification">
                                        {txn.status}
                                    </span>
                                </td>
                                <td className={`text-right ${txn.amount.startsWith('+') ? 'text-amount-pos' : 'text-amount-neg'}`}>
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
