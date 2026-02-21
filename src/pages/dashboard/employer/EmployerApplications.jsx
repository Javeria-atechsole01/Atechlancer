import React, { useEffect, useState } from 'react';
import { applicationService } from '../../../services/applicationService';
import { Loader2 } from 'lucide-react';
import './employer-post-job.css';

const EmployerApplications = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await applicationService.employerSummary();
        setSummary(data);
      } catch {
        setSummary(null);
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
          <h1 className="page-title">Job Applications</h1>
          <p className="page-description">Overview of applications submitted to your jobs.</p>
        </div>
      </div>

      <div className="card">
        {!summary ? (
          <div className="empty-placeholder-box">No application data available.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div className="stat-card">
              <div className="stat-value">{summary.totalApplications || 0}</div>
              <div className="stat-label">Total Applications</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{summary.pending || 0}</div>
              <div className="stat-label">Pending</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{summary.reviewed || 0}</div>
              <div className="stat-label">Reviewed</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{summary.accepted || 0}</div>
              <div className="stat-label">Accepted</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{summary.rejected || 0}</div>
              <div className="stat-label">Rejected</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerApplications;
