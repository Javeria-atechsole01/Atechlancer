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
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-navy-900 text-lg flex items-center gap-2">
                    <Filter size={18} /> Filters
                </h3>
                {Object.values(filters).some(x => x) && (
                    <button onClick={onClear} className="text-xs font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                        <X size={12} /> Clear All
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Category</h4>
                <div className="space-y-1">
                    {['Web Development', 'Mobile Apps', 'Design', 'Writing', 'Marketing', 'Data Science'].map(cat => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${localFilters.category === cat ? 'bg-primary-600 border-primary-600' : 'border-gray-300 group-hover:border-primary-400'}`}>
                                {localFilters.category === cat && <Check size={10} className="text-white" />}
                            </div>
                            <input
                                type="radio"
                                name="category"
                                checked={localFilters.category === cat}
                                onChange={() => handleChange('category', cat)}
                                className="hidden"
                            />
                            <span className={`text-sm ${localFilters.category === cat ? 'font-semibold text-primary-700' : 'text-gray-600'}`}>{cat}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Price Range</h4>
                <div className="flex items-center gap-2 mb-2">
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-xs">$</span>
                        <input
                            type="number"
                            placeholder="Min"
                            value={localFilters.minPrice || ''}
                            onChange={e => handleChange('minPrice', e.target.value)}
                            className="w-full pl-6 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-primary-500 outline-none transition-all"
                        />
                    </div>
                    <span className="text-gray-300">-</span>
                    <div className="relative flex-1">
                        <span className="absolute left-3 top-2.5 text-gray-400 text-xs">$</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={localFilters.maxPrice || ''}
                            onChange={e => handleChange('maxPrice', e.target.value)}
                            className="w-full pl-6 pr-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-primary-500 outline-none transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Verified Only Switch */}
            <div className="mb-6 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Verified Sellers Only</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={localFilters.verified || false}
                        onChange={(e) => handleChange('verified', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-500"></div>
                </label>
            </div>

            {/* Delivery Time */}
            <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Delivery Time</h4>
                <div className="space-y-1">
                    {[
                        { label: 'Up to 24 hours', value: 1 },
                        { label: 'Up to 3 days', value: 3 },
                        { label: 'Up to 7 days', value: 7 },
                        { label: 'Anytime', value: '' },
                    ].map(opt => (
                        <label key={opt.label} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${localFilters.deliveryTime == opt.value ? 'border-primary-600' : 'border-gray-300'}`}>
                                {localFilters.deliveryTime == opt.value && <div className="w-2 h-2 rounded-full bg-primary-600" />}
                            </div>
                            <input
                                type="radio"
                                name="deliveryTime"
                                checked={localFilters.deliveryTime == opt.value}
                                onChange={() => handleChange('deliveryTime', opt.value)}
                                className="hidden"
                            />
                            <span className="text-sm text-gray-600">{opt.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Rating */}
            <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Rating</h4>
                <div className="space-y-1">
                    {[4, 3, 2, 1].map(r => (
                        <label key={r} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                            <input
                                type="radio"
                                name="rating"
                                checked={Number(localFilters.rating) === r}
                                onChange={() => handleChange('rating', r)}
                                className="hidden" // Hiding default radio
                            />
                            {/* Custom Checkbox Look */}
                            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${Number(localFilters.rating) === r ? 'bg-primary-600 border-primary-600' : 'border-gray-300'}`}>
                                {Number(localFilters.rating) === r && <Check size={10} className="text-white" />}
                            </div>

                            <div className="flex items-center gap-1 text-sm text-gray-600">
                                <span className="flex items-center text-yellow-400 gap-0.5">
                                    {[...Array(r)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                                </span>
                                <span className="text-gray-400 text-xs font-medium ml-1">& Up</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default GigFilters;
