import React from 'react';

const FreelancerOrders = () => {
    // Kanban-like or list view for orders
    const orders = [
        { id: 101, client: "John Doe", gig: "React Dashboard", amount: "$500", status: "Active", deadline: "2 days left" },
        { id: 102, client: "University XYZ", gig: "Python Script", amount: "$150", status: "Pending", deadline: "5 days left" },
    ];

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Manage Orders</h1>
                    <p className="page-description">Track ongoing work and deliveries.</p>
                </div>
            </div>

            <div className="card">
                <h3 className="card-title" style={{ marginBottom: '1rem' }}>Active Orders</h3>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--gray-200)' }}>
                            <th style={{ padding: '1rem' }}>Order ID</th>
                            <th style={{ padding: '1rem' }}>Gig</th>
                            <th style={{ padding: '1rem' }}>Client</th>
                            <th style={{ padding: '1rem' }}>Deadline</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} style={{ borderBottom: '1px solid var(--gray-100)' }}>
                                <td style={{ padding: '1rem', fontWeight: '500' }}>#{order.id}</td>
                                <td style={{ padding: '1rem' }}>{order.gig}</td>
                                <td style={{ padding: '1rem' }}>{order.client}</td>
                                <td style={{ padding: '1rem', color: '#eab308' }}>{order.deadline}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span className="tag" style={{ backgroundColor: 'var(--primary-50)' }}>{order.status}</span>
                                </td>
                                <td style={{ padding: '1rem', fontWeight: 'bold' }}>{order.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FreelancerOrders;
