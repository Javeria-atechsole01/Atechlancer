import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gigsService } from '../services/gigsService';
import { ordersService } from '../services/ordersService';
import { Clock, RefreshCw, Check, Star, ChevronDown, ChevronUp, Loader2, Shield, MessageSquare, Heart, Share2, Award } from 'lucide-react';

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
      navigate(`/orders/${order._id}`);
    } catch (err) {
      alert('Failed to create order. You might be the seller or not logged in.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center p-20 min-h-screen items-center">
      <Loader2 className="animate-spin text-primary-600" size={40} />
    </div>
  );

  if (!gig) return <div className="text-center p-20">Gig not found.</div>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

        {/* LEFT CONTENT (70%) */}
        <div className="lg:col-span-8 space-y-8">

          {/* Breadcrumbs (Mock) */}
          <div className="text-sm text-gray-500 font-medium">
            Marketplace <span className="mx-2">/</span> {gig.category || 'General'} <span className="mx-2">/</span> <span className="text-gray-900">{gig.title}</span>
          </div>

          {/* Header */}
          <div>
            <h1 className="text-3xl font-extrabold text-navy-900 mb-4 leading-tight">{gig.title}</h1>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <img
                  src={gig.sellerId?.photo || 'https://via.placeholder.com/40'}
                  alt={gig.sellerId?.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1">
                    {gig.sellerId?.name}
                    {gig.sellerId?.isVerified && <Check size={14} className="text-accent-500" />}
                  </h3>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Top Rated Seller</span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="flex items-center gap-1.5">
                <span className="flex text-yellow-500"><Star size={16} fill="currentColor" /></span>
                <span className="font-bold text-gray-900">{gig.rating || '5.0'}</span>
                <span className="text-gray-400">({gig.reviewsCount || 24} reviews)</span>
              </div>
              <div className="h-8 w-px bg-gray-200"></div>
              <div className="text-sm text-gray-500 font-medium">3 Orders in Queue</div>
            </div>
          </div>

          {/* Gallery */}
          <div className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm aspect-video relative group">
            {gig.images && gig.images.length > 0 ? (
              <img src={gig.images[0]} alt={gig.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 font-bold text-xl uppercase tracking-widest">No Preview</div>
            )}
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md text-gray-400 hover:text-red-500 transition-colors">
              <Heart size={20} />
            </button>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-navy-900 mb-6">About This Gig</h3>
            <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
              {gig.description}
            </div>
          </div>

          {/* Seller Bio (Simplified) */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-navy-900 mb-6">About The Seller</h3>
            <div className="flex items-start gap-6">
              <img
                src={gig.sellerId?.photo || 'https://via.placeholder.com/100'}
                alt={gig.sellerId?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-50"
              />
              <div>
                <h4 className="font-bold text-lg text-gray-900 mb-1">{gig.sellerId?.name}</h4>
                <p className="text-gray-500 mb-4 text-sm">{gig.sellerId?.title || 'Professional Freelancer'}</p>
                <p className="text-gray-600 leading-relaxed mb-4">{gig.sellerId?.bio || 'Experienced freelancer delivering high quality work.'}</p>
                <button className="btn btn-outline btn-sm">Contact Me</button>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {gig.faqs && gig.faqs.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
              <h3 className="text-xl font-bold text-navy-900 mb-6">Frequent Questions</h3>
              <div className="divide-y divide-gray-100">
                {gig.faqs.map((faq, index) => (
                  <div key={index} className="py-4">
                    <button
                      className="w-full flex justify-between items-center text-left font-semibold text-gray-800 hover:text-primary-600 transition-colors"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      {faq.question}
                      {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${expandedFaq === index ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section Placeholder */}
          <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-navy-900 mb-6">Reviews</h3>
            <div className="text-center py-8 text-gray-500">
              <Star size={32} className="mx-auto mb-2 text-yellow-400" fill="currentColor" />
              <p className="font-medium text-lg text-gray-900">{gig.rating} Rating</p>
              <p>Based on {gig.reviewsCount} reviews</p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR (30%) */}
        <div className="lg:col-span-4 space-y-6">

          {/* Sticky Order Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg sticky top-24">
            <div className="flex justify-between items-end mb-6">
              <span className="font-bold text-gray-500 text-sm tracking-wide uppercase">Standard Package</span>
              <span className="text-3xl font-extrabold text-navy-900">${gig.price}</span>
            </div>

            <p className="text-gray-600 text-sm mb-6 leading-relaxed">{gig.description?.substring(0, 80)}... Includes full source code and rights.</p>

            <div className="flex items-center gap-6 mb-8 text-sm font-bold text-gray-700">
              <div className="flex items-center gap-2">
                <Clock size={18} className="text-gray-400" />
                {gig.deliveryTime} Days Delivery
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw size={18} className="text-gray-400" />
                {gig.revisions} Revisions
              </div>
            </div>

            {gig.features && gig.features.length > 0 && (
              <div className="mb-8">
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide mb-3">What's Included</h4>
                <ul className="space-y-3">
                  {gig.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <Check size={16} className="text-accent-500 mt-0.5 shrink-0" strokeWidth={3} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleOrder}
                disabled={processing}
                className="w-full py-4 bg-navy-900 text-white rounded-lg font-bold text-lg hover:bg-navy-800 transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ backgroundColor: 'var(--brand-navy)' }}
              >
                {processing ? <Loader2 className="animate-spin" /> : 'Continue ($' + gig.price + ')'}
              </button>

              <button className="w-full py-3 bg-white text-navy-900 border border-navy-900 rounded-lg font-bold hover:bg-gray-50 transition-colors flex justify-center items-center gap-2">
                <MessageSquare size={18} /> Contact Seller
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100 text-center">
              <button className="text-gray-400 font-medium text-sm flex items-center justify-center gap-2 hover:text-gray-600">
                <Share2 size={16} /> Share this Gig
              </button>
            </div>
          </div>

          {/* Trust Box */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
            <div className="flex items-start gap-4 mb-4">
              <Shield className="text-accent-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">AtechLancer Protection</h4>
                <p className="text-xs text-gray-500 mt-1">Payment is held secure until you approve the work.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Award className="text-accent-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-gray-900 text-sm">Quality Guaranteed</h4>
                <p className="text-xs text-gray-500 mt-1">Verified talent and secure payments.</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default GigDetails;
