import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { gigsService } from '../services/gigsService';
import { ordersService } from '../services/ordersService';

const GigDetails = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);

  useEffect(() => {
    gigsService.get(id).then(setGig);
  }, [id]);

  const order = async () => {
    await ordersService.create(id);
    alert('Order created');
  };

  if (!gig) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <div className="card">
        <h1 className="page-title">{gig.title}</h1>
        <p className="page-description">{gig.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>{gig.category}</span>
          <strong>${gig.price}</strong>
        </div>
        <button className="btn btn-primary" onClick={order}>Order</button>
      </div>
    </div>
  );
};

export default GigDetails;
