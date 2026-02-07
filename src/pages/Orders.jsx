import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersService } from '../services/ordersService';
import OrderStatusBadge from '../components/OrderStatusBadge';
import './orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    ordersService.listMine().then(setOrders);
  }, []);

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="card">
          <h1 className="page-title" style={{ marginBottom: '2rem' }}>My Orders</h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {orders.length > 0 ? orders.map(o => (
              <div key={o._id} className="flex-row-between" style={{ padding: '1rem', border: '1px solid var(--gray-100)', borderRadius: '12px' }}>
                <div>
                  <strong style={{ color: 'var(--primary-900)' }}>{o.gigId?.title}</strong>
                  <div style={{ color: 'var(--primary-600)', fontWeight: 700, marginTop: '0.25rem' }}>${o.totalPrice}</div>
                </div>
                <div className="flex-row-gap">
                  <OrderStatusBadge status={o.status} />
                  <Link to={`/orders/${o._id}`} className="btn btn-secondary btn-sm" style={{ padding: '0.5rem 1.25rem' }}>
                    View Details
                  </Link>
                </div>
              </div>
            )) : (
              <div className="empty-placeholder-box">
                <p>No orders found yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

