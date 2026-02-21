import React from 'react';

const colors = {
  pending: { bg: 'var(--gray-100)', text: 'var(--gray-700)' },
  in_progress: { bg: 'var(--primary-50)', text: 'var(--primary-700)' },
  delivered: { bg: 'var(--accent-bg)', text: 'var(--accent-text)' },
  completed: { bg: '#DCFCE7', text: '#166534' },
  revision: { bg: '#FEF3C7', text: '#92400E' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B' }
};

const OrderStatusBadge = ({ status = 'pending' }) => {
  const s = colors[status] || colors.pending;
  return (
    <span className="tag" style={{ backgroundColor: s.bg, color: s.text }}>
      {status.replace('_', ' ')}
    </span>
  );
};

export default OrderStatusBadge;
