import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersService } from '../services/ordersService';
import { Loader2 } from 'lucide-react';
import './orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await ordersService.listMine();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex-center min-h-screen">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="page-title" style={{ marginBottom: '1rem' }}>My Orders</h1>
        {orders.length === 0 ? (
          <div className="empty-placeholder-box" style={{ marginTop: '2rem' }}>
            No orders yet.
          </div>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', background: 'white', borderRadius: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                <th style={{ padding: '1rem' }}>Order #</th>
                <th style={{ padding: '1rem' }}>Gig</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(o => (
                <tr key={o._id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>#{String(o._id).substring(0, 8)}</td>
                  <td style={{ padding: '1rem' }}>{o.gigId?.title || 'Untitled Gig'}</td>
                  <td style={{ padding: '1rem' }}><span className="tag">{o.status}</span></td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <Link className="btn btn-secondary" to={`/orders/${o._id}`}>View</Link>
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

export default Orders;
