import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jobService } from '../../../services/jobService';
import { Loader2 } from 'lucide-react';

const EmployerEditJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web Development',
        budget: '',
        description: '',
        skills: '',
        status: 'open'
    });

    useEffect(() => {
        loadJob();
    }, [id]);

    const loadJob = async () => {
        try {
            const job = await jobService.getById(id);
            setFormData({
                title: job.title,
                category: job.category,
                budget: job.budget,
                description: job.description,
                skills: job.skills.join(', '),
                status: job.status
            });
        } catch (err) {
            console.error("Failed to load job", err);
            alert("Failed to load job details");
            navigate('/dashboard/employer');
        } finally {
            setFetching(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()).filter(s => s)
            };
            
            await jobService.update(id, payload);
            navigate(`/jobs/${id}`);
        } catch (err) {
            alert('Failed to update job');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (fetching) return <div className="flex justify-center p-20"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="dashboard-page">
            <div className="dashboard-page-header">
                <div>
                    <h1 className="page-title">Edit Job</h1>
                    <p className="page-description">Update job details.</p>
                </div>
            </div>

            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Job Title</label>
                        <input 
                            type="text" 
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="search-input w-full" 
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category</label>
                            <select 
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="search-input w-full"
                            >
                                <option value="Web Development">Web Development</option>
                                <option value="Mobile Development">Mobile Development</option>
                                <option value="Design">Design</option>
                                <option value="Writing">Writing</option>
                                <option value="Marketing">Marketing</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Budget ($)</label>
                            <input 
                                type="number" 
                                name="budget"
                                value={formData.budget}
                                onChange={handleChange}
                                required
                                className="search-input w-full" 
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
                         <div>
                            <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Status</label>
                            <select 
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="search-input w-full"
                            >
                                <option value="open">Open</option>
                                <option value="closed">Closed</option>
                                <option value="in-progress">In Progress</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Skills (comma separated)</label>
                        <input 
                            type="text" 
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            className="search-input w-full" 
                        />
                    </div>

                    <div>
                        <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Description</label>
                        <textarea 
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="search-input w-full" 
                            rows="5" 
                        ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Update Job'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployerEditJob;
