import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gigsService } from '../services/gigsService';
import { messagesService } from '../services/messagesService';
import { useAuth } from '../context/AuthContext';
import { Loader2, Send, X } from 'lucide-react';
import logo from '../assets/atechlancer_logo.png';

const ContactSeller = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await gigsService.get(id);
        setGig(data);
      } catch (err) {
        console.error('Failed to load gig', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleCancel = () => {
    navigate(`/gigs/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || !gig?.sellerId?._id) return;
    setProcessing(true);
    try {
      await messagesService.send({
        receiverId: gig.sellerId._id,
        message,
        gigId: id
      });
      navigate(`/gigs/${id}`);
    } catch (err) {
      alert('Failed to send message');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-center min-h-screen">
        <Loader2 className="animate-spin text-accent" size={48} />
      </div>
    );
  }

  if (!gig) {
    return <div className="empty-placeholder-box" style={{ margin: '5rem auto', maxWidth: '400px' }}>Gig not found</div>;
  }

  return (
    <div className="section" style={{ minHeight: '70vh' }}>
      <div className="container" style={{ maxWidth: '680px' }}>
        <div className="card" style={{ overflow: 'hidden', padding: '2rem 1.5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <img
              src={logo}
              alt="Contact"
              style={{ width: '220px', height: 'auto', opacity: 0.9 }}
            />
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email row */}
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <label style={{ fontWeight: 700, color: 'var(--gray-700)', letterSpacing: '0.04em' }}>
                EMAIL
              </label>
              <input
                className="form-input"
                value={user?.email || ''}
                disabled
                placeholder="Enter a valid email address"
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '0.85rem 1.25rem'
                }}
              />
            </div>

            {/* Message row */}
            <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '1rem', alignItems: 'start' }}>
              <label style={{ fontWeight: 700, color: 'var(--gray-700)', letterSpacing: '0.04em', marginTop: '0.5rem' }}>
                MESSAGE
              </label>
              <textarea
                className="form-input"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  background: '#f3f4f6',
                  border: 'none',
                  borderRadius: '1rem',
                  padding: '1rem 1.25rem',
                  minHeight: '140px',
                  resize: 'none'
                }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
                style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px' }}
                disabled={processing}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!message.trim() || processing}
                className="btn"
                style={{
                  padding: '0.75rem 1.75rem',
                  borderRadius: '9999px',
                  color: '#fff',
                  backgroundImage: 'linear-gradient(90deg, var(--brand-navy), var(--primary-600))',
                  fontWeight: 800,
                  letterSpacing: '0.06em'
                }}
              >
                {processing ? <Loader2 className="animate-spin" size={18} /> : 'SEND MESSAGE'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSeller;
