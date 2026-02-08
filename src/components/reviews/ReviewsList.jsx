import React, { useState, useEffect } from 'react';
import { reviewService } from '../../services/reviewService';
import { Star, ThumbsUp, Loader2, AlertCircle } from 'lucide-react';
import './reviews.css';

const ReviewsList = ({ entityType, entityId, showStats = true }) => {
    const [reviews, setReviews] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        loadReviews();
        if (showStats) {
            loadStats();
        }
    }, [entityType, entityId, page]);

    const loadReviews = async () => {
        setLoading(true);
        try {
            const data = await reviewService.getReviews(entityType, entityId, page, 10);
            setReviews(data.reviews || []);
            setHasMore(data.hasMore || false);
        } catch (error) {
            console.error('Failed to load reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadStats = async () => {
        try {
            const data = await reviewService.getReviewStats(entityType, entityId);
            setStats(data);
        } catch (error) {
            console.error('Failed to load stats:', error);
        }
    };

    const renderStars = (rating) => {
        return (
            <div className="star-rating-display">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={16}
                        fill={star <= rating ? '#FFA500' : 'none'}
                        color={star <= rating ? '#FFA500' : '#D1D5DB'}
                    />
                ))}
            </div>
        );
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="reviews-section">
            {/* Review Stats */}
            {showStats && stats && (
                <div className="review-stats">
                    <div className="stats-summary">
                        <div className="average-rating">
                            <span className="rating-number">{stats.averageRating?.toFixed(1) || '0.0'}</span>
                            {renderStars(Math.round(stats.averageRating || 0))}
                            <span className="total-reviews">
                                {stats.totalReviews || 0} {stats.totalReviews === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>
                    </div>

                    <div className="rating-breakdown">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = stats.ratingDistribution?.[star] || 0;
                            const percentage = stats.totalReviews > 0
                                ? (count / stats.totalReviews) * 100
                                : 0;

                            return (
                                <div key={star} className="rating-bar-item">
                                    <span className="star-label">{star} ★</span>
                                    <div className="rating-bar">
                                        <div
                                            className="rating-bar-fill"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="rating-count">{count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Reviews List */}
            <div className="reviews-list">
                <h3>Customer Reviews</h3>

                {loading ? (
                    <div className="reviews-loading">
                        <Loader2 className="animate-spin" size={32} />
                        <p>Loading reviews...</p>
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="reviews-empty">
                        <AlertCircle size={48} />
                        <h4>No reviews yet</h4>
                        <p>Be the first to review!</p>
                    </div>
                ) : (
                    <>
                        {reviews.map((review) => (
                            <div key={review._id} className="review-card">
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <div className="reviewer-avatar">
                                            {review.reviewer?.profilePicture ? (
                                                <img
                                                    src={review.reviewer.profilePicture}
                                                    alt={review.reviewer.name}
                                                />
                                            ) : (
                                                <div className="avatar-placeholder">
                                                    {review.reviewer?.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                            )}
                                        </div>
                                        <div className="reviewer-details">
                                            <h4>{review.reviewer?.name || 'Anonymous'}</h4>
                                            <span className="review-date">
                                                {formatDate(review.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="review-rating">
                                        {renderStars(review.rating)}
                                    </div>
                                </div>

                                <div className="review-content">
                                    <p>{review.comment}</p>
                                </div>

                                {review.helpful > 0 && (
                                    <div className="review-helpful">
                                        <ThumbsUp size={14} />
                                        <span>{review.helpful} found this helpful</span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Pagination */}
                        {(page > 1 || hasMore) && (
                            <div className="reviews-pagination">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                >
                                    Previous
                                </button>
                                <span className="page-info">Page {page}</span>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setPage(p => p + 1)}
                                    disabled={!hasMore}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ReviewsList;
