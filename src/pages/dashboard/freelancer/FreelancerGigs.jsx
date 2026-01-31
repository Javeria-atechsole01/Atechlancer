import React, { useState } from 'react';
import { Briefcase, Clock, DollarSign, CheckCircle, Plus, X } from 'lucide-react';

const FreelancerGigs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [gigs, setGigs] = useState([
        {
            id: 1,
            title: 'Modern React Web Development',
            price: 250,
            deliveryTime: '3 Days',
            isActive: true
        },
        {
            id: 2,
            title: 'Python AI Scripting',
            price: 100,
            deliveryTime: '2 Days',
            isActive: true
        }
    ]);

    const handleAddGig = (newGig) => {
        setGigs([...gigs, { ...newGig, id: Date.now(), isActive: true }]);
        setIsModalOpen(false);
    };

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">My Gigs</h1>
                    <p className="page-description">Manage your service offerings.</p>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    onClick={() => setIsModalOpen(true)}
                >
                    + Create New Gig
                </button>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {gigs.map(gig => (
                    <div key={gig.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <div style={{ height: '160px', backgroundColor: 'var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray-500)' }}>
                            Gig Cover Image
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: 'var(--brand-navy)', marginBottom: '0.5rem' }}>{gig.title}</h3>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <span style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Starting at</span>
                                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>${gig.price}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid var(--gray-100)', paddingTop: '1rem' }}>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <Clock size={14} /> {gig.deliveryTime} Delivery
                                </div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <CheckCircle size={14} color="var(--accent-500)" /> {gig.isActive ? 'Active' : 'Draft'}
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Edit</button>
                                <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem' }}>Preview</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Gig Modal */}
            {isModalOpen && (
                <AddGigModal
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddGig}
                />
            )}
        </div>
    );
};

const AddGigModal = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('3 Days');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price) return;
        onAdd({ title, price, deliveryTime });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="card-title">Create New Gig</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-col gap-md">
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Gig Title</label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="e.g. I will build a React website"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Starting Price ($)</label>
                        <input
                            type="number"
                            className="search-input"
                            placeholder="e.g. 100"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Delivery Time</label>
                        <select
                            className="search-input"
                            value={deliveryTime}
                            onChange={e => setDeliveryTime(e.target.value)}
                            style={{ width: '100%' }}
                        >
                            <option>1 Day</option>
                            <option>2 Days</option>
                            <option>3 Days</option>
                            <option>5 Days</option>
                            <option>1 Week</option>
                            <option>2 Weeks</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Create Gig</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FreelancerGigs;
