import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gigsService } from '../services/gigsService';
import { ordersService } from '../services/ordersService';
import { messagesService } from '../services/messagesService';
import {
  Star,
  Clock,
  RefreshCw,
  Check,
  ChevronDown,
  ChevronUp,
  Heart,
  MessageSquare,
  Share2,
  Shield,
  Award,
  Loader2
} from 'lucide-react';
import RequirementsModal from '../components/marketplace/RequirementsModal';
import ProposalModal from '../components/marketplace/ProposalModal';
import './gig-details.css';

const GigDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Modal states
  const [showRequirements, setShowRequirements] = useState(false);
  const [showProposal, setShowProposal] = useState(false);

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

  const handleOrderClick = () => {
    // Open requirements modal instead of direct order
    setShowRequirements(true);
  };

  const confirmOrder = async (requirements) => {
    setProcessing(true);
    try {
      const order = await ordersService.create(id, requirements);
      navigate(`/orders/${order._id}`);
    } catch (err) {
      alert('Failed to create order. ' + (err.response?.data?.message || err.message));
    } finally {
      setProcessing(false);
      setShowRequirements(false);
    }
  };

  const sendProposal = async (message) => {
    setProcessing(true);
    try {
      await messagesService.send({
        receiverId: gig.sellerId._id,
        message,
        gigId: id
      });
      alert('Message sent successfully!');
      setShowProposal(false);
    } catch (err) {
      alert('Failed to send message.');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Loader2 className="animate-spin" style={{ color: 'var(--primary-600)' }} size={48} />
    </div>
  );

  if (!gig) return <div className="text-center" style={{ padding: '5rem' }}>Gig not found.</div>;

  return (
    <div className="gig-details-page">
      <div className="details-grid">

        {/* LEFT CONTENT */}
        <div className="details-main">

          {/* Breadcrumbs */}
          <div className="breadcrumbs">
            Marketplace <span className="separator">/</span> {gig.category || 'General'} <span className="separator">/</span> <span className="current">{gig.title}</span>
          </div>

          {/* Header */}
          <div className="gig-header-section">
            <h1>{gig.title}</h1>
            <div className="gig-meta-header">
              <div className="seller-brief">
                <img
                  src={gig.sellerId?.photo || 'https://via.placeholder.com/48'}
                  alt={gig.sellerId?.name}
                  className="seller-avatar-large"
                />
                <div className="seller-name-title">
                  <h3>
                    {gig.sellerId?.name}
                    {gig.sellerId?.isVerified && <Check size={14} className="verified-icon" />}
                  </h3>
                  <span className="seller-level-badge">Top Rated Seller</span>
                </div>
              </div>
              <div className="divider-pipe"></div>
              <div className="gig-rating-summary">
                <Star size={16} fill="currentColor" className="star" />
                <span style={{ fontWeight: 700 }}>{gig.rating || '5.0'}</span>
                <span style={{ color: 'var(--gray-400)' }}>({gig.reviewsCount || 0} reviews)</span>
              </div>
              <div className="divider-pipe"></div>
              <div className="order-count">3 Orders in Queue</div>
            </div>
          </div>

          {/* Gallery */}
          <div className="gig-gallery-main">
            {gig.images && gig.images.length > 0 ? (
              <img src={gig.images[0]} alt={gig.title} />
            ) : (
              <div className="gig-image-placeholder">No Preview</div>
            )}
            <button className="save-btn">
              <Heart size={20} />
            </button>
          </div>

          {/* Description */}
          <div className="details-card">
            <h3>About This Gig</h3>
            <div className="prose-text">
              {gig.description}
            </div>
          </div>

          {/* Seller Bio */}
          <div className="details-card">
            <h3>About The Seller</h3>
            <div className="seller-profile-box">
              <img
                src={gig.sellerId?.photo || 'https://via.placeholder.com/100'}
                alt={gig.sellerId?.name}
                className="seller-avatar-xl"
              />
              <div className="seller-bio-info">
                <h4>{gig.sellerId?.name}</h4>
                <p className="seller-position">{gig.sellerId?.title || 'Professional Freelancer'}</p>
                <p className="seller-bio-text">{gig.sellerId?.bio || 'Experienced freelancer delivering high quality work.'}</p>
                <button className="btn btn-secondary btn-sm">Contact Me</button>
              </div>
            </div>
          </div>

          {/* FAQs */}
          {gig.faqs && gig.faqs.length > 0 && (
            <div className="details-card">
              <h3>Frequent Questions</h3>
              <div className="faq-list">
                {gig.faqs.map((faq, index) => (
                  <div key={index} className={`faq-item ${expandedFaq === index ? 'active' : ''}`}>
                    <button
                      className="faq-question"
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    >
                      {faq.question}
                      {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <div className="faq-answer">
                      <p className="prose-text" style={{ fontSize: '0.875rem' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="details-card">
            <h3>Reviews</h3>
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <Star size={32} style={{ color: '#fbbf24', marginBottom: '0.5rem' }} fill="currentColor" />
              <p style={{ fontSize: '1.25rem', fontWeight: 700 }}>{gig.rating} Rating</p>
              <p style={{ color: 'var(--gray-500)' }}>Based on {gig.reviewsCount} reviews</p>
            </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR */}
        <div className="details-sidebar">

          {/* Order Card */}
          <div className="order-sticky-card">
            <div className="package-header">
              <span className="package-title">Standard Package</span>
              <span className="package-price">${gig.price}</span>
            </div>

            <p className="package-summary">{gig.description?.substring(0, 100)}... Includes full source code and rights.</p>

            <div className="package-meta">
              <div className="meta-item">
                <Clock size={18} style={{ color: 'var(--gray-400)' }} />
                {gig.deliveryTime} Days Delivery
              </div>
              <div className="meta-item">
                <RefreshCw size={18} style={{ color: 'var(--gray-400)' }} />
                {gig.revisions || 0} Revisions
              </div>
            </div>

            {gig.features && gig.features.length > 0 && (
              <div className="package-features">
                <h4 className="filter-label" style={{ marginBottom: '1rem' }}>What's Included</h4>
                <ul className="feature-list">
                  {gig.features.map((feature, i) => (
                    <li key={i} className="feature-item">
                      <Check size={16} className="icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="actions-stack">
              <button
                onClick={handleOrderClick}
                disabled={processing}
                className="btn-continue"
              >
                {processing ? <Loader2 className="animate-spin" /> : 'Continue ($' + gig.price + ')'}
              </button>

              <button
                onClick={() => setShowProposal(true)}
                className="btn-contact"
              >
                <MessageSquare size={18} /> Contact Seller
              </button>
            </div>

            <button className="text-muted" style={{ width: '100%', marginTop: '1.5rem', background: 'none', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
              <Share2 size={16} /> Share this Gig
            </button>
          </div>

          {/* Protection */}
          <div className="protection-box">
            <div className="protection-item">
              <Shield className="icon" size={24} />
              <div>
                <h4>AtechLancer Protection</h4>
                <p>Payment is held secure until you approve the work.</p>
              </div>
            </div>
            <div className="protection-item">
              <Award className="icon" size={24} />
              <div>
                <h4>Quality Guaranteed</h4>
                <p>Verified talent and secure payments.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {showRequirements && (
        <RequirementsModal
          price={gig.price}
          onClose={() => setShowRequirements(false)}
          onSubmit={confirmOrder}
          processing={processing}
        />
      )}

      {showProposal && (
        <ProposalModal
          sellerName={gig.sellerId?.name}
          onClose={() => setShowProposal(false)}
          onSubmit={sendProposal}
          processing={processing}
        />
      )}
    </div>
  );
};

export default GigDetails;
