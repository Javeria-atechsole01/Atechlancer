import React, { useEffect, useState } from 'react';
import { gigsService } from '../services/gigsService';

const Gigs = () => {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('latest');

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const data = await gigsService.list({ q, category, sort });
    setItems(data.items || []);
  };

  return (
    <div className="page-container">
      <div className="card" style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="search-input" />
          <input value={category} onChange={e => setCategory(e.target.value)} placeholder="Category" className="search-input" />
          <select value={sort} onChange={e => setSort(e.target.value)} className="search-input">
            <option value="latest">Latest</option>
            <option value="price_asc">Price Asc</option>
            <option value="price_desc">Price Desc</option>
          </select>
          <button className="btn btn-primary" onClick={load}>Search</button>
        </div>
      </div>
      <div className="card-grid">
        {items.map(g => (
          <div key={g._id} className="card">
            <h3 className="page-title">{g.title}</h3>
            <p className="page-description">{g.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>{g.category}</span>
              <strong>${g.price}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gigs;
