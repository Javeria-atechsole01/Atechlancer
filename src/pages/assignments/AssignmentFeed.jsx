import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignmentService } from '../../services/assignmentService';
import { Loader2, Search, Filter, BookOpen, Clock, DollarSign, ArrowRight } from 'lucide-react';

const AssignmentFeed = () => {
    const navigate = useNavigate();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        subject: '',
        academicLevel: '',
        minBudget: '',
        maxBudget: ''
    });

    useEffect(() => {
        loadAssignments();
    }, [filters]);

    const loadAssignments = async () => {
        setLoading(true);
        try {
            const data = await assignmentService.getAll(filters);
            setAssignments(data);
        } catch (error) {
            console.error("Failed to load assignments", error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-navy-900">Assignment <span className="text-primary-600">Marketplace</span></h1>
                        <p className="text-gray-500 mt-1">Browse open assignments and submit your expertise</p>
                    </div>

                    <div className="flex w-full md:w-auto gap-3">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by title or subject..."
                                className="search-input w-full pl-10"
                            />
                        </div>
                        <button className="bg-white border border-gray-200 p-3 rounded-xl hover:bg-gray-100 transition-colors md:hidden">
                            <Filter size={20} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm sticky top-24">
                            <div className="flex items-center gap-2 mb-6 font-bold text-navy-900">
                                <Filter size={20} />
                                <h3>Filters</h3>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                    <select name="subject" value={filters.subject} onChange={handleFilterChange} className="search-input w-full">
                                        <option value="">All Subjects</option>
                                        <option>Computer Science</option>
                                        <option>Mathematics</option>
                                        <option>Physics</option>
                                        <option>Business & Finance</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Academic Level</label>
                                    <select name="academicLevel" value={filters.academicLevel} onChange={handleFilterChange} className="search-input w-full">
                                        <option value="">All Levels</option>
                                        <option>High School</option>
                                        <option>Undergraduate</option>
                                        <option>Graduate</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                                    <div className="flex items-center gap-2">
                                        <input type="number" name="minBudget" placeholder="Min" value={filters.minBudget} onChange={handleFilterChange} className="search-input w-full px-2" />
                                        <span className="text-gray-400">-</span>
                                        <input type="number" name="maxBudget" placeholder="Max" value={filters.maxBudget} onChange={handleFilterChange} className="search-input w-full px-2" />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setFilters({ subject: '', academicLevel: '', minBudget: '', maxBudget: '' })}
                                    className="w-full text-primary-600 font-bold text-sm hover:underline mt-4"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Assignment List */}
                    <div className="lg:col-span-3 space-y-6">
                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="animate-spin text-primary-600" size={40} />
                            </div>
                        ) : assignments.length > 0 ? (
                            assignments.map((assignment) => (
                                <AssignmentCard key={assignment._id} assignment={assignment} />
                            ))
                        ) : (
                            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <BookOpen className="text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-navy-900">No Assignments Found</h3>
                                <p className="text-gray-500 max-w-xs mx-auto mt-2">Try adjusting your filters or search terms to find relevant opportunities.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const AssignmentCard = ({ assignment }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/assignments/${assignment._id}`)}
            className="group bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-primary-100 transition-all cursor-pointer relative overflow-hidden"
        >
            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                <div className="flex-1">
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-xs font-bold uppercase tracking-wider">
                            {assignment.subject}
                        </span>
                        <span className="px-3 py-1 bg-navy-50 text-navy-600 rounded-full text-xs font-bold uppercase tracking-wider">
                            {assignment.academicLevel}
                        </span>
                    </div>
                    <h2 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {assignment.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                        {assignment.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5 font-medium">
                            <Clock size={16} className="text-gray-400" />
                            Deadline: {new Date(assignment.deadline).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5 font-medium">
                            <BookOpen size={16} className="text-gray-400" />
                            {assignment.preferences?.plagiarismFree ? 'Plagiarism Free Required' : 'Standard Submission'}
                        </div>
                    </div>
                </div>

                <div className="flex flex-row md:flex-col justify-between md:items-end gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">
                            ${assignment.budget.min} - ${assignment.budget.max}
                        </div>
                        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                            Estimated Budget
                        </div>
                    </div>

                    <div className="flex items-center gap-2 bg-navy-900 text-white px-5 py-2.5 rounded-xl font-bold text-sm group-hover:bg-primary-600 transition-all shadow-md">
                        View Details <ArrowRight size={16} />
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 w-24 h-24 bg-primary-50 -mr-12 -mt-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
    );
};

export default AssignmentFeed;
