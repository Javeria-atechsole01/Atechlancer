import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, Loader2, Calendar } from 'lucide-react';
import { jobService } from '../../../services/jobService';
import { useNavigate } from 'react-router-dom';


const EmployerCandidates = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    
    // Filter State
    const [searchInput, setSearchInput] = useState('');
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        minBudget: '',
        maxBudget: ''
    });

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters(prev => ({ ...prev, search: searchInput }));
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // Fetch Jobs
    useEffect(() => {
        fetchJobs();
    }, [filters]);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const params = {
                search: filters.search,
                category: filters.category,
                minBudget: filters.minBudget,
                maxBudget: filters.maxBudget,
                sort: 'latest',
                page: 1,
                limit: 12
            };
            const data = await jobService.getAll(params);
            setJobs(data.results || []);
        } catch (error) {
            console.error("Failed to fetch jobs", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Find Jobs</h1>
                    <p className="page-description">Explore the latest opportunities.</p>
                </div>
            </div>

            {/* Search Bar & Filters */}
            <div className="card" style={{ marginBottom: '2rem', padding: '1rem' }}>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--gray-400)' }} size={20} />
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search by title or keyword..." 
                            style={{ paddingLeft: '2.5rem', width: '100%' }} 
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                    </div>
                    <button 
                        className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <Filter size={18} /> Filters
                    </button>
                    <button className="btn btn-primary" onClick={fetchJobs}>Search</button>
                </div>

                {/* Expanded Filters */}
                {showFilters && (
                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--gray-100)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        <div>
                            <label className="form-label">Category</label>
                            <select 
                                name="category"
                                className="search-input w-full"
                                value={filters.category}
                                onChange={handleFilterChange}
                            >
                                <option value="">All Categories</option>
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                                <option value="Marketing">Marketing</option>
                                <option value="Data Science">Data Science</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Min Budget ($)</label>
                            <input 
                                type="number" 
                                className="search-input w-full" 
                                placeholder="0"
                                name="minBudget"
                                value={filters.minBudget}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div>
                            <label className="form-label">Max Budget ($)</label>
                            <input 
                                type="number" 
                                className="search-input w-full" 
                                placeholder="1000"
                                name="maxBudget"
                                value={filters.maxBudget}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Jobs Grid */}
            {loading ? (
                <div className="flex justify-center p-12">
                    <Loader2 className="animate-spin text-primary-600" size={32} />
                </div>
            ) : jobs.length === 0 ? (
                <div className="text-center p-12 text-gray-500">
                    <Briefcase size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No jobs found matching your criteria.</p>
                </div>
            ) : (
                <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                    {jobs.map((job) => {
                        const daysAgo = Math.max(0, Math.floor((Date.now() - new Date(job.createdAt).getTime()) / (1000 * 60 * 60 * 24)));
                        const employerInitial = (job.employerId?.name || 'A').charAt(0).toUpperCase();
                        return (
                            <div
                                className="card"
                                key={job._id}
                                style={{
                                    borderRadius: '16px',
                                    boxShadow: '0 8px 24px rgba(16, 24, 40, 0.08)',
                                    padding: '16px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    minHeight: '240px'
                                }}
                            >
                                {/* Header */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            backgroundColor: 'var(--gray-100)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            color: 'var(--brand-navy)'
                                        }}>
                                            {employerInitial}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--brand-navy)' }}>
                                                {job.employerId?.name || 'Unknown Company'}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                                                {daysAgo} days ago
                                            </div>
                                        </div>
                                    </div>
                                    <span className="inline-block bg-primary-50 text-primary-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                        {job.category || 'Job'}
                                    </span>
                                </div>

                                {/* Title */}
                                <div style={{ marginBottom: '10px' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '800', color: 'var(--brand-navy)' }}>
                                        {job.title}
                                    </h3>
                                </div>

                                {/* Tags */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                                    {job.skills && job.skills.slice(0, 2).map((skill, index) => (
                                        <span key={index} className="tag" style={{ margin: 0, fontSize: '0.75rem' }}>
                                            {skill}
                                        </span>
                                    ))}
                                    {job.status && (
                                        <span className="tag" style={{ margin: 0, fontSize: '0.75rem' }}>
                                            {job.status}
                                        </span>
                                    )}
                                </div>

                                {/* Footer */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--gray-100)', paddingTop: '12px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--brand-navy)' }}>
                                        <span style={{ fontWeight: 700 }}>${job.budget}</span>
                                        <span style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>Budget</span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-secondary"
                                            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                                            onClick={() => navigate(`/jobs/${job._id}`)}
                                        >
                                            View details
                                        </button>
                                        <button
                                            className="btn btn-primary"
                                            style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                                            onClick={() => navigate(`/jobs/${job._id}/apply`)}
                                        >
                                            Apply now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            
        </div>
    );
};

export default EmployerCandidates;
