import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ordersService } from '../services/ordersService';
import DeliveryBox from '../components/DeliveryBox';
import RevisionForm from '../components/RevisionForm';
import OrderStatusBadge from '../components/OrderStatusBadge';
import OrderProgress from '../components/marketplace/OrderProgress';
import { useAuth } from '../context/AuthContext';
import { Loader2, MessageSquare, FileText, Download, ShieldCheck, Check } from 'lucide-react';
import './orders.css';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const o = await ordersService.listMine();
      const found = o.find(x => x._id === id);
      setOrder(found || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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

  if (loading) return (
    <div className="flex-center min-h-screen">
      <Loader2 className="animate-spin text-accent" size={48} />
    </div>
  );

  if (!order) return <div className="empty-placeholder-box" style={{ margin: '5rem auto', maxWidth: '400px' }}>Order not found</div>;

  const isSeller = order.sellerId?._id === user?.id || order.sellerId?._id === user?._id;
  const isBuyer = order.buyerId?._id === user?.id || order.buyerId?._id === user?._id;

  return (
    <div className="order-details-page">
      <div className="order-details-container">

        {/* Header Area */}
        <div className="order-header">
          <div className="order-id-section">
            <h1>Order #{order._id.substring(0, 8)}</h1>
            <div className="order-meta-info">
              <span>View Order Details</span>
              <span className="dot-separator"></span>
              <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="order-price-status">
            <span className="order-total-price">${order.totalPrice}</span>
            <OrderStatusBadge status={order.status} />
          </div>
        </div>

        <div className="order-layout-grid">
          {/* Main Action Area (Left) */}
          <div className="order-main-content">

            {/* Progress Tracker */}
            <div className="order-card">
              <OrderProgress status={order.status} />
            </div>

            {/* Order Requirements / Context */}
            <div className="order-card">
              <h3 className="order-card-title">
                <FileText size={20} style={{ color: 'var(--gray-400)' }} /> Order Requirements
              </h3>

              <div className="gig-brief-row">
                <img
                  src={order.gigId?.images?.[0] || 'https://via.placeholder.com/64'}
                  className="gig-brief-image"
                  alt="Gig"
                />
                <div className="gig-brief-details">
                  <h3>{order.gigId?.title}</h3>
                  <div className="package-badges">
                    <span className="package-badge-mini">Standard Package</span>
                    <span className="package-badge-mini">{order.gigId?.deliveryTime} Days</span>
                  </div>
                </div>
              </div>

              <div className="instructions-box">
                <p className="instructions-label">Instructions</p>
                <div className="instructions-text">
                  {order.requirements?.message || <span style={{ color: 'var(--gray-400)', fontStyle: 'italic' }}>No specific instructions provided.</span>}
                </div>

                {order.requirements?.files?.length > 0 && (
                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-200)' }}>
                    <p className="instructions-label">Attachments</p>
                    <ul className="file-link-list">
                      {order.requirements.files.map((file, i) => (
                        <li key={i}>
                          <a href={file} target="_blank" rel="noopener noreferrer" className="file-link-item">
                            <Download size={14} /> Attachment {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Actions based on Role */}
            {isSeller && (
              <div className="order-card">
                <h3 className="order-card-title">
                  <FileText size={20} /> Seller Actions
                </h3>

                {order.status === 'pending' && (
                  <div className="action-banner banner-blue">
                    <div className="banner-text banner-text-blue">
                      <h4>Start Order</h4>
                      <p>Confirm you have everything you need to start.</p>
                    </div>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 1.5rem' }}
                      onClick={() => changeStatus('in_progress')}
                    >
                      Start Working
                    </button>
                  </div>
                )}

                {(order.status === 'in_progress' || order.status === 'revision') && (
                  <div style={{ marginTop: '1rem' }}>
                    <h4 style={{ fontWeight: 700, color: 'var(--gray-700)', marginBottom: '1rem' }}>Deliver Your Work</h4>
                    <DeliveryBox onDeliver={deliver} />
                  </div>
                )}
              </div>
            )}

            {isBuyer && (
              <div className="order-card">
                <h3 className="order-card-title">
                  <ShieldCheck size={20} /> Buyer Actions
                </h3>

                {order.status === 'delivered' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="action-banner banner-green">
                      <div className="banner-text banner-text-green">
                        <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Check size={18} /> Order Delivered
                        </h4>
                        <p>The seller has delivered your work. Please review it.</p>
                      </div>

                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button
                          className="btn btn-primary"
                          style={{ padding: '0.75rem 1.5rem' }}
                          onClick={() => changeStatus('completed')}
                        >
                          Accept & Complete
                        </button>
                      </div>
                    </div>

                    <div style={{ paddingTop: '1.5rem', borderTop: '1px solid var(--gray-100)' }}>
                      <h4 style={{ fontWeight: 700, color: 'var(--gray-700)', marginBottom: '1rem' }}>Request a Revision</h4>
                      <RevisionForm onRequest={requestRevision} />
                    </div>
                  </div>
                )}
                {order.status === 'completed' && (
                  <div className="empty-placeholder-box">
                    This order is complete. Leave a review?
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Sidebar Info (Right) */}
          <div className="order-sidebar">
            <div className="order-card">
              <h3 style={{ fontWeight: 800, color: 'var(--primary-900)', marginBottom: '1rem' }}>Support</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '1.5rem' }}>Having issues with this order?</p>
              <button className="btn btn-secondary w-full" style={{ justifyContent: 'center', display: 'flex', gap: '0.5rem' }}>
                <MessageSquare size={16} /> Contact Support
              </button>
            </div>

            <div className="order-card">
              <h3 style={{ fontWeight: 800, color: 'var(--primary-900)', marginBottom: '1rem' }}>Files</h3>
              <div className="empty-placeholder-box" style={{ padding: '3rem 1rem' }}>
                <Download style={{ margin: '0 auto 1rem', color: 'var(--gray-300)' }} size={32} />
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-400)', fontWeight: 600 }}>No files uploaded yet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
