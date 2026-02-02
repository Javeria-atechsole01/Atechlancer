import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Briefcase, ChevronLeft, Share2, Flag, CheckCircle } from 'lucide-react';

const JobDetails = () => {
    const { id } = useParams();
    const [showApplyModal, setShowApplyModal] = useState(false);

    // Mock Data
    const job = {
        id: 1,
        title: 'Senior React Engineer',
        company: 'TechFlow',
        description: '<p>We are looking for an experienced <strong>React Engineer</strong> to join our team...</p>',
        responsibilities: '<ul><li>Build reusable components</li><li>Optimize frontend performance</li></ul>',
        requirements: '<ul><li>3+ years React</li><li>TypeScript experience</li></ul>',
        budget: 5000,
        type: 'Full-time',
        locationType: 'Remote',
        category: 'Web Development',
        posted: '2 days ago',
        skills: ['React', 'Node.js', 'Redux'],
        experienceLevel: 'Senior'
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <Link to="/jobs" className="inline-flex items-center gap-2 text-gray-500 hover:text-navy-900 mb-6 transition-colors font-medium">
                <ChevronLeft size={20} /> Back to Jobs
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Header */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 bg-navy-50 rounded-xl flex items-center justify-center text-navy-700 font-bold text-2xl">
                                    {job.company[0]}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold text-navy-900 mb-1">{job.title}</h1>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="font-semibold text-primary-600">{job.company}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.locationType}</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span>Posted {job.posted}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-navy-900 transition-colors">
                                    <Share2 size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">{job.category}</span>
                            <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold">{job.type}</span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold">{job.experienceLevel}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm prose max-w-none">
                        <h3 className="text-xl font-bold text-navy-900 mb-4">Job Description</h3>
                        <div dangerouslySetInnerHTML={{ __html: job.description }} />

                        <h3 className="text-xl font-bold text-navy-900 mt-8 mb-4">Responsibilities</h3>
                        <div dangerouslySetInnerHTML={{ __html: job.responsibilities }} />

                        <h3 className="text-xl font-bold text-navy-900 mt-8 mb-4">Requirements</h3>
                        <div dangerouslySetInnerHTML={{ __html: job.requirements }} />
                    </div>
                </div>

                {/* Sticky Sidebar */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-6">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-navy-900 mb-6">Job Summary</h3>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                    <span className="text-gray-500 flex items-center gap-2"><DollarSign size={16} /> Budget</span>
                                    <span className="font-bold text-navy-900">${job.budget}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                    <span className="text-gray-500 flex items-center gap-2"><Briefcase size={16} /> Type</span>
                                    <span className="font-bold text-navy-900">{job.type}</span>
                                </div>
                                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                                    <span className="text-gray-500 flex items-center gap-2"><Clock size={16} /> Experience</span>
                                    <span className="font-bold text-navy-900">{job.experienceLevel}</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowApplyModal(true)}
                                className="w-full mt-8 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Apply Now
                            </button>
                            <button className="w-full mt-3 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                                Save Job
                            </button>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                            <h4 className="font-bold text-navy-900 mb-2">About the Employer</h4>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold border border-gray-200">
                                    {job.company[0]}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{job.company}</div>
                                    <div className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Verified</div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500">Member since 2023</p>
                            <button className="text-primary-600 text-sm font-semibold mt-2 hover:underline">View Profile</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal Placeholder */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6 animate-in zoom-in-95 duration-200">
                        <h2 className="text-2xl font-bold mb-4">Apply to {job.title}</h2>
                        <textarea className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32" placeholder="Why are you a good fit?"></textarea>
                        <div className="flex gap-3 justify-end">
                            <button onClick={() => setShowApplyModal(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg">Cancel</button>
                            <button className="px-6 py-2 bg-primary-600 text-white font-bold rounded-lg hover:bg-primary-700">Submit Application</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetails;
