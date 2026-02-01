import React, { useEffect, useState } from 'react';
import { gigsService } from '../services/gigsService';
import GigCard from '../components/marketplace/GigCard';
import GigFilters from '../components/marketplace/GigFilters';
import { Loader2 } from 'lucide-react';

const Gigs = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    q: '',
    category: '',
    minPrice: '',
    maxPrice: '',
    deliveryTime: '',
    rating: '',
    sort: 'latest'
  });

  useEffect(() => {
    load();
  }, [filters, page]);

  const load = async () => {
    setLoading(true);
    try {
      const query = {
        ...filters,
        page,
        limit: 12
      };
      // Clean empty filters
      Object.keys(query).forEach(key => (query[key] === '' || query[key] === null) && delete query[key]);

      const data = await gigsService.list(query);
      setItems(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Failed to load gigs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setPage(1); // Reset page on filter change
  };

  const clearFilters = () => {
    setFilters({
      q: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      deliveryTime: '',
      rating: '',
      sort: 'latest'
    });
    setPage(1);
  };

  return (
    <div className="dashboard-page max-w-7xl mx-auto py-8">
      {/* Search Header */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Marketplace</h1>
          <p className="text-gray-600 mt-1">Find the perfect professional for your needs</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <input
            placeholder="Search services..."
            className="search-input w-full md:w-80"
            value={filters.q}
            onChange={e => handleFilterChange({ q: e.target.value })}
          />
          <select
            className="search-input w-40"
            value={filters.sort}
            onChange={e => handleFilterChange({ sort: e.target.value })}
          >
            <option value="latest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="hidden lg:block lg:col-span-1">
          <GigFilters filters={filters} onChange={handleFilterChange} onClear={clearFilters} />
        </div>

        {/* Gigs Grid */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary-600" size={40} />
            </div>
          ) : items.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(g => (
                  <GigCard key={g._id} gig={g} />
                ))}
              </div>

              {/* Pagination */}
              {total > 12 && (
                <div className="flex justify-center mt-12 gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 bg-gray-50 rounded">
                    {page} of {Math.ceil(total / 12)}
                  </span>
                  <button
                    disabled={page >= Math.ceil(total / 12)}
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
              <p className="text-xl text-gray-500 font-medium">No services found matching your criteria</p>
              <button onClick={clearFilters} className="mt-4 text-primary-600 hover:underline">
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
