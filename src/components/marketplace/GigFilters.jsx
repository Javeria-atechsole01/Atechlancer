import React, { useState, useEffect } from 'react';
import { Star, Filter, X } from 'lucide-react';

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
        <div className="card h-fit sticky top-24">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Filter size={18} /> Filters
                </h3>
                <button onClick={onClear} className="text-sm text-red-500 hover:underline flex items-center gap-1">
                    <X size={14} /> Clear
                </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h4 className="font-medium mb-3 text-sm text-gray-700 uppercase tracking-wide">Category</h4>
                <div className="space-y-2">
                    {['Web Development', 'Mobile Apps', 'Design', 'Writing', 'Marketing', 'Data Science'].map(cat => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                                type="radio"
                                name="category"
                                checked={localFilters.category === cat}
                                onChange={() => handleChange('category', cat)}
                                className="text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-600 text-sm">{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="font-medium mb-3 text-sm text-gray-700 uppercase tracking-wide">Price Range</h4>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        value={localFilters.minPrice || ''}
                        onChange={e => handleChange('minPrice', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-primary-500"
                    />
                    <span className="text-gray-400">-</span>
                    <input
                        type="number"
                        placeholder="Max"
                        value={localFilters.maxPrice || ''}
                        onChange={e => handleChange('maxPrice', e.target.value)}
                        className="w-full px-3 py-2 border rounded-md text-sm outline-none focus:border-primary-500"
                    />
                </div>
            </div>

            {/* Delivery Time */}
            <div className="mb-6">
                <h4 className="font-medium mb-3 text-sm text-gray-700 uppercase tracking-wide">Delivery Time</h4>
                <div className="space-y-2">
                    {[
                        { label: 'Up to 24 hours', value: 1 },
                        { label: 'Up to 3 days', value: 3 },
                        { label: 'Up to 7 days', value: 7 },
                        { label: 'Anytime', value: '' },
                    ].map(opt => (
                        <label key={opt.label} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                                type="radio"
                                name="deliveryTime"
                                checked={localFilters.deliveryTime == opt.value}
                                onChange={() => handleChange('deliveryTime', opt.value)}
                                className="text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-gray-600 text-sm">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div>
                <h4 className="font-medium mb-3 text-sm text-gray-700 uppercase tracking-wide">Rating</h4>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map(r => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                            <input
                                type="radio"
                                name="rating"
                                checked={Number(localFilters.rating) === r}
                                onChange={() => handleChange('rating', r)}
                                className="text-primary-600 focus:ring-primary-500"
                            />
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <span className="flex items-center text-yellow-500">
                                    {[...Array(r)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                </span>
                                <span>& Up</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default GigFilters;
