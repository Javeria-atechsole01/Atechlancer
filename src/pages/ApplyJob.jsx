import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { applicationService } from '../services/applicationService';
import { Loader2, DollarSign, Briefcase, Calendar, CheckCircle, ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './job-details.css';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const localUser = user || JSON.parse(localStorage.getItem('user') || '{}');
  const isCandidate = localUser?.role === 'freelancer' || localUser?.role === 'student' || localUser?.role === 'teacher';
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [expectedRate, setExpectedRate] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await jobService.getById(id);
        setJob(data);
      } catch {
        setJob(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async () => {
    try {
      setSubmitting(true);
      await applicationService.apply(id, { coverLetter, expectedRate, portfolioUrl, resumeFile });
      setCoverLetter('');
      setExpectedRate('');
      setPortfolioUrl('');
      setResumeFile(null);
      if (localUser?.role === 'freelancer') {
        navigate('/dashboard/freelancer/applications');
      } else if (localUser?.role === 'student') {
        navigate('/dashboard/student/applications');
      } else if (localUser?.role === 'teacher') {
        navigate('/dashboard/teacher/jobs');
      } else {
        navigate('/jobs/' + id);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Application submit failed. Login as candidate.';
      alert(msg);
    } finally {
      setSubmitting(false);
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
      <Link to={`/jobs/${id}`} className="back-link">
        <ChevronLeft size={20} /> Back to Job Details
      </Link>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <header className="apply-banner">
          <span className="badge-pill badge-blue" style={{ display: 'inline-block', marginBottom: '1rem' }}>
            {job.category}
          </span>
          <h1>{job.title}</h1>
          <div className="job-meta-line" style={{ justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Briefcase size={16} />
              <span>{job.employerId?.name || 'AtechLancer Partner'}</span>
            </div>
            <span className="dot-separator" style={{ background: 'rgba(255,255,255,0.3)' }}></span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} />
              <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </header>

        <div className="apply-form-container">
          <div className="job-layout" style={{ gap: '4rem' }}>
            <div className="main-content">
              <section>
                <h3 className="section-title">Job Description</h3>
                <div className="prose-content" style={{ marginBottom: '2rem' }}>
                  {job.description}
                </div>
              </section>

              <section style={{ marginBottom: '3rem' }}>
                <h3 className="section-title">Required Skills</h3>
                <div className="tag-list">
                  {job.skills && job.skills.map((s, i) => (
                    <span key={i} className="skill-tag">{s}</span>
                  ))}
                </div>
              </section>

              <section>
                <h3 className="section-title" style={{ fontSize: '1.5rem', borderBottom: '2px solid var(--gray-100)', paddingBottom: '0.75rem', marginBottom: '2rem' }}>
                  Application Form
                </h3>

                {!isCandidate && (
                  <div className="alert-warning" style={{ background: '#fff1f2', border: '1px solid #fee2e2', padding: '1rem', borderRadius: '8px', color: '#b91c1c', fontWeight: 600, marginBottom: '2rem' }}>
                    Please login as a freelancer, student, or teacher to apply.
                  </div>
                )}

                <div className="form-grid" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="form-group">
                    <label className="form-label">Cover Letter</label>
                    <textarea
                      className="search-input w-full"
                      style={{ minHeight: '180px', padding: '1rem' }}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Explain your experience and suitability..."
                      disabled={!isCandidate}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div className="form-group">
                      <label className="form-label">Expected Rate (USD)</label>
                      <div style={{ position: 'relative' }}>
                        <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--gray-400)' }} />
                        <input
                          type="number"
                          className="search-input w-full"
                          style={{ paddingLeft: '32px' }}
                          value={expectedRate}
                          onChange={(e) => setExpectedRate(e.target.value)}
                          placeholder="e.g. 500"
                          disabled={!isCandidate}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Portfolio URL</label>
                      <input
                        type="url"
                        className="search-input w-full"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://your-portfolio.com"
                        disabled={!isCandidate}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Resume (PDF preferred)</label>
                    <input
                      type="file"
                      className="search-input w-full"
                      style={{ paddingTop: '0.5rem' }}
                      onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                      disabled={!isCandidate}
                    />
                  </div>

                  <div className="form-actions" style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/jobs/' + id)} style={{ flex: 1, padding: '1rem' }}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" disabled={submitting || !isCandidate} onClick={submit} style={{ flex: 2, padding: '1rem' }}>
                      {submitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
