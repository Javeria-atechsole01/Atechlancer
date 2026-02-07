import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { Loader2, DollarSign, Clock, MapPin, Briefcase, Calendar, CheckCircle, ChevronLeft, Share2 } from 'lucide-react';
import './job-details.css';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
      <Loader2 className="animate-spin" style={{ color: 'var(--primary-600)' }} size={40} />
    </div>
  );

  if (!job) return <div className="job-details-page text-center">Job not found.</div>;

  return (
    <div className="job-details-page">
      <Link to="/jobs" className="back-link">
        <ChevronLeft size={20} /> Back to Jobs
      </Link>

      <div className="job-layout">
        <div className="main-content">
          <div className="card">
            <header className="job-header-card">
              <div className="header-main">
                <div className="employer-initial">
                  {job.employerId?.name ? job.employerId.name[0] : 'J'}
                </div>
                <div>
                  <h1 className="job-title">{job.title}</h1>
                  <div className="job-meta-line">
                    <span className="employer-name">{job.employerId?.name || 'AtechLancer Partner'}</span>
                    <span className="dot-separator"></span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={14} /> {job.locationType || 'Remote'}</span>
                    <span className="dot-separator"></span>
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button className="btn-icon">
                <Share2 size={20} />
              </button>
            </header>

            <div className="badge-row">
              <span className="badge-pill badge-blue">{job.category}</span>
              <span className="badge-pill badge-green">{job.type || 'Freelance'}</span>
              <span className="badge-pill badge-purple">{job.experienceLevel || 'Mid Level'}</span>
            </div>

            {isOwner && (
              <div className="owner-actions" style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-100)', display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => navigate(`/dashboard/employer/jobs/edit/${id}`)}
                  className="btn btn-secondary"
                >
                  Edit Job
                </button>
                <button
                  onClick={handleDelete}
                  className="btn"
                  style={{ background: '#fef2f2', color: '#dc2626', fontWeight: 700 }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <div className="card" style={{ marginTop: '1.5rem' }}>
            <h3 className="section-title">Job Description</h3>
            <div className="prose-content">
              {job.description}
            </div>

            {job.responsibilities && (
              <div className="job-section">
                <h3 className="section-title">Responsibilities</h3>
                <div className="prose-content">
                  {job.responsibilities}
                </div>
              </div>
            )}

            {job.requirements && (
              <div className="job-section">
                <h3 className="section-title">Requirements</h3>
                <div className="prose-content">
                  {job.requirements}
                </div>
              </div>
            )}

            <div className="job-section">
              <h3 className="section-title">Required Skills</h3>
              <div className="tag-list">
                {job.skills && job.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="sticky-sidebar">
          <div className="card">
            <h3 className="section-title" style={{ textAlign: 'center', fontSize: '1.125rem' }}>Job Overview</h3>

            <div className="overview-table">
              <div className="overview-row">
                <span className="overview-label"><DollarSign size={16} /> Budget</span>
                <span className="overview-value">${job.budget}</span>
              </div>
              <div className="overview-row">
                <span className="overview-label"><Briefcase size={16} /> Type</span>
                <span className="overview-value capitalize">{job.type || 'Freelance'}</span>
              </div>
              <div className="overview-row">
                <span className="overview-label"><Clock size={16} /> Status</span>
                <span className="overview-value capitalize">{job.status}</span>
              </div>
            </div>

            {!isOwner && (
              <button
                onClick={() => navigate(`/jobs/${id}/apply`)}
                className="btn-full apply-btn"
              >
                Apply Now
              </button>
            )}
            <button className="btn-full save-btn">
              Save Job
            </button>
          </div>

          <div className="employer-mini-card">
            <h4 style={{ fontWeight: 800, color: 'var(--primary-900)', marginBottom: '1rem' }}>About the Employer</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '2.5rem', height: '2.5rem', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, border: '1px solid var(--gray-200)', color: 'var(--primary-700)' }}>
                {job.employerId?.name ? job.employerId.name[0] : 'J'}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{job.employerId?.name || 'AtechLancer Partner'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success-green)', display: 'flex', alignItems: 'center', gap: '4px' }}><CheckCircle size={10} /> Verified</div>
              </div>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--gray-400)' }}>Member since 2023</p>
            <button className="link-btn" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>View Profile</button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default JobDetails;
