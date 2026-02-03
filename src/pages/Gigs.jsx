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
  const [searchInput, setSearchInput] = useState(''); // Separate state for input
  
  const [filters, setFilters] = useState({
    search: '', // Backend expects 'search'
    category: '',
    minPrice: '',
    maxPrice: '',
    status: 'active',
    sort: 'latest'
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => {
        if (prev.search === searchInput) return prev;
        return { ...prev, search: searchInput };
      });
      if (filters.search !== searchInput) setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

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
      setItems(data.results || []); // Backend returns 'results'
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
    setSearchInput('');
    setFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      status: 'active',
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
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <select
            className="search-input w-40"
            value={filters.sort}
            onChange={e => handleFilterChange({ sort: e.target.value })}
          >
            <option value="latest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
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
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin h-8 w-8 text-primary-600" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg">No gigs found matching your criteria.</p>
              <button 
                onClick={clearFilters}
                className="mt-4 text-primary-600 font-medium hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map(gig => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </div>
              
              {/* Pagination */}
              {total > 12 && (
                <div className="mt-8 flex justify-center gap-2">
                  <button 
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 bg-gray-50 rounded">
                    Page {page}
                  </span>
                  <button 
                    disabled={items.length < 12}
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 border rounded hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Gigs;
