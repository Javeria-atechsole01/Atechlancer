import React, { useEffect, useState } from 'react';
import { jobService } from '../services/jobService';
import JobCard from '../components/jobs/JobCard';
import { Loader2, Search, Filter } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy-900">Find Jobs</h1>
          <p className="text-gray-600 mt-1">Explore the latest opportunities</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            className="search-input w-full pl-10"
            placeholder="Search by title or keyword..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card">
            <div className="flex items-center gap-2 mb-4 text-navy-900 font-bold">
              <Filter size={20} />
              <h3>Filters</h3>
            </div>

            <div className="space-y-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  className="search-input w-full"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="search-input"
                    value={filters.minBudget}
                    onChange={(e) => handleFilterChange('minBudget', e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="search-input"
                    value={filters.maxBudget}
                    onChange={(e) => handleFilterChange('maxBudget', e.target.value)}
                  />
                </div>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <select
                  className="search-input w-full"
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
                className="btn btn-outline w-full mt-2"
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
        <div className="lg:col-span-3">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary-600" size={40} />
            </div>
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <h3 className="text-xl font-semibold text-gray-600">No jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                className="btn btn-outline"
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
              >
                Previous
              </button>
              <span className="flex items-center px-4 font-medium text-gray-700">
                Page {page} of {totalPages}
              </span>
              <button
                className="btn btn-outline"
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
