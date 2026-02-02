import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Clock, DollarSign, Filter, Briefcase } from 'lucide-react';
// import { jobsService } from '../services/jobsService'; // To be implemented

const Jobs = () => {
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
