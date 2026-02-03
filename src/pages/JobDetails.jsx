import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { Loader2, DollarSign, Clock, MapPin, Briefcase, Calendar, CheckCircle } from 'lucide-react';
 

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Basic auth check - replace with actual context usage if available
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

  if (loading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;
  if (!job) return <div className="text-center p-20">Job not found.</div>;

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-navy-900 text-white p-8">
          <div className="flex flex-col items-center text-center gap-4">
            <span className="inline-block bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {job.category}
            </span>
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <div className="flex items-center justify-center gap-6 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span>{job.employerId?.name || 'Unknown Company'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {isOwner && (
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate(`/dashboard/employer/jobs/edit/${id}`)}
                  className="btn btn-secondary"
                  style={{ padding: '10px 16px', fontWeight: 600 }}
                >
                  Edit Job
                </button>
                <button
                  onClick={handleDelete}
                  className="btn"
                  style={{ backgroundColor: '#ef4444', color: '#fff', padding: '10px 16px', borderRadius: '0.5rem', fontWeight: 600 }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-navy-900 mb-4 text-center">Job Description</h3>
              <div className="prose max-w-none text-gray-600 whitespace-pre-line leading-relaxed text-center">
                {job.description}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold text-navy-900 mb-4 text-center">Required Skills</h3>
              <div className="flex flex-wrap gap-2 justify-center text-center">
                {job.skills && job.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium text-center">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-navy-900 mb-6 text-center">Job Overview</h3>
              
              <div className="space-y-4">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="flex items-center justify-center gap-2 font-bold text-navy-900">
                    <DollarSign size={18} color="orange" />
                    <span><b>Budget</b></span>
                  </div>
                  <p className="font-bold text-navy-900 text-lg">${job.budget}</p>
                </div>

                <div className="flex flex-col items-center text-center gap-2">
                  <div className="flex items-center justify-center gap-2 font-bold text-navy-900">
                    <CheckCircle size={18} color='green' />
                    <span><b>Status</b></span>
                  </div>
                  <p className="font-bold text-navy-900 capitalize">{job.status}</p>
                </div>

                <div className="flex flex-col items-center text-center gap-2">
                  <div className="flex items-center justify-center gap-2 font-bold text-navy-900">
                    <Briefcase size={18} color='purple' />
                    <span><b>Job Type</b></span>
                  </div>
                  <p className="font-bold text-navy-900 capitalize">{job.type || 'Freelance'}</p>
                </div>
              </div>

              {!isOwner && (
                <button
                  className="w-full btn btn-primary mt-8 py-3 text-lg font-semibold shadow-lg shadow-primary-500/30"
                  onClick={() => navigate(`/jobs/${id}/apply`)}
                >
                  Apply Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
