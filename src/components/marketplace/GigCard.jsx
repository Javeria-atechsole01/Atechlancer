import React from 'react';
import { Star, Clock, CheckCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
    return (
        <div className="gig-card">
            {/* Thumbnail */}
            <Link to={`/gigs/${gig._id}`} className="gig-thumbnail">
                {gig.images && gig.images.length > 0 ? (
                    <img
                        src={gig.images[0]}
                        alt={gig.title}
                        className="gig-image"
                        loading="lazy"
                    />
                ) : (
                    <div className="gig-image-placeholder">
                        <span>No Preview</span>
                    </div>
                )}

                {/* Overlay CTA */}
                <div className="gig-overlay">
                    <span className="view-details-badge">
                        View Details
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="gig-content">
                {/* Seller Header */}
                <div className="seller-header">
                    <img
                        src={gig.sellerId?.photo || 'https://via.placeholder.com/32'}
                        alt={gig.sellerId?.name}
                        className="seller-avatar"
                    />
                    <div className="seller-info">
                        <div className="seller-name-row">
                            <span className="seller-name">{gig.sellerId?.name || 'Seller'}</span>
                            {gig.sellerId?.isVerified && (
                                <CheckCircle size={12} className="verified-icon" />
                            )}
                        </div>
                        <span className="seller-level">Level 2 Seller</span>
                    </div>
                </div>

                {/* Title */}
                <Link
                    to={`/gigs/${gig._id}`}
                    className="gig-title"
                >
                    {gig.title}
                </Link>

                {/* Rating */}
                <div className="gig-rating-row">
                    <Star size={14} className="star-icon" />
                    <span className="rating-val">{gig.rating || 'New'}</span>
                    <span className="review-count">({gig.reviewsCount || 0})</span>
                </div>

                {/* Footer divider */}
                <div className="gig-footer">
                    <div className="gig-meta">
                        <Clock size={12} />
                        <span>{gig.deliveryTime} days</span>
                    </div>
                    <div className="gig-price-box">
                        <span className="price-label">Starting at</span>
                        <span className="price-val">${gig.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GigCard;
