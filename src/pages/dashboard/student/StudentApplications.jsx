import React, { useEffect, useState } from 'react';
import { applicationService } from '../../../services/applicationService';

const StudentApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await applicationService.myApplications();
      setApps(res.results || []);
    } catch (err) {
      console.error('Failed to load applications', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1 className="page-title">My Applications</h1>
          <p className="page-description">Your job applications and statuses.</p>
        </div>
      </div>

      <div className="card">
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
              <th style={{ padding: '1rem' }}>Date</th>
              <th style={{ padding: '1rem' }}>Job</th>
              <th style={{ padding: '1rem' }}>Budget</th>
              <th style={{ padding: '1rem' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td style={{ padding: '1rem' }} colSpan={4}>Loading...</td></tr>
            ) : apps.length === 0 ? (
              <tr><td style={{ padding: '1rem' }} colSpan={4}>No applications yet.</td></tr>
            ) : apps.map(a => (
              <tr key={a._id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                <td style={{ padding: '1rem', color: 'var(--gray-600)' }}>{new Date(a.createdAt).toLocaleString()}</td>
                <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--brand-navy)' }}>{a.jobId?.title}</td>
                <td style={{ padding: '1rem' }}>${a.jobId?.budget}</td>
                <td style={{ padding: '1rem' }}>
                  <span className="tag">{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentApplications;
