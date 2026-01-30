import React from 'react';

const EmployerPostJob = () => {
    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Post a New Job</h1>
                    <p className="page-description">Find the perfect talent for your project.</p>
                </div>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Job Title</label>
                        <input type="text" className="search-input" placeholder="e.g. Senior React Developer needed" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
                            <select className="search-input">
                                <option>Web Development</option>
                                <option>Graphic Design</option>
                                <option>Content Writing</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Budget ($)</label>
                            <input type="number" className="search-input" placeholder="500" />
                        </div>
                    </div>

                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                        <textarea className="search-input" rows="5" placeholder="Detailed job description..."></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="btn btn-secondary">Draft</button>
                        <button type="button" className="btn btn-primary">Publish Job</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployerPostJob;
