import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ordersService } from '../services/ordersService';
import DeliveryBox from '../components/DeliveryBox';
import RevisionForm from '../components/RevisionForm';
import OrderStatusBadge from '../components/OrderStatusBadge';
import { useAuth } from '../context/AuthContext';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { user } = useAuth();

  const load = async () => {
    const o = await ordersService.listMine();
    const found = o.find(x => x._id === id);
    setOrder(found || null);
  };

  useEffect(() => { load(); }, [id]);

  const changeStatus = async (status) => {
    await ordersService.updateStatus(id, status);
    load();
  };

  const deliver = async (fd) => {
    await ordersService.deliver(id, fd);
    load();
  };

  const requestRevision = async (message) => {
    await ordersService.requestRevision(id, message);
    load();
  };

  if (!order) return <div>Loading...</div>;
  const isSeller = order.sellerId?._id === user?.id || order.sellerId?._id === user?._id;
  const isBuyer = order.buyerId?._id === user?.id || order.buyerId?._id === user?._id;

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="page-title">{order.gigId?.title}</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <OrderStatusBadge status={order.status} />
          <span>${order.totalPrice}</span>
        </div>
        {isSeller && (
          <div style={{ marginTop: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => changeStatus('in_progress')}>Mark In Progress</button>
            <DeliveryBox onDeliver={deliver} />
          </div>
        )}
        {isBuyer && (
          <div style={{ marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={() => changeStatus('completed')}>Accept Delivery</button>
            <RevisionForm onRequest={requestRevision} />
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
