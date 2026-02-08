import React from 'react';
import { Star } from 'lucide-react';
import '../../pages/reviews/reviews.css';

const RatingBadge = ({ rating, reviewCount, size = 'medium', showCount = true }) => {
    const sizeClasses = {
        small: 'rating-badge-sm',
        medium: 'rating-badge-md',
        large: 'rating-badge-lg'
    };

    const renderStars = () => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(
                    <Star
                        key={i}
                        size={size === 'small' ? 12 : size === 'large' ? 20 : 14}
                        fill="#FFA500"
                        color="#FFA500"
                    />
                );
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(
                    <div key={i} className="half-star">
                        <Star
                            size={size === 'small' ? 12 : size === 'large' ? 20 : 14}
                            fill="#FFA500"
                            color="#FFA500"
                            style={{ clipPath: 'inset(0 50% 0 0)' }}
                        />
                        <Star
                            size={size === 'small' ? 12 : size === 'large' ? 20 : 14}
                            fill="none"
                            color="#D1D5DB"
                            style={{ position: 'absolute', left: 0 }}
                        />
                    </div>
                );
            } else {
                stars.push(
                    <Star
                        key={i}
                        size={size === 'small' ? 12 : size === 'large' ? 20 : 14}
                        fill="none"
                        color="#D1D5DB"
                    />
                );
            }
        }
        return stars;
    };

    return (
        <div className={`rating-badge ${sizeClasses[size]}`}>
            <span className="rating-number">{rating.toFixed(1)}</span>
            <div className="rating-stars">
                {renderStars()}
            </div>
            {showCount && reviewCount !== undefined && (
                <span className="rating-count">({reviewCount})</span>
            )}
        </div>
    );
};

export default RatingBadge;
