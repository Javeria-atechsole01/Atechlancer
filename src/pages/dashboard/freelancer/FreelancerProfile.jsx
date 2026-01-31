import React, { useState } from 'react';
import { Camera, MapPin, Link as LinkIcon, Github, FileText, CheckCircle, Star, Plus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FreelancerProfile = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [portfolio, setPortfolio] = useState([
        { id: 1, title: 'E-commerce App 1', tech: 'React, Node.js' },
        { id: 2, title: 'E-commerce App 2', tech: 'React, Node.js' },
        { id: 3, title: 'E-commerce App 3', tech: 'React, Node.js' }
    ]);

    const handleViewPublic = () => {
        navigate('/profile/freelancer/view');
    };

    const handleAddItem = (newItem) => {
        setPortfolio([...portfolio, { ...newItem, id: Date.now() }]);
        setIsModalOpen(false);
    };

    return (
        <div className="dashboard-page" style={{ position: 'relative' }}>
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Freelancer Profile</h1>
                    <p className="page-description">Manage your brand and portfolio.</p>
                </div>
                <button
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                    onClick={handleViewPublic}
                >
                    View Public Profile
                </button>
            </div>

            <div className="layout-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 300px', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Identity */}
                    <div className="card">
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <div style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                backgroundColor: 'var(--primary-100)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                fontWeight: 'bold',
                                color: 'var(--brand-navy)'
                            }}>
                                FD
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>Frontend Developer</h2>
                                    <span className="tag tag-verification"><CheckCircle size={14} style={{ marginRight: '4px' }} /> Top Rated</span>
                                </div>
                                <p style={{ fontSize: '1.125rem', color: 'var(--gray-600)', marginTop: '0.25rem' }}>Expert React & UI/UX Specialist</p>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> Remote</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={14} fill="#eab308" color="#eab308" /> 4.9 (24 Reviews)</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 className="card-title" style={{ margin: 0 }}>Portfolio</h3>
                            <button
                                className="btn btn-secondary"
                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <Plus size={16} /> Add Item
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                            {portfolio.map(item => (
                                <div key={item.id} style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--gray-200)' }}>
                                    <div style={{ height: '140px', backgroundColor: 'var(--gray-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <div style={{ color: 'var(--gray-400)' }}>IMG</div>
                                    </div>
                                    <div style={{ padding: '0.75rem' }}>
                                        <p style={{ fontWeight: '600', fontSize: '0.9375rem', color: 'var(--brand-navy)' }}>{item.title}</p>
                                        <p style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{item.tech}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Hourly Rate</h3>
                        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--brand-navy)' }}>$35 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: 'var(--gray-500)' }}>/ hr</span></div>
                    </div>

                    <div className="card">
                        <h3 className="card-title" style={{ marginBottom: '1rem' }}>Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            <span className="tag">React</span>
                            <span className="tag">TypeScript</span>
                            <span className="tag">Tailwind</span>
                            <span className="tag">Figma</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Item Modal */}
            {isModalOpen && (
                <AddItemModal
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddItem}
                />
            )}
        </div>
    );
};

const AddItemModal = ({ onClose, onAdd }) => {
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !tech) return;
        onAdd({ title, tech, description });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="card-title">Add Portfolio Item</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-col gap-md">
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Project Title</label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="e.g. Finance Dashboard"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Tech Stack</label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="e.g. React, Python"
                            value={tech}
                            onChange={e => setTech(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                        <textarea
                            className="search-input"
                            rows="3"
                            placeholder="Brief details about the project..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">Add Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FreelancerProfile;
