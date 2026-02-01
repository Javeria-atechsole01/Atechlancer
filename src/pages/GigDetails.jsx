import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gigsService } from '../services/gigsService';
import { ordersService } from '../services/ordersService';
import { Clock, RefreshCw, Check, Star, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    loadGig();
  }, [id]);

  const loadGig = async () => {
    try {
      const data = await gigsService.get(id);
      setGig(data);
    } catch (err) {
      console.error("Failed to load gig", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOrder = async () => {
    setProcessing(true);
    try {
      const order = await ordersService.create(id);
      navigate(`/dashboard/orders/${order._id}`);
    } catch (err) {
      alert('Failed to create order. You might be the seller or not logged in.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  if (!gig) return <div className="text-center p-20">Gig not found.</div>;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-navy-900 mb-4">{gig.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={gig.sellerId?.photo || 'https://via.placeholder.com/40'}
                  alt={gig.sellerId?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="font-semibold">{gig.sellerId?.name}</span>
              </div>
              <div className="flex items-center gap-1 text-yellow-500 font-medium">
                <Star size={16} fill="currentColor" />
                <span>{gig.rating || 0}</span>
                <span className="text-gray-400">({gig.reviewsCount || 0})</span>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
            {gig.images && gig.images.length > 0 ? (
              <img src={gig.images[0]} alt={gig.title} className="w-full h-auto object-cover max-h-[500px]" />
            ) : (
              <div className="h-[400px] flex items-center justify-center text-gray-400">No Image Available</div>
            )}
          </div>

          {/* Description */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4 text-navy-900">About This Gig</h3>
            <div className="prose max-w-none text-gray-700 whitespace-pre-line">
              {gig.description}
            </div>
          </div>

          {/* FAQs */}
          {gig.faqs && gig.faqs.length > 0 && (
            <div className="card">
              <h3 className="text-xl font-bold mb-6 text-navy-900">FAQ</h3>
              <div className="space-y-4">
                {gig.faqs.map((faq, index) => (
                  <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                    <button
                      className="w-full flex justify-between items-center text-left font-medium text-lg text-gray-800"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      {faq.question}
                      {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {expandedFaq === index && (
                      <p className="mt-2 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Order Box */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24 border-2 border-primary-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-semibold text-gray-600">Standard Package</span>
              <span className="text-3xl font-bold text-navy-900">${gig.price}</span>
            </div>

            <p className="text-gray-600 mb-6 text-sm">{gig.description?.substring(0, 100)}...</p>

            <div className="flex items-center gap-6 mb-6 text-sm font-semibold text-gray-700">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                {gig.deliveryTime} Days Delivery
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} />
                {gig.revisions} Revisions
              </div>
            </div>

            {gig.features && gig.features.length > 0 && (
              <ul className="space-y-2 mb-8">
                {gig.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 mt-0.5 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <button
              onClick={handleOrder}
              disabled={processing}
              className="btn btn-primary w-full py-3 text-lg flex justify-center items-center gap-2"
            >
              {processing ? <Loader2 className="animate-spin" /> : 'Continue to Order'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
