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
        <div className="sidebar">
            <div className="sidebar-header">
                <h3 className="sidebar-title">Filters</h3>
                <button onClick={onClear} className="clear-all-link">Clear All</button>
            </div>

            <div className="divider"></div>

            {/* Categories */}
            <div className="filter-section">
                <h4 className="filter-label">Category</h4>
                <div className="filter-list">
                    {['Web Development', 'Mobile Apps', 'Design', 'Writing', 'Marketing', 'Data Science'].map(cat => (
                        <label key={cat} className="filter-option">
                            <input
                                type="radio"
                                name="category"
                                checked={localFilters.category === cat}
                                onChange={() => handleChange('category', cat)}
                                className="filter-radio"
                            />
                            <span className="option-text">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="filter-section">
                <h4 className="filter-label">Price Range</h4>
                <div className="price-range-container">
                    <div className="price-input-wrapper">
                        <label className="input-sub-label">Min Price</label>
                        <div className="input-with-symbol">
                            <span className="currency-symbol">$</span>
                            <input
                                type="number"
                                placeholder="Min"
                                value={localFilters.minPrice || ''}
                                onChange={e => handleChange('minPrice', e.target.value)}
                                className="price-field"
                            />
                        </div>
                    </div>
                    <span className="price-dash">–</span>
                    <div className="price-input-wrapper">
                        <label className="input-sub-label">Max Price</label>
                        <div className="input-with-symbol">
                            <span className="currency-symbol">$</span>
                            <input
                                type="number"
                                placeholder="Max"
                                value={localFilters.maxPrice || ''}
                                onChange={e => handleChange('maxPrice', e.target.value)}
                                className="price-field"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery Time */}
            <div className="filter-section">
                <h4 className="filter-label">Delivery Time</h4>
                <div className="filter-list">
                    {[
                        { label: 'Up to 24 hours', value: 1 },
                        { label: 'Up to 3 days', value: 3 },
                        { label: 'Up to 7 days', value: 7 },
                        { label: 'Anytime', value: '' },
                    ].map(opt => (
                        <label key={opt.label} className="filter-option">
                            <input
                                type="radio"
                                name="deliveryTime"
                                checked={localFilters.deliveryTime == opt.value}
                                onChange={() => handleChange('deliveryTime', opt.value)}
                                className="filter-radio"
                            />
                            <span className="option-text">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Verified Sellers Toggle */}
            <div className="filter-section">
                <h4 className="filter-label">Seller Type</h4>
                <div className="seller-toggle-wrapper">
                    <label className="toggle-label-group">
                        <div className="toggle-main">
                            <input
                                type="checkbox"
                                checked={localFilters.verified || false}
                                onChange={(e) => handleChange('verified', e.target.checked)}
                                className="filter-checkbox"
                            />
                            <span className="option-text">Verified Sellers Only</span>
                        </div>
                        <p className="helper-text">Trusted & approved sellers with high performance</p>
                    </label>
                </div>
            </div>

            {/* Rating */}
            <div className="filter-section">
                <h4 className="filter-label">Rating</h4>
                <div className="filter-list">
                    {[4, 3, 2, 1].map(r => (
                        <label key={r} className="filter-option star-filter-option">
                            <input
                                type="radio"
                                name="rating"
                                checked={Number(localFilters.rating) === r}
                                onChange={() => handleChange('rating', r)}
                                className="filter-radio"
                            />
                            <div className="stars-inline">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < r ? "#FFB33E" : "transparent"}
                                        color={i < r ? "#FFB33E" : "#E5E7EB"}
                                    />
                                ))}
                                <span className="up-text">& Up</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <button className="apply-filters-btn" onClick={() => onChange(localFilters)}>
                Apply Filters
            </button>
        </div>
    );
};

export default GigFilters;
