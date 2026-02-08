import React, { useState } from 'react';
import { reviewService } from '../../services/reviewService';
import { Star, X, Loader2, AlertCircle } from 'lucide-react';
import './reviews.css';

const ReviewSubmissionModal = ({
    entityType,
    entityId,
    entityName,
    onClose,
    onSuccess
}) => {
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (rating === 0) {
            setError('Please select a rating');
            return;
        }

        if (!comment.trim()) {
            setError('Please provide a review comment');
            return;
        }

        if (comment.length < 10) {
            setError('Review must be at least 10 characters');
            return;
        }

        setLoading(true);
        try {
            await reviewService.submitReview({
                entityType,
                entityId,
                rating,
                comment: comment.trim()
            });

            onSuccess();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to submit review');
        } finally {
            setLoading(false);
        }
    };

    const renderStars = () => {
        return (
            <div className="star-rating-input">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className="star-button"
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                    >
                        <Star
                            size={32}
                            fill={(hoveredRating || rating) >= star ? '#FFA500' : 'none'}
                            color={(hoveredRating || rating) >= star ? '#FFA500' : '#D1D5DB'}
                        />
                    </button>
                ))}
            </div>
        );
    };

    const getRatingLabel = (stars) => {
        const labels = {
            1: 'Poor',
            2: 'Fair',
            3: 'Good',
            4: 'Very Good',
            5: 'Excellent'
        };
        return labels[stars] || 'Select rating';
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content review-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Write a Review</h2>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="review-form">
                    <div className="review-entity-info">
                        <p>You're reviewing: <strong>{entityName}</strong></p>
                    </div>

                    {error && (
                        <div className="error-message">
                            <AlertCircle size={18} />
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Your Rating *</label>
                        {renderStars()}
                        <span className="rating-label">
                            {getRatingLabel(hoveredRating || rating)}
                        </span>
                    </div>

                    <div className="form-group">
                        <label htmlFor="comment">Your Review *</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this service..."
                            rows={6}
                            maxLength={1000}
                            required
                        />
                        <span className="input-hint">
                            {comment.length}/1000 characters (minimum 10)
                        </span>
                    </div>

                    <div className="review-guidelines">
                        <h4>Review Guidelines:</h4>
                        <ul>
                            <li>Be honest and constructive</li>
                            <li>Focus on your experience</li>
                            <li>Avoid offensive language</li>
                            <li>Don't include personal information</li>
                        </ul>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Review'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReviewSubmissionModal;
