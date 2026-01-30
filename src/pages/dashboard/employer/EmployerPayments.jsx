import React from 'react';
import { CreditCard, Download } from 'lucide-react';

const EmployerPayments = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Billing & Payments</h1>
                    <p className="page-description">Manage your payment methods and invoices.</p>
                </div>
            </div>

            <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Payment Methods</h3>
                    <div style={{ padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ fontSize: '1.5rem' }}>💳</div>
                            <div>
                                <div style={{ fontWeight: '600', color: 'var(--brand-navy)' }}>Visa ending in 4242</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Expires 12/28</div>
                            </div>
                        </div>
                        <span className="tag tag-verification">Default</span>
                    </div>
                    <button className="btn btn-secondary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <CreditCard size={18} /> Add New Method
                    </button>
                </div>

                <div className="card">
                    <h3 className="card-title" style={{ marginBottom: '1rem' }}>Billing Summary</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--gray-600)' }}>Current Balance</span>
                        <span style={{ fontWeight: 'bold' }}>$0.00</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: 'var(--gray-600)' }}>Unbilled Activity</span>
                        <span style={{ fontWeight: 'bold' }}>$450.00</span>
                    </div>
                    <div style={{ borderTop: '1px solid var(--gray-100)', marginTop: '0.5rem', paddingTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontWeight: '600' }}>Total Due</span>
                        <span style={{ fontWeight: 'bold', color: 'var(--brand-navy)', fontSize: '1.25rem' }}>$450.00</span>
                    </div>
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Pay Now</button>
                </div>
            </div>

            <div className="card" style={{ marginTop: '2rem' }}>
                <h3 className="card-title" style={{ marginBottom: '1rem' }}>Invoice History</h3>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                            <th style={{ padding: '1rem' }}>Date</th>
                            <th style={{ padding: '1rem' }}>Invoice #</th>
                            <th style={{ padding: '1rem' }}>Amount</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem', textAlign: 'right' }}>Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ borderBottom: '1px solid var(--gray-100)' }}>
                            <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>Jan 01, 2026</td>
                            <td style={{ padding: '1rem' }}>INV-2026-001</td>
                            <td style={{ padding: '1rem', fontWeight: 'bold' }}>$500.00</td>
                            <td style={{ padding: '1rem' }}><span className="tag" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent-text)' }}>Paid</span></td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}><button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}><Download size={18} /></button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployerPayments;
