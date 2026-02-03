import React, { useEffect, useState } from 'react';
import { paymentService } from '../../../services/paymentService';
import { CheckCircle, XCircle } from 'lucide-react';

const AdminPayments = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await paymentService.getPendingBankRequests();
      setRequests(res.results || []);
    } catch (err) {
      console.error('Failed to load pending payments', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const verify = async (id) => {
    try {
      await paymentService.verifyBankRequest(id);
      await load();
    } catch (err) {
      console.error('Verify failed', err);
      alert('Verify failed');
    }
  };

  const reject = async (id) => {
    try {
      await paymentService.rejectBankRequest(id);
      await load();
    } catch (err) {
      console.error('Reject failed', err);
      alert('Reject failed');
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1 className="page-title">Pending Bank Payments</h1>
          <p className="page-description">Review receipts and verify or reject.</p>
        </div>
      </div>

      <div className="card">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>User</th>
              <th style={{ padding: '1rem' }}>Order</th>
              <th style={{ padding: '1rem' }}>Amount</th>
              <th style={{ padding: '1rem' }}>Txn Ref</th>
              <th style={{ padding: '1rem' }}>Receipt</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td style={{ padding: '1rem' }} colSpan={7}>Loading...</td>
              </tr>
            ) : requests.length === 0 ? (
              <tr>
                <td style={{ padding: '1rem' }} colSpan={7}>No pending requests.</td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r._id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {r.userId?.name} <div style={{ color: 'var(--gray-500)', fontSize: '0.8rem' }}>{r.userId?.email}</div>
                  </td>
                  <td style={{ padding: '1rem' }}>{r.orderId?._id}</td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>${(r.amount / 100).toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}>{r.txnRef}</td>
                  <td style={{ padding: '1rem' }}>
                    <a href={r.receiptImage} target="_blank" rel="noreferrer">View</a>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-primary" onClick={() => verify(r._id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <CheckCircle size={18} /> Verify
                      </button>
                      <button className="btn btn-secondary" onClick={() => reject(r._id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <XCircle size={18} /> Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayments;
