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
      <div className="admin-loading-state">
        <Loader2 className="animate-spin text-primary-600" size={48} />
        <p>Syncing payment ledger...</p>
      </div>
    );
  }

  return (
    <div className="admin-page-container">
      <header className="admin-page-header">
        <div>
          <h1>Transaction Ledger</h1>
          <p>Real-time platform payment activity and audit trail</p>
        </div>
      </header>

      <div className="admin-table-container">
        {transactions.length === 0 ? (
          <div className="admin-empty-state">
            <CreditCard size={64} color="var(--gray-300)" />
            <h3>No Transactions</h3>
            <p>The platform has not processed any payments yet.</p>
          </div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction Date</th>
                <th>Processor Type</th>
                <th>Amount (Net)</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx._id}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>
                        {new Date(tx.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>
                        {new Date(tx.createdAt).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: 'var(--gray-700)', fontWeight: 600 }}>
                      <div style={{ padding: '6px', background: 'var(--admin-bg)', borderRadius: '8px', color: 'var(--primary-500)' }}>
                        {tx.type === 'bank' ? <Banknote size={16} /> : <CreditCard size={16} />}
                      </div>
                      <span style={{ textTransform: 'capitalize' }}>{tx.type || 'Standard Card'}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: 'var(--admin-primary)', fontSize: '1.1rem' }}>
                      ${(tx.amount / 100).toFixed(2)}
                    </span>
                  </td>
                  <td>
                    <span className={`admin-badge ${tx.status === 'succeeded' || !tx.status ? 'success' : 'danger'}`}>
                      {tx.status || 'succeeded'}
                    </span>
                  </td>
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
