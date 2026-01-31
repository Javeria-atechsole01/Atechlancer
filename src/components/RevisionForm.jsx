import React, { useState } from 'react';

const RevisionForm = ({ onRequest }) => {
  const [message, setMessage] = useState('');
  const submit = (e) => {
    e.preventDefault();
    onRequest(message);
    setMessage('');
  };
  return (
    <form onSubmit={submit} className="auth-form">
      <textarea className="form-input" placeholder="Revision details" value={message} onChange={e=>setMessage(e.target.value)} />
      <button className="btn btn-secondary" type="submit">Request Revision</button>
    </form>
  );
};

export default RevisionForm;
