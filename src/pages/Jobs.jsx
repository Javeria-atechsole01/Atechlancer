
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
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minBudget: '',
    maxBudget: '',
    sort: 'latest'
  });

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
  );}

// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  MapPin, Clock, DollarSign,  Briefcase } from 'lucide-react';
// import { jobsService } from '../services/jobsService'; // To be implemented

const jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        type: [],
        locationType: [],
        budgetMin: '',
        budgetMax: ''
    });

    // Mock Data for now
    useEffect(() => {
        setTimeout(() => {
            setJobs([
                { id: 1, title: 'Senior React Engineer', company: 'TechFlow', type: 'Full-time', locationType: 'Remote', budget: 5000, skills: ['React', 'Node'], posted: '2 days ago' },
                { id: 2, title: 'UX Designer', company: 'Creative Studio', type: 'Freelance', locationType: 'Hybrid', budget: 1500, skills: ['Figma', 'UI'], posted: '1 day ago' },
                { id: 3, title: 'Content Writer', company: 'BuzzMedia', type: 'Contract', locationType: 'Remote', budget: 500, skills: ['SEO', 'Writing'], posted: '4 hours ago' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">

                {/* Filters Sidebar */}
                <div className="w-full md:w-64 shrink-0 space-y-6">
                    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                        <div className="flex items-center gap-2 mb-4 font-bold text-navy-900 border-b pb-2">
                            <Filter size={18} /> Filters
                        </div>

                        {/* Job Type */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-sm mb-3 text-gray-700">Job Type</h4>
                            <div className="space-y-2">
                                {['Full-time', 'Part-time', 'Freelance', 'Contract'].map(type => (
                                    <label key={type} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="mb-6">
                            <h4 className="font-semibold text-sm mb-3 text-gray-700">Location</h4>
                            <div className="space-y-2">
                                {['Remote', 'Onsite', 'Hybrid'].map(loc => (
                                    <label key={loc} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                        <input type="checkbox" className="rounded text-primary-600 focus:ring-primary-500" />
                                        {loc}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Budget */}
                        <div>
                            <h4 className="font-semibold text-sm mb-3 text-gray-700">Budget Range</h4>
                            <div className="flex gap-2">
                                <input type="number" placeholder="Min" className="w-full px-3 py-2 border rounded-lg text-sm" />
                                <input type="number" placeholder="Max" className="w-full px-3 py-2 border rounded-lg text-sm" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    {/* Search Header */}
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 flex gap-4 items-center">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search jobs by title, skill, or keyword..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <button className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary-700 transition-colors shadow-md">
                            Search
                        </button>
                    </div>

                    {/* Job List */}
                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-40 bg-gray-100 rounded-xl animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {jobs.map(job => (
                                <Link to={`/jobs/${job.id}`} key={job.id} className="block group">
                                    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all group-hover:border-primary-300 relative">
                                        <div className="flex justify-between items-start">
                                            <div className="flex gap-4">
                                                <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center text-navy-700 font-bold text-xl">
                                                    {job.company[0]}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-lg text-navy-900 group-hover:text-primary-600 transition-colors">{job.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                                        <span className="font-medium text-gray-700">{job.company}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.locationType}</span>
                                                        <span>•</span>
                                                        <span className="text-gray-400">{job.posted}</span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {job.skills.map(skill => (
                                                            <span key={skill} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">{skill}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-navy-900 text-lg">${job.budget}</div>
                                                <div className="text-xs text-gray-500 uppercase">{job.type}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default Jobs;
