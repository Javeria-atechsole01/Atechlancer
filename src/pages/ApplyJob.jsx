import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../services/jobService';
import { applicationService } from '../services/applicationService';
import { Loader2, DollarSign, Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth() || {};
  const localUser = user || JSON.parse(localStorage.getItem('user') || '{}');
  const isCandidate = localUser?.role === 'freelancer' || localUser?.role === 'student';
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 text-center">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-navy-900 mb-4 text-center">Job Description</h3>
              <div className="prose max-w-none text-gray-600 whitespace-pre-line leading-relaxed">
                {job.description}
              </div>
            </section>
            <section>
              <h3 className="text-xl font-bold text-navy-900 mb-4 text-center">Required Skills</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills && job.skills.map((s, i) => (
                  <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </section>
            {Array.isArray(job.requirements) && job.requirements.length > 0 && (
              <section>
                <h3 className="text-xl font-bold text-navy-900 mb-4">Requirements</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {job.requirements.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h3 className="text-xl font-bold text-navy-900 mb-4 text-center">Application Form</h3>
              {!isCandidate && (
                <div className="card" style={{ marginBottom: '1rem', padding: '0.75rem', borderColor: '#fee2e2', backgroundColor: '#fff1f2' }}>
                  <div style={{ color: '#b91c1c', fontWeight: 600 }}>Please login as a freelancer or student to apply.</div>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="form-label">Cover Letter</label>
                  <textarea
                    className="search-input w-full text-center"
                    rows={6}
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    placeholder="Explain your experience and suitability"
                    disabled={!isCandidate}
                  />
                </div>
                <div>
                  <label className="form-label">Expected Rate (USD)</label>
                  <input
                    type="number"
                    className="search-input w-full text-center"
                    value={expectedRate}
                    onChange={(e) => setExpectedRate(e.target.value)}
                    placeholder="e.g. 500"
                    disabled={!isCandidate}
                  />
                </div>
                <div>
                  <label className="form-label">Portfolio URL</label>
                  <input
                    type="url"
                    className="search-input w-full text-center"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://your-portfolio.com"
                    disabled={!isCandidate}
                  />
                </div>
                <div>
                  <label className="form-label">Upload Resume (PDF)</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                    disabled={!isCandidate}
                  />
                </div>
                <div className="flex gap-2">
                  <button className="btn btn-secondary" onClick={() => navigate('/jobs/' + id)}>Cancel</button>
                  <button className="btn btn-primary" disabled={submitting || !isCandidate} onClick={submit}>
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </div>
            </section>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
