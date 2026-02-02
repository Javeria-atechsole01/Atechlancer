import React from 'react';
import { Star, Clock, CheckCircle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const GigCard = ({ gig }) => {
    return (
        <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
            {/* Thumbnail */}
            <Link to={`/gigs/${gig._id}`} className="block relative aspect-[4/3] bg-gray-100 overflow-hidden">
                {gig.images && gig.images.length > 0 ? (
                    <img
                        src={gig.images[0]}
                        alt={gig.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                        <span className="text-xs uppercase tracking-wider font-medium">No Preview</span>
                    </div>
                )}

                {/* Overlay CTA */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-navy-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        View Details
                    </span>
                </div>
            </Link>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                {/* Seller Header */}
                <div className="flex items-center gap-2 mb-3">
                    <img
                        src={gig.sellerId?.photo || 'https://via.placeholder.com/32'}
                        alt={gig.sellerId?.name}
                        className="w-8 h-8 rounded-full object-cover border border-gray-100 shadow-sm"
                    />
                    <div className="flex flex-col leading-none">
                        <div className="flex items-center gap-1">
                            <span className="font-bold text-sm text-gray-900">{gig.sellerId?.name || 'Seller'}</span>
                            {gig.sellerId?.isVerified && (
                                <CheckCircle size={12} className="text-accent-500 fill-accent-50" />
                            )}
                        </div>
                        <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wide mt-0.5">Level 2 Seller</span>
                    </div>
                </div>

                {/* Title */}
                <Link
                    to={`/gigs/${gig._id}`}
                    className="text-gray-900 font-semibold text-[15px] leading-snug mb-3 line-clamp-2 hover:text-primary-600 transition-colors flex-1"
                >
                    {gig.title}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-4">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-sm text-gray-900">{gig.rating || 'New'}</span>
                    <span className="text-gray-400 text-sm">({gig.reviewsCount || 0})</span>
                </div>

                {/* Footer divider */}
                <div className="border-t border-gray-100 pt-3 mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium bg-gray-50 px-2 py-1 rounded">
                        <Clock size={12} />
                        <span>{gig.deliveryTime} days</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Starting at</span>
                        <span className="text-lg font-bold text-navy-900 leading-none">${gig.price}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GigCard;
