import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const RevisionForm = ({ onRequest }) => {
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitting(true);
    try {
      await onRequest(message.trim());
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
      <textarea
        className="search-input"
        rows={3}
        placeholder="Describe what needs to be revised"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-secondary" disabled={!message.trim() || submitting} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <RefreshCw size={16} /> {submitting ? 'Requesting...' : 'Request Revision'}
      </button>
    </form>
  );
};

export default RevisionForm;
