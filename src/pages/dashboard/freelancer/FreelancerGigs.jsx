import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, DollarSign, CheckCircle, Plus, X, Eye, Edit2, Trash2 } from 'lucide-react';
import { gigsService } from '../../../services/gigsService';
import './gig-form.css';

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
            ...gigData,
            price: Number(gigData.price),
            deliveryTime: Number(gigData.deliveryTime),
            revisions: Number(gigData.revisions)
        };
        if (!payload.category) payload.category = 'general';
        if (editingGig) {
            const id = editingGig._id || editingGig.id;
            try {
                await gigsService.update(id, payload);
            } catch { }
        } else {
            try {
                await gigsService.create(payload);
            } catch { }
        }
        await load();
        setIsModalOpen(false);
        setEditingGig(null);
    };

    const handleDelete = async (gig) => {
        const id = gig._id || gig.id;
        try {
            await gigsService.remove(id);
        } catch { }
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
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        price: initialData?.price || '',
        category: initialData?.category || '',
        deliveryTime: initialData?.deliveryTime || 3,
        revisions: initialData?.revisions || 0,
        tags: initialData?.tags?.join(', ') || '',
        features: initialData?.features?.join('\n') || '',
        faqs: initialData?.faqs || []
    });

    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddFaq = () => {
        if (newFaq.question && newFaq.answer) {
            setFormData(prev => ({ ...prev, faqs: [...prev.faqs, newFaq] }));
            setNewFaq({ question: '', answer: '' });
        }
    };

    const handleRemoveFaq = (index) => {
        setFormData(prev => ({ ...prev, faqs: prev.faqs.filter((_, i) => i !== index) }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: Number(formData.price),
            deliveryTime: Number(formData.deliveryTime),
            revisions: Number(formData.revisions),
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            features: formData.features.split('\n').filter(Boolean)
        });
    };

    return (
        <div className="gig-modal-overlay" onClick={onClose}>
            <div className="gig-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="gig-modal-header">
                    <h3>
                        <Briefcase size={24} />
                        {initialData ? 'Edit Gig' : 'Create New Gig'}
                    </h3>
                    <button className="gig-modal-close-btn" onClick={onClose}>
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="gig-modal-body">
                        {/* Basic Information Section */}
                        <div className="gig-form-section">
                            <h4 className="gig-form-section-title">
                                📝 Basic Information
                            </h4>
                            <div className="gig-form-grid">
                                <div>
                                    <label className="gig-form-label required">Gig Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        className="gig-form-input"
                                        placeholder="e.g., I will build a React website"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <span className="gig-input-helper">Make it clear and descriptive</span>
                                </div>

                                <div className="gig-form-grid-2">
                                    <div>
                                        <label className="gig-form-label required">Category</label>
                                        <input
                                            type="text"
                                            name="category"
                                            className="gig-form-input"
                                            placeholder="e.g., Web Development"
                                            value={formData.category}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="gig-tags-input">
                                        <label className="gig-form-label">Tags</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            className="gig-form-input"
                                            placeholder="react, node, ui"
                                            value={formData.tags}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pricing & Delivery Section */}
                        <div className="gig-form-section">
                            <h4 className="gig-form-section-title">
                                💰 Pricing & Delivery
                            </h4>
                            <div className="gig-pricing-section">
                                <div className="gig-form-grid-3">
                                    <div>
                                        <label className="gig-form-label required">
                                            <DollarSign size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                                            Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            className="gig-form-input"
                                            min="5"
                                            placeholder="50"
                                            value={formData.price}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="gig-form-label required">
                                            <Clock size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                                            Delivery (Days)
                                        </label>
                                        <input
                                            type="number"
                                            name="deliveryTime"
                                            className="gig-form-input"
                                            min="1"
                                            placeholder="3"
                                            value={formData.deliveryTime}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="gig-form-label">
                                            <CheckCircle size={16} style={{ display: 'inline', marginRight: '0.25rem', verticalAlign: 'middle' }} />
                                            Revisions
                                        </label>
                                        <input
                                            type="number"
                                            name="revisions"
                                            className="gig-form-input"
                                            min="0"
                                            placeholder="2"
                                            value={formData.revisions}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description Section */}
                        <div className="gig-form-section">
                            <h4 className="gig-form-section-title">
                                📄 Description
                            </h4>
                            <div>
                                <label className="gig-form-label required">Gig Description</label>
                                <textarea
                                    name="description"
                                    className="gig-form-textarea"
                                    rows="5"
                                    placeholder="Describe what you'll deliver, your process, and what makes your service unique..."
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                                <span className="gig-char-counter">{formData.description.length} characters</span>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div className="gig-form-section">
                            <h4 className="gig-form-section-title">
                                ✨ Included Features
                            </h4>
                            <div>
                                <label className="gig-form-label">Features (one per line)</label>
                                <textarea
                                    name="features"
                                    className="gig-form-textarea gig-features-textarea"
                                    rows="4"
                                    placeholder="Source Code&#10;Commercial Use&#10;Responsive Design&#10;SEO Optimization"
                                    value={formData.features}
                                    onChange={handleChange}
                                ></textarea>
                                <span className="gig-input-helper">List what's included in your gig</span>
                            </div>
                        </div>

                        {/* FAQs Section */}
                        <div className="gig-form-section">
                            <h4 className="gig-form-section-title">
                                ❓ Frequently Asked Questions
                            </h4>
                            {formData.faqs.length > 0 && (
                                <div className="gig-faq-list">
                                    {formData.faqs.map((faq, index) => (
                                        <div key={index} className="gig-faq-item">
                                            <div className="gig-faq-content">
                                                <p className="gig-faq-question">Q: {faq.question}</p>
                                                <p className="gig-faq-answer">A: {faq.answer}</p>
                                            </div>
                                            <button
                                                type="button"
                                                className="gig-faq-remove-btn"
                                                onClick={() => handleRemoveFaq(index)}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="gig-faq-add-row">
                                <div style={{ flex: 1 }}>
                                    <label className="gig-form-label">Question</label>
                                    <input
                                        type="text"
                                        className="gig-form-input"
                                        placeholder="What do you need from me?"
                                        value={newFaq.question}
                                        onChange={e => setNewFaq({ ...newFaq, question: e.target.value })}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label className="gig-form-label">Answer</label>
                                    <input
                                        type="text"
                                        className="gig-form-input"
                                        placeholder="Your requirements and preferences"
                                        value={newFaq.answer}
                                        onChange={e => setNewFaq({ ...newFaq, answer: e.target.value })}
                                    />
                                </div>
                                <button type="button" className="gig-faq-add-btn" onClick={handleAddFaq}>
                                    <Plus size={18} />
                                    Add FAQ
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="gig-modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-primary">
                            {initialData ? 'Update Gig' : 'Create Gig'}
                        </button>
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
            } catch { }
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
