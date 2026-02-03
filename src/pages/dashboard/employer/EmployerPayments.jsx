import React, { useEffect, useState } from 'react';
import { CreditCard, Download, Banknote } from 'lucide-react';
import { paymentService } from '../../../services/paymentService';

const EmployerPayments = () => {
    const [methods, setMethods] = useState([]);
    const [invoices, setInvoices] = useState([]);
    const [adding, setAdding] = useState(false);
    const [pmId, setPmId] = useState('');
    const [paying, setPaying] = useState(false);
    const [receiptFile, setReceiptFile] = useState(null);
    const [txnRef, setTxnRef] = useState('');
    const [orderId, setOrderId] = useState('');
    const [bankSubmitting, setBankSubmitting] = useState(false);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const amountDue = 45000; // cents, example due

    const loadData = async () => {
        try {
            const m = await paymentService.listPaymentMethods();
            setMethods(m.results || []);
            const inv = await paymentService.getInvoices();
            setInvoices(inv.results || []);
        } catch (err) {
            console.error('Load payments data failed', err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAddMethod = async () => {
        if (!pmId) return alert('Enter Stripe paymentMethodId (e.g. pm_...)');
        setAdding(true);
        try {
            await paymentService.addPaymentMethod(pmId);
            setPmId('');
            await loadData();
            alert('Payment method added');
        } catch (err) {
            alert('Failed to add method');
            console.error(err);
        } finally {
            setAdding(false);
        }
    };

    const handlePayNow = async () => {
        setPaying(true);
        try {
            const intent = await paymentService.createIntent({
                amount: amountDue,
                currency: 'usd',
                userId: user._id
            });
            const confirm = await paymentService.confirmPayment(intent.paymentIntentId);
            await loadData();
            alert('Payment succeeded');
        } catch (err) {
            alert('Payment failed');
            console.error(err);
        } finally {
            setPaying(false);
        }
    };

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
                    {methods.length === 0 ? (
                        <div style={{ color: 'var(--gray-500)', marginBottom: '1rem' }}>No methods yet.</div>
                    ) : methods.map((m) => (
                        <div key={m._id} style={{ padding: '1rem', border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ fontSize: '1.5rem' }}>💳</div>
                                <div>
                                    <div style={{ fontWeight: '600', color: 'var(--brand-navy)' }}>{m.brand || 'Card'} ending in {m.last4}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Expires {String(m.expMonth).padStart(2, '0')}/{String(m.expYear).slice(-2)}</div>
                                </div>
                            </div>
                            {m.isDefault && <span className="tag tag-verification">Default</span>}
                        </div>
                    ))}
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                        <input
                            className="search-input w-full"
                            placeholder="Stripe paymentMethodId (pm_...)"
                            value={pmId}
                            onChange={(e) => setPmId(e.target.value)}
                        />
                        <button
                            className="btn btn-secondary"
                            disabled={adding}
                            onClick={handleAddMethod}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <CreditCard size={18} /> {adding ? 'Adding...' : 'Add New Method'}
                        </button>
                    </div>
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
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handlePayNow} disabled={paying}>
                        {paying ? 'Processing...' : 'Pay Now'}
                    </button>
                </div>
            </div>

            <div className="card" style={{ marginTop: '2rem' }}>
                <h3 className="card-title" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Banknote size={18} /> Bank Transfer (Pakistan-friendly)
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ border: '1px solid var(--gray-200)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                        <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Bank Account Details</div>
                        <div style={{ color: 'var(--gray-700)', lineHeight: 1.8 }}>
                            <div>Bank: Meezan Bank</div>
                            <div>Account Name: Atechlancer</div>
                            <div>Account Number: 0001234567890</div>
                            <div>IBAN: PK00MEZN0000000001234567</div>
                            <div>Reference: Use your Order ID</div>
                        </div>
                        <div className="alert" style={{ marginTop: '0.75rem' }}>
                            After making the transfer, upload the receipt and your transaction/reference number.
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'grid', gap: '0.75rem' }}>
                            <input
                                className="search-input"
                                placeholder="Order ID"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                            <input
                                className="search-input"
                                placeholder="Transaction Reference (e.g. bank slip ref)"
                                value={txnRef}
                                onChange={(e) => setTxnRef(e.target.value)}
                            />
                            <input
                                className="search-input"
                                type="number"
                                placeholder="Amount (in cents e.g. 45000)"
                                defaultValue={amountDue}
                                onChange={(e) => {}}
                                disabled
                            />
                            <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                            />
                            <button
                                className="btn btn-primary"
                                disabled={!orderId || !txnRef || !receiptFile || bankSubmitting}
                                onClick={async () => {
                                    try {
                                        setBankSubmitting(true);
                                        await paymentService.submitBankRequest({
                                            orderId,
                                            amount: amountDue,
                                            txnRef,
                                            receiptFile
                                        });
                                        setOrderId('');
                                        setTxnRef('');
                                        setReceiptFile(null);
                                        alert('Bank payment request submitted. We will verify it soon.');
                                    } catch (err) {
                                        alert('Failed to submit request');
                                        console.error(err);
                                    } finally {
                                        setBankSubmitting(false);
                                    }
                                }}
                            >
                                {bankSubmitting ? 'Submitting...' : 'Submit Bank Transfer Proof'}
                            </button>
                        </div>
                    </div>
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
                        {invoices.length === 0 ? (
                            <tr><td style={{ padding: '1rem', color: 'var(--gray-500)' }} colSpan={5}>No invoices yet.</td></tr>
                        ) : invoices.map(inv => (
                            <tr key={inv._id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>{new Date(inv.createdAt).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>{inv.invoiceNumber}</td>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>${(inv.amount / 100).toFixed(2)}</td>
                                <td style={{ padding: '1rem' }}><span className="tag" style={{ backgroundColor: 'var(--accent-bg)', color: 'var(--accent-text)' }}>{inv.status}</span></td>
                                <td style={{ padding: '1rem', textAlign: 'right' }}><button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}><Download size={18} /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployerPayments;
