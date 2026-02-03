import React, { useEffect, useState } from 'react';
import { jobService } from '../../../services/jobService';
import { applicationService } from '../../../services/applicationService';

const EmployerApplications = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState('');
  const [status, setStatus] = useState('');
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    try {
      const data = await jobService.getAll({ sort: 'latest', page: 1, limit: 100 });
      const mine = (data.results || []).filter(j => (j.employerId?._id || j.employerId) === user._id);
      setJobs(mine);
      if (mine.length && !selectedJob) setSelectedJob(mine[0]._id);
    } catch (err) {
      console.error('Failed to load jobs', err);
    }
  };

  const loadApps = async () => {
    if (!selectedJob) return;
    setLoading(true);
    try {
      const res = await applicationService.jobApplications(selectedJob, { status });
      setApps(res.results || []);
    } catch (err) {
      console.error('Failed to load applications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadJobs(); }, []);
  useEffect(() => { loadApps(); }, [selectedJob, status]);

  const update = async (id, newStatus) => {
    try {
      await applicationService.updateStatus(id, newStatus);
      await loadApps();
    } catch (err) {
      alert('Failed to update status');
      console.error(err);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1 className="page-title">Applications</h1>
          <p className="page-description">Review candidates and take action.</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <select className="search-input" value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}>
            <option value="">Select Job</option>
            {jobs.map(j => <option key={j._id} value={j._id}>{j.title}</option>)}
          </select>
          <select className="search-input" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Statuses</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
          <div style={{ marginLeft: 'auto' }}>
            {selectedJob && <span className="tag">Applications: {apps.length}</span>}
          </div>
        </div>
      </div>

      <div className="card">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Candidate</th>
              <th style={{ padding: '1rem' }}>Cover Letter</th>
              <th style={{ padding: '1rem' }}>Expected Rate</th>
              <th style={{ padding: '1rem' }}>Portfolio</th>
              <th style={{ padding: '1rem' }}>Resume</th>
              <th style={{ padding: '1rem' }}>Status</th>
              <th style={{ padding: '1rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td style={{ padding: '1rem' }} colSpan={8}>Loading...</td></tr>
            ) : apps.length === 0 ? (
              <tr><td style={{ padding: '1rem' }} colSpan={8}>No applications</td></tr>
            ) : apps.map(a => (
              <tr key={a._id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>{new Date(a.createdAt).toLocaleString()}</td>
                <td style={{ padding: '1rem' }}>{a.applicantId?.name} <div style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>{a.applicantId?.email}</div></td>
                <td style={{ padding: '1rem', maxWidth: '300px' }}>{a.coverLetter}</td>
                <td style={{ padding: '1rem' }}>${a.expectedRate || '-'}</td>
                <td style={{ padding: '1rem' }}>
                  {a.portfolioUrl ? <a href={a.portfolioUrl} target="_blank" rel="noreferrer" className="text-primary-600">Open</a> : '-'}
                </td>
                <td style={{ padding: '1rem' }}>
                  {a.resumeUrl ? <a href={a.resumeUrl} target="_blank" rel="noreferrer" className="text-primary-600">Download</a> : '-'}
                </td>
                <td style={{ padding: '1rem' }}><span className="tag">{a.status}</span></td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-secondary" onClick={() => update(a._id, 'shortlisted')}>Shortlist</button>
                    <button className="btn btn-secondary" onClick={() => update(a._id, 'rejected')}>Reject</button>
                    <button className="btn btn-primary" onClick={() => update(a._id, 'hired')}>Hire</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployerApplications;
