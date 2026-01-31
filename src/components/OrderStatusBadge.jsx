import React from 'react';

const colors = {
  pending: 'var(--gray-500)',
  in_progress: 'var(--primary-600)',
  delivered: 'var(--accent-600)',
  completed: 'var(--green-600)',
  revision_requested: 'var(--orange-600)',
  cancelled: 'var(--red-600)'
};

const OrderStatusBadge = ({ status }) => {
  return (
    <span style={{ color: colors[status] || 'var(--gray-600)', fontWeight: 600 }}>
      {status.replace('_', ' ')}
    </span>
  );
};

export default OrderStatusBadge;
