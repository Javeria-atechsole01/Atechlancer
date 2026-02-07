import React, { useEffect, useState } from 'react';
import { jobService } from '../services/jobService';
import JobCard from '../components/jobs/JobCard';
import { Loader2, Search, Filter } from 'lucide-react';
import './jobs.css';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Search state
  const [searchInput, setSearchInput] = useState('');

  // Filter state
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return {
      search: params.get('search') || '',
      category: params.get('category') || '',
      minBudget: '',
      maxBudget: '',
      sort: 'latest'
    };
  });

  useEffect(() => {
    if (filters.search) {
      setSearchInput(filters.search);
    }
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters(prev => {
        if (prev.search === searchInput) return prev;
        return { ...prev, search: searchInput };
      });
      if (filters.search !== searchInput) setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Load jobs on filter/page change
  useEffect(() => {
    loadJobs();
  }, [filters, page]);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const query = { ...filters, page, limit: 9 };
      // Remove empty filters
      Object.keys(query).forEach(key => (query[key] === '' || query[key] === null) && delete query[key]);

      const data = await jobService.getAll(query);
      setJobs(data.results || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to load jobs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="jobs-page">
      <div className="jobs-header">
        <div className="jobs-title-section">
          <h1>Find Jobs</h1>
          <p>Explore the latest opportunities</p>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
            placeholder="Search by title or keyword..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="jobs-grid-layout">
        {/* Filters Sidebar */}
        <div className="filter-sidebar">
          <div className="filter-card">
            <div className="filter-header">
              <Filter size={20} />
              <h3>Filters</h3>
            </div>

            <div className="filter-content">
              {/* Category */}
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <select
                  className="form-input"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option value="">All Categories</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Design">Design</option>
                  <option value="Writing">Writing</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              {/* Budget */}
              <div className="filter-group">
                <label className="filter-label">Budget Range</label>
                <div className="budget-inputs">
                  <input
                    type="number"
                    placeholder="Min"
                    className="form-input"
                    value={filters.minBudget}
                    onChange={(e) => handleFilterChange('minBudget', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="form-input"
                    value={filters.maxBudget}
                    onChange={(e) => handleFilterChange('maxBudget', e.target.value)}
                  />
                </div>
              </div>

              {/* Sort */}
              <div className="filter-group">
                <label className="filter-label">Sort By</label>
                <select
                  className="form-input"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange('sort', e.target.value)}
                >
                  <option value="latest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="budget_high">Highest Budget</option>
                  <option value="budget_low">Lowest Budget</option>
                </select>
              </div>

              <button
                className="btn btn-secondary"
                style={{ width: '100%', marginTop: '1rem' }}
                onClick={() => {
                  setSearchInput('');
                  setFilters({
                    search: '',
                    category: '',
                    minBudget: '',
                    maxBudget: '',
                    sort: 'latest'
                  });
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="jobs-list-section">
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
              <Loader2 className="animate-spin" style={{ color: 'var(--primary-600)' }} size={40} />
            </div>
          ) : jobs.length > 0 ? (
            <div className="jobs-list-container">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No jobs found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="pagination-controls">
              <button
                className="btn btn-secondary"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span style={{ padding: '0 1rem', fontWeight: '500' }}>
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-secondary"
                disabled={page === totalPages}
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default Jobs;
