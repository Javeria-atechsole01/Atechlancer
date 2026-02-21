import React, { useEffect, useState } from 'react';
import { gigsService } from '../../../services/gigsService';

const FreelancerGigsManager = () => {
  const [gigs, setGigs] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', price: '', category: '' });

  const load = async () => {
    const items = await gigsService.mine();
    setGigs(items);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const items = await gigsService.mine();
        if (mounted) setGigs(items);
      } catch {
        if (mounted) setGigs([]);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const create = async (e) => {
    e.preventDefault();
    const payload = { ...form, price: Number(form.price) };
    await gigsService.create(payload);
    setForm({ title: '', description: '', price: '', category: '' });
    load();
  };

  const update = async (id, patch) => {
    await gigsService.update(id, patch);
    load();
  };

  const remove = async (id) => {
    await gigsService.remove(id);
    load();
  };

  return (
    <div className="dashboard-page">
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h2 className="page-title">Create Gig</h2>
        <form onSubmit={create} className="auth-form">
          <input placeholder="Title" className="form-input" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <textarea placeholder="Description" className="form-input" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} />
          <input type="number" placeholder="Price" className="form-input" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} />
          <input placeholder="Category" className="form-input" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} />
          <button className="btn btn-primary" type="submit">Create</button>
        </form>
      </div>
      <div className="card">
        <h2 className="page-title">My Gigs</h2>
        {gigs.map(g => (
          <div key={g._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
            <div>
              <strong>{g.title}</strong> - ${g.price} - {g.category}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={() => update(g._id, { isActive: !g.isActive })}>{g.isActive ? 'Deactivate' : 'Activate'}</button>
              <button className="btn btn-danger" onClick={() => remove(g._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FreelancerGigsManager;
