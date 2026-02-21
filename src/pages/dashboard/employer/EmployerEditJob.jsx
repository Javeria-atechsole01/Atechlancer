import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jobService } from '../../../services/jobService';
import './employer-post-job.css';

const EmployerEditJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [budget, setBudget] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await jobService.getJob(id);
        setJob(data);
        setTitle(data.title || '');
        setBudget(String(data.budget || ''));
      } catch {
        setJob(null);
      }
    };
    load();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await jobService.updateJob(id, { title, budget: Number(budget) });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h1 className="page-title">Edit Job</h1>
          <p className="page-description">Update job details</p>
        </div>
      </div>

      <div className="card">
        {!job ? (
          <div className="empty-placeholder-box">Job not found</div>
        ) : (
          <form onSubmit={onSubmit} className="post-job-form">
            <div className="form-group">
              <label>Title</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            </div>
            <div className="form-group">
              <label>Budget</label>
              <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="Budget" />
            </div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EmployerEditJob;
