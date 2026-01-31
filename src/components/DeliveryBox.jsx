import React, { useState } from 'react';

const DeliveryBox = ({ onDeliver }) => {
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('message', message);
    [...files].forEach(f => fd.append('files', f));
    onDeliver(fd);
  };

  return (
    <form onSubmit={submit} className="auth-form">
      <textarea className="form-input" placeholder="Delivery message" value={message} onChange={e=>setMessage(e.target.value)} />
      <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
      <button className="btn btn-primary" type="submit">Send Delivery</button>
    </form>
  );
};

export default DeliveryBox;
