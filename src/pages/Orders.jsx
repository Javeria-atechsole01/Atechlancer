import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersService } from '../services/ordersService';
import OrderStatusBadge from '../components/OrderStatusBadge';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    ordersService.listMine().then(setOrders);
  }, []);

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="page-title">My Orders</h1>
        {orders.map(o => (
          <div key={o._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            <div>
              <strong>{o.gigId?.title}</strong> - ${o.totalPrice}
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <OrderStatusBadge status={o.status} />
              <Link to={`/orders/${o._id}`} className="auth-link">View</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
