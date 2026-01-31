import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, DollarSign, CheckCircle, Plus, X, Eye, Edit2, Trash2 } from 'lucide-react';
import { gigsService } from '../../../services/gigsService';

const FreelancerGigs = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGig, setEditingGig] = useState(null);
    const [previewGig, setPreviewGig] = useState(null);

    const [gigs, setGigs] = useState([]);

    const load = async () => {
        try {
            const items = await gigsService.mine();
            setGigs(items.map(i => ({
                ...i,
                id: i._id,
                deliveryTime: i.deliveryTime || '3 Days'
            })));
        } catch {
            setGigs([]);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const handleCreateNew = () => {
        setEditingGig(null);
        setIsModalOpen(true);
    };

    const handleEdit = (gig) => {
        setEditingGig(gig);
        setIsModalOpen(true);
    };

    const handleSaveGig = async (gigData) => {
        const payload = {
            title: gigData.title,
            description: gigData.description,
            price: Number(gigData.price),
            category: gigData.category || 'general'
        };
        if (editingGig) {
            const id = editingGig._id || editingGig.id;
            try {
                await gigsService.update(id, payload);
            } catch {}
        } else {
            try {
                await gigsService.create(payload);
            } catch {}
        }
        await load();
        setIsModalOpen(false);
        setEditingGig(null);
    };

    const handleDelete = async (gig) => {
        const id = gig._id || gig.id;
        try {
            await gigsService.remove(id);
        } catch {}
        setGigs(prev => prev.filter(g => (g._id || g.id) !== id));
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
                    onClick={handleCreateNew}
                >
                    + Create New Gig
                </button>
            </div>

            <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                {gigs.map(gig => (
                    <div key={gig.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                        <CoverUpload gig={gig} onUploaded={({ cover, updated }) => {
                            setGigs(prev => prev.map(g => (
                                g.id === gig.id
                                  ? {
                                      ...g,
                                      ...(updated ? { ...updated, id: updated._id, deliveryTime: updated.deliveryTime || g.deliveryTime } : {}),
                                      images: [cover]
                                    }
                                  : g
                            )));
                        }} />
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
                                <button
                                    className="btn btn-secondary"
                                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                    onClick={() => handleEdit(gig)}
                                >
                                    <Edit2 size={14} /> Edit
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                    onClick={() => setPreviewGig(gig)}
                                >
                                    <Eye size={14} /> Preview
                                </button>
                                <button
                                    className="btn btn-danger"
                                    style={{ flex: 1, padding: '0.5rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                                    onClick={() => handleDelete(gig)}
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Create/Edit Modal */}
            {isModalOpen && (
                <GigModal
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveGig}
                    initialData={editingGig}
                />
            )}

            {/* Preview Modal */}
            {previewGig && (
                <GigPreviewModal
                    gig={previewGig}
                    onClose={() => setPreviewGig(null)}
                />
            )}
        </div>
    );
};

const GigModal = ({ onClose, onSave, initialData }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [price, setPrice] = useState(initialData?.price || '');
    const [deliveryTime, setDeliveryTime] = useState(initialData?.deliveryTime || '3 Days');
    const [description, setDescription] = useState(initialData?.description || '');
    const [category, setCategory] = useState(initialData?.category || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !price) return;
        onSave({ title, price, deliveryTime, description, category });
    };

    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 className="card-title">{initialData ? 'Edit Gig' : 'Create New Gig'}</h3>
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
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <div style={{ flex: 1 }}>
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
                        <div style={{ flex: 1 }}>
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
                    </div>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                        <textarea
                            className="search-input"
                            rows="4"
                            placeholder="Describe your service in detail..."
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Category</label>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="e.g. web, ai, writing"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                            required
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn btn-primary">{initialData ? 'Update Gig' : 'Create Gig'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const GigPreviewModal = ({ gig, onClose }) => {
    return (
        <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div className="card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '0' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 className="card-title">Gig Preview</h3>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column' }}>
                        <div style={{ height: '300px', backgroundColor: 'var(--gray-100)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--gray-400)' }}>
                            COVER IMAGE
                        </div>

                        <div>
                            <h1 style={{ fontSize: '2rem', color: 'var(--brand-navy)', fontWeight: 'bold', marginBottom: '1rem' }}>{gig.title}</h1>

                            <div className="flex-row-gap gap-xl mb-xl text-muted">
                                <span className="flex-row-gap gap-sm"><Clock size={18} /> {gig.deliveryTime} Delivery</span>
                                <span className="flex-row-gap gap-sm"><CheckCircle size={18} /> {gig.isActive ? 'Active Service' : 'Draft'}</span>
                            </div>

                            <div className="card bg-gray-50 p-lg mb-xl">
                                <h3 className="card-title mb-md">About This Gig</h3>
                                <p style={{ lineHeight: '1.6', color: 'var(--gray-700)' }}>
                                    {gig.description || "No description provided."}
                                </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <div style={{ textAlign: 'right' }}>
                                    <div className="text-muted mb-sm">Starting Price</div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary-600)' }}>${gig.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--gray-200)', backgroundColor: 'var(--gray-50)', textAlign: 'right' }}>
                    <button className="btn btn-primary" onClick={onClose}>Close Preview</button>
                </div>
            </div>
        </div>
    );
};

export default FreelancerGigs;

const CoverUpload = ({ gig, onUploaded }) => {
    const [hover, setHover] = useState(false);
    const [uploading, setUploading] = useState(false);
    const inputRef = React.useRef(null);

    const handleChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await gigsService.uploadCover(gig._id || gig.id, file);
            let updatedGig = null;
            try {
                updatedGig = await gigsService.get(gig._id || gig.id);
            } catch {}
            onUploaded({ cover: res.cover, updated: updatedGig });
        } finally {
            setUploading(false);
        }
    };

    return (
        <label
            style={{
                height: '160px',
                backgroundColor: 'var(--gray-200)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--gray-500)',
                cursor: 'pointer',
                position: 'relative'
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => inputRef.current && inputRef.current.click()}
        >
            {uploading ? 'Uploading...' : (gig.images?.[0] ? '' : 'Gig Cover Image')}
            {gig.images?.[0] && (
                <img
                    src={gig.images[0]}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            )}
            {hover && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0,0,0,0.35)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 600
                    }}
                >
                    Tap to upload
                </div>
            )}
            <input ref={inputRef} type="file" accept="image/*" onChange={handleChange} style={{ display: 'none' }} />
        </label>
    );
};
