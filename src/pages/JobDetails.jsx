import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { Loader2, DollarSign, Clock, MapPin, Briefcase, Calendar, CheckCircle, ChevronLeft, Share2 } from 'lucide-react';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // Basic auth check
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isOwner = job && user && (job.employerId?._id === user._id || job.employerId === user._id);

  useEffect(() => {
    loadJob();
  }, [id]);

  const loadJob = async () => {
    try {
      const data = await jobService.getById(id);
      setJob(data);
    } catch (err) {
      console.error("Failed to load job", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      await jobService.delete(id);
      navigate('/jobs');
    } catch (err) {
      console.error('Failed to delete job', err);
      alert('Failed to delete job');
    }
  };

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-primary-600" size={40} /></div>;
  if (!job) return <div className="text-center p-20">Job not found.</div>;

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
                  {job.employerId?.name ? job.employerId.name[0] : 'J'}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-navy-900 mb-1">{job.title}</h1>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span className="font-semibold text-primary-600">{job.employerId?.name || 'AtechLancer Partner'}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="flex items-center gap-1"><MapPin size={14} /> {job.locationType || 'Remote'}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
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
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold uppercase tracking-wider">{job.category}</span>
              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-semibold uppercase tracking-wider">{job.type || 'Freelance'}</span>
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-semibold uppercase tracking-wider">{job.experienceLevel || 'Mid Level'}</span>
            </div>

            {isOwner && (
              <div className="flex gap-3 pt-4 border-t border-gray-50">
                <button
                  onClick={() => navigate(`/dashboard/employer/jobs/edit/${id}`)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-all"
                >
                  Edit Job
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-all"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <h3 className="text-xl font-bold text-navy-900 mb-4">Job Description</h3>
            <div className="prose max-w-none text-gray-600 whitespace-pre-line leading-relaxed">
              {job.description}
            </div>

            {job.responsibilities && (
              <>
                <h3 className="text-xl font-bold text-navy-900 mt-8 mb-4">Responsibilities</h3>
                <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                  {job.responsibilities}
                </div>
              </>
            )}

            {job.requirements && (
              <>
                <h3 className="text-xl font-bold text-navy-900 mt-8 mb-4">Requirements</h3>
                <div className="prose max-w-none text-gray-600 whitespace-pre-line">
                  {job.requirements}
                </div>
              </>
            )}

            <h3 className="text-xl font-bold text-navy-900 mt-8 mb-4">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills && job.skills.map((skill, index) => (
                <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-navy-900 mb-6 font-primary text-center">Job Overview</h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center gap-2"><DollarSign size={16} /> Budget</span>
                  <span className="font-bold text-navy-900">${job.budget}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center gap-2"><Briefcase size={16} /> Type</span>
                  <span className="font-bold text-navy-900 capitalize">{job.type || 'Freelance'}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-50">
                  <span className="text-gray-500 flex items-center gap-2"><Clock size={16} /> Status</span>
                  <span className="font-bold text-navy-900 capitalize">{job.status}</span>
                </div>
              </div>

              {!isOwner && (
                <button
                  onClick={() => navigate(`/jobs/${id}/apply`)}
                  className="w-full mt-8 bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Apply Now
                </button>
              )}
              <button className="w-full mt-3 bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50 transition-colors">
                Save Job
              </button>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-bold text-navy-900 mb-2">About the Employer</h4>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold border border-gray-200 text-navy-700">
                  {job.employerId?.name ? job.employerId.name[0] : 'J'}
                </div>
                <div>
                  <div className="font-bold text-sm">{job.employerId?.name || 'AtechLancer Partner'}</div>
                  <div className="text-xs text-green-600 flex items-center gap-1"><CheckCircle size={10} /> Verified</div>
                </div>
              </div>
              <p className="text-xs text-gray-500">Member since 2023</p>
              <button className="text-primary-600 text-sm font-semibold mt-2 hover:underline">View Profile</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
