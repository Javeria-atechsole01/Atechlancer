import React, { useState, useEffect } from 'react';
import { Star, Filter, X, Check, Search } from 'lucide-react';

const GigFilters = ({ filters, onChange, onClear }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleChange = (key, value) => {
        const newFilters = { ...localFilters, [key]: value };
        setLocalFilters(newFilters);
        onChange(newFilters);
    };

    return (
        <div className="filter-card">
            <div className="filter-header">
                <h3 className="filter-title">
                    <Filter size={18} /> Filters
                </h3>
                {Object.values(filters).some(x => x) && (
                    <button onClick={onClear} className="clear-filters-btn">
                        <X size={12} /> Clear All
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="filter-group">
                <h4 className="filter-label">Category</h4>
                <div className="filter-options">
                    {['Web Development', 'Mobile Apps', 'Design', 'Writing', 'Marketing', 'Data Science'].map(cat => (
                        <label key={cat} className={`filter-option ${localFilters.category === cat ? 'active' : ''}`}>
                            <div className="custom-radio">
                                {localFilters.category === cat && <Check size={10} className="check-icon" />}
                            </div>
                            <input
                                type="radio"
                                name="category"
                                checked={localFilters.category === cat}
                                onChange={() => handleChange('category', cat)}
                                className="hidden"
                            />
                            <span className="option-text">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="filter-group">
                <h4 className="filter-label">Price Range</h4>
                <div className="price-inputs">
                    <div className="price-field">
                        <span className="currency">$</span>
                        <input
                            type="number"
                            placeholder="Min"
                            value={localFilters.minPrice || ''}
                            onChange={e => handleChange('minPrice', e.target.value)}
                            className="price-input"
                        />
                    </div>
                    <span className="separator">-</span>
                    <div className="price-field">
                        <span className="currency">$</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={localFilters.maxPrice || ''}
                            onChange={e => handleChange('maxPrice', e.target.value)}
                            className="price-input"
                        />
                    </div>
                </div>
            </div>

            {/* Verified Only Switch */}
            <div className="filter-switch-row">
                <span className="switch-label">Verified Sellers Only</span>
                <label className="switch-toggle">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={localFilters.verified || false}
                        onChange={(e) => handleChange('verified', e.target.checked)}
                    />
                    <div className="switch-slider"></div>
                </label>
            </div>

            {/* Delivery Time */}
            <div className="filter-group">
                <h4 className="filter-label">Delivery Time</h4>
                <div className="filter-options">
                    {[
                        { label: 'Up to 24 hours', value: 1 },
                        { label: 'Up to 3 days', value: 3 },
                        { label: 'Up to 7 days', value: 7 },
                        { label: 'Anytime', value: '' },
                    ].map(opt => (
                        <label key={opt.label} className={`filter-option ${localFilters.deliveryTime == opt.value ? 'active' : ''}`}>
                            <div className="custom-radio-round">
                                {localFilters.deliveryTime == opt.value && <div className="dot" />}
                            </div>
                            <input
                                type="radio"
                                name="deliveryTime"
                                checked={localFilters.deliveryTime == opt.value}
                                onChange={() => handleChange('deliveryTime', opt.value)}
                                className="hidden"
                            />
                            <span className="option-text">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div className="filter-group">
                <h4 className="filter-label">Rating</h4>
                <div className="filter-options">
                    {[4, 3, 2, 1].map(r => (
                        <label key={r} className={`filter-option ${Number(localFilters.rating) === r ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="rating"
                                checked={Number(localFilters.rating) === r}
                                onChange={() => handleChange('rating', r)}
                                className="hidden"
                            />
                            <div className="custom-radio">
                                {Number(localFilters.rating) === r && <Check size={10} className="check-icon" />}
                            </div>
                            <div className="rating-stars">
                                <span className="stars">
                                    {[...Array(r)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </span>
                                <span className="up-text">& Up</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default GigFilters;
