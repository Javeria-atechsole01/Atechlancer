import React, { useEffect, useState } from 'react';
import { gigsService } from '../services/gigsService';
import GigCard from '../components/marketplace/GigCard';
import GigFilters from '../components/marketplace/GigFilters';
import { Loader2 } from 'lucide-react';
import './gigs.css';

const Gigs = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(''); // Separate state for input

  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      category: params.get('category') || '',
      minPrice: '',
      maxPrice: '',
      status: 'active',
      sort: 'latest'
    };
  });

  useEffect(() => {
    // Sync searchInput with initial search filter
    if (filters.search) {
      setSearchInput(filters.search);
    }
  }, []);

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
    <div className="gigs-page">
      <div className="gigs-header">
        <h1>Freelance Services</h1>
        <p>Find the perfect professional for your needs</p>

        <div className="gigs-search-bar">
          <input
            placeholder="Search services..."
            className="form-input"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <select
            className="form-input gigs-sort-select"
            value={filters.sort}
            onChange={e => handleFilterChange({ sort: e.target.value })}
          >
            <option value="latest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="jobs-grid-layout">
        {/* Sidebar Filters */}
        <div className="filter-sidebar">
          <GigFilters filters={filters} onChange={handleFilterChange} onClear={clearFilters} />
        </div>

        {/* Gigs Grid */}
        <div className="jobs-list-section">
          {loading ? (
            <div className="gigs-loading-state">
              <Loader2 className="animate-spin gigs-loading-spinner" size={40} />
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <h3>No services found</h3>
              <p>Try adjusting your search or filters.</p>
              <button
                onClick={clearFilters}
                className="btn btn-secondary empty-state-button"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="gigs-grid">
                {items.map(gig => (
                  <GigCard key={gig._id} gig={gig} />
                ))}
              </div>

              {/* Pagination */}
              {total > 12 && (
                <div className="pagination-controls">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="btn btn-secondary"
                  >
                    Previous
                  </button>
                  <span className="pagination-spacing">
                    Page {page}
                  </span>
                  <button
                    disabled={items.length < 12}
                    onClick={() => setPage(p => p + 1)}
                    className="btn btn-secondary"
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
