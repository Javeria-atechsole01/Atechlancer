import React from 'react';
import { Star, Heart, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
    return (
        <div className="card hover:shadow-lg transition-shadow duration-200" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Thumbnail */}
            <Link to={`/dashboard/gigs/${gig._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', height: '180px', backgroundColor: '#f3f4f6' }}>
                    {gig.images && gig.images.length > 0 ? (
                        <img
                            src={gig.images[0]}
                            alt={gig.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            loading="lazy"
                        />
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>No Image</div>
                    )}
                    {gig.sellerId?.isVerified && (
                        <span style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: 'rgba(0,0,0,0.6)', padding: '2px 6px', borderRadius: '4px', color: '#fff', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle size={10} color="#10b981" /> Verified
                        </span>
                    )}
                </div>
            </Link>

            {/* Content */}
            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>

                {/* Seller Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    {gig.sellerId?.photo ? (
                        <img src={gig.sellerId.photo} alt={gig.sellerId.name} style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                            {gig.sellerId?.name?.charAt(0)}
                        </div>
                    )}
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>{gig.sellerId?.name || 'Seller'}</span>
                </div>

                {/* Title */}
                <Link to={`/dashboard/gigs/${gig._id}`} style={{ textDecoration: 'none', color: '#111827', fontWeight: '600', fontSize: '16px', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', flex: 1 }}>
                    {gig.title}
                </Link>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px', fontSize: '14px' }}>
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <span style={{ fontWeight: 'bold', color: '#111827' }}>{gig.rating || 0}</span>
                    <span style={{ color: '#9ca3af' }}>({gig.reviewsCount || 0})</span>
                </div>

                {/* Footer: Delivery & Price */}
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '12px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#6b7280' }}>
                        <Clock size={12} /> {gig.deliveryTime} days
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '10px', color: '#6b7280', display: 'block' }}>STARTING AT</span>
                        <span style={{ fontSize: '18px', fontWeight: '700', color: '#111827' }}>${gig.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GigCard;
