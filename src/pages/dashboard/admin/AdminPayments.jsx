import React, { useEffect, useState } from 'react';
import { adminService } from '../../../services/adminService';
import { Loader2, CreditCard, Banknote } from 'lucide-react';
import '../../admin/admin.css';

const AdminPayments = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminService.getTransactions({ limit: 20 });
        setTransactions(data.transactions || []);
      } catch {
        setTransactions([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="flex-center" style={{ minHeight: '40vh' }}>
          <Loader2 className="animate-spin text-primary-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <div>
          <h1>Admin Payments</h1>
          <p>Recent platform transactions</p>
        </div>
      </div>

      <div className="card">
        {transactions.length === 0 ? (
          <div className="panel-empty">
            <CreditCard size={64} />
            <h3>No transactions</h3>
            <p>No recent payment activity</p>
          </div>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                <th style={{ padding: '1rem' }}>Date</th>
                <th style={{ padding: '1rem' }}>Type</th>
                <th style={{ padding: '1rem' }}>Amount</th>
                <th style={{ padding: '1rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx._id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '1rem' }}>{new Date(tx.createdAt).toLocaleString()}</td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    {tx.type === 'bank' ? <Banknote size={16} /> : <CreditCard size={16} />}
                    {tx.type || 'card'}
                  </td>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>${(tx.amount / 100).toFixed(2)}</td>
                  <td style={{ padding: '1rem' }}><span className="tag">{tx.status || 'succeeded'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPayments;
