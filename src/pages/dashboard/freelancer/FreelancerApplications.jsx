import React, { useEffect, useState } from 'react';
import { applicationService } from '../../../services/applicationService';
import { Loader2 } from 'lucide-react';

const FreelancerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await applicationService.myApplications();
        setApplications(data.results || data || []);
      } catch {
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="flex-center" style={{ minHeight: '40vh' }}>
          <Loader2 className="animate-spin text-primary-600" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1 className="page-title">My Job Applications</h1>
          <p className="page-description">Track all your submitted applications and their current statuses.</p>
        </div>
      </div>

      <div className="card">
        {applications.length === 0 ? (
          <div className="empty-placeholder-box">No applications yet.</div>
        ) : (
          <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                <th style={{ padding: '1rem' }}>Job</th>
                <th style={{ padding: '1rem' }}>Expected Rate</th>
                <th style={{ padding: '1rem' }}>Status</th>
                <th style={{ padding: '1rem' }}>Applied On</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app._id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                  <td style={{ padding: '1rem', fontWeight: 600 }}>{app.jobId?.title || 'Job'}</td>
                  <td style={{ padding: '1rem' }}>{app.expectedRate ? `$${app.expectedRate}` : '-'}</td>
                  <td style={{ padding: '1rem' }}>
                    <span className="tag">{app.status || 'submitted'}</span>
                  </td>
                  <td style={{ padding: '1rem' }}>
                    {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default FreelancerApplications;
