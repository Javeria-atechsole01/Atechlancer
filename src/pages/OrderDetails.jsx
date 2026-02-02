import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ordersService } from '../services/ordersService';
import DeliveryBox from '../components/DeliveryBox';
import RevisionForm from '../components/RevisionForm';
import OrderStatusBadge from '../components/OrderStatusBadge';
import OrderProgress from '../components/marketplace/OrderProgress';
import { useAuth } from '../context/AuthContext';
import { Loader2, MessageSquare, FileText, Download, ShieldCheck } from 'lucide-react';

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

  if (loading) return <div className="flex justify-center p-20 min-h-screen items-center"><Loader2 className="animate-spin text-primary-600" /></div>;
  if (!order) return <div className="p-20 text-center">Order not found</div>;

  const isSeller = order.sellerId?._id === user?.id || order.sellerId?._id === user?._id;
  const isBuyer = order.buyerId?._id === user?.id || order.buyerId?._id === user?._id;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen bg-gray-50/50">
      {/* Header Area */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-navy-900 mb-2">Order #{order._id.substring(0, 8)}</h1>
          <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
            View Order Details <span className="w-1 h-1 rounded-full bg-gray-300"></span> {new Date(order.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-navy-900">${order.totalPrice}</span>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Action Area (Left) */}
        <div className="lg:col-span-2 space-y-6">

          {/* Progress Tracker */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <OrderProgress status={order.status} />
          </div>

          {/* Order Requirements / Context */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg shrink-0 overflow-hidden">
                {order.gigId?.images?.[0] && <img src={order.gigId.images[0]} className="w-full h-full object-cover" alt="Gig" />}
              </div>
              <div>
                <h3 className="font-bold text-navy-900 mb-1">{order.gigId?.title}</h3>
                <div className="flex gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  <span className="bg-gray-100 px-2 py-1 rounded">Standard Package</span>
                  <span className="bg-gray-100 px-2 py-1 rounded">{order.gigId?.deliveryTime} Days</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions based on Role */}
          {isSeller && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <FileText size={20} /> Seller Actions
              </h3>

              {order.status === 'pending' && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="font-bold text-blue-900">Start Order</p>
                    <p className="text-sm text-blue-700">Confirm you have everything you need to start.</p>
                  </div>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                    onClick={() => changeStatus('in_progress')}
                  >
                    Start Working
                  </button>
                </div>
              )}

              {(order.status === 'in_progress' || order.status === 'revision') && (
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Deliver Your Work</h4>
                  <DeliveryBox onDeliver={deliver} />
                </div>
              )}
            </div>
          )}

          {isBuyer && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2">
                <ShieldCheck size={20} /> Buyer Actions
              </h3>

              {order.status === 'delivered' && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-100 p-5 rounded-lg">
                    <h4 className="font-bold text-green-900 mb-2 flex items-center gap-2"><Check size={18} /> Order Delivered</h4>
                    <p className="text-green-800 text-sm mb-4">The seller has delivered your work. Please review it.</p>

                    <div className="flex gap-3">
                      <button
                        className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-green-700 transition-colors shadow-sm"
                        onClick={() => changeStatus('completed')}
                      >
                        Accept & Complete
                      </button>
                      <button className="bg-white text-gray-700 border border-gray-300 px-4 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                        Download Files
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="font-semibold text-gray-700 mb-3">Request a Revision</h4>
                    <RevisionForm onRequest={requestRevision} />
                  </div>
                </div>
              )}
              {order.status === 'completed' && (
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500 font-medium">
                  This order is complete. Leave a review?
                </div>
              )}
            </div>
          )}

        </div>

        {/* Sidebar Info (Right) */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Support</h3>
            <p className="text-sm text-gray-500 mb-4">Having issues with this order?</p>
            <button className="w-full py-2.5 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <MessageSquare size={16} /> Contact Support
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Files</h3>
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <Download className="mx-auto text-gray-400 mb-2" size={24} />
              <p className="text-sm text-gray-500 font-medium">No files uploaded yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
