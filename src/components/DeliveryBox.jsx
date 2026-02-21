import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const DeliveryBox = ({ onDeliver }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      if (message) fd.append('message', message);
      await onDeliver(fd);
      setFile(null);
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem' }}>
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <textarea
        className="search-input"
        rows={3}
        placeholder="Add a message for your delivery (optional)"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btn btn-primary" disabled={!file || submitting} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <Upload size={16} /> {submitting ? 'Delivering...' : 'Deliver Work'}
      </button>
    </form>
  );
};

export default DeliveryBox;
