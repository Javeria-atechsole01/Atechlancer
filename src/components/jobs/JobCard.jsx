import React from 'react';
import { DollarSign, Briefcase, MapPin } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div style={{ background: 'white', border: '1px solid var(--gray-200)', borderRadius: 12, padding: '1rem', display: 'grid', gap: '0.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontWeight: 700, color: 'var(--primary-900)', margin: 0 }}>{job.title}</h3>
        <span className="tag">{job.category || 'General'}</span>
      </div>
      <p style={{ color: 'var(--gray-600)' }}>{job.description?.slice(0, 140) || 'No description'}</p>
      <div style={{ display: 'flex', gap: '1rem', color: 'var(--gray-700)' }}>
        <span style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
          <DollarSign size={16} /> {job.budget ? `$${job.budget}` : 'Budget N/A'}
        </span>
        <span style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
          <Briefcase size={16} /> {job.type || 'Contract'}
        </span>
        <span style={{ display: 'inline-flex', gap: '0.5rem', alignItems: 'center' }}>
          <MapPin size={16} /> {job.location || 'Remote'}
        </span>
      </div>
    </div>
  );
};

export default JobCard;
