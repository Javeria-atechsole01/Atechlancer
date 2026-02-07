import React, { useEffect, useState } from 'react';
import { applicationService } from '../../../services/applicationService';
import './student.css';

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

      <div className="card dashboard-table-wrapper">
        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Job</th>
              <th>Budget</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center py-lg">Loading...</td></tr>
            ) : apps.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-lg text-muted italic">No applications yet.</td></tr>
            ) : apps.map(a => (
              <tr key={a._id}>
                <td className="item-meta">{new Date(a.createdAt).toLocaleString()}</td>
                <td className="item-title">{a.jobId?.title}</td>
                <td className="font-semibold">${a.jobId?.budget}</td>
                <td>
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
