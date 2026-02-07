import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../../services/jobService';
import { Loader2, Briefcase, DollarSign, MapPin, Calendar, CheckCircle, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import './employer-post-job.css';

const EmployerPostJob = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web Development',
        skills: '',
        type: 'freelance',
        experienceLevel: 'mid',
        description: '',
        responsibilities: '',
        requirements: '',
        budget: '',
        budgetType: 'fixed',
        duration: '1-3 months',
        preferredRole: 'any',
        locationType: 'remote',
        deadline: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                ...formData,
                skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
                budget: Number(formData.budget)
            };
            const job = await jobService.create(payload);
            navigate(`/jobs/${job._id}`);
        } catch (error) {
            console.error(error);
            alert("Failed to post job");
        } finally {
            setLoading(false);
        }
    };

    /** Step 1: Job Basics */
    const Step1 = () => (
        <div className="step-content">
            <div className="form-group">
                <label className="form-label">Job Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="e.g. Senior React Developer needed for Fintech Project"
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="search-input w-full">
                        <option>Web Development</option>
                        <option>Mobile Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                        <option>Marketing</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Job Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="search-input w-full">
                        <option value="freelance">Freelance</option>
                        <option value="contract">Contract</option>
                        <option value="part-time">Part-Time</option>
                        <option value="full-time">Full-Time</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Required Skills (comma separated)</label>
                <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="e.g. React, Node.js, AWS, TypeScript"
                />
            </div>

            <div className="form-group">
                <label className="form-label">Experience Level</label>
                <div className="options-grid">
                    {['entry', 'mid', 'senior', 'expert'].map(level => (
                        <label key={level} className={`option-box ${formData.experienceLevel === level ? 'active' : ''}`}>
                            <input type="radio" name="experienceLevel" value={level} checked={formData.experienceLevel === level} onChange={handleChange} style={{ display: 'none' }} />
                            <span className="option-name">{level}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    /** Step 2: Job Details */
    const Step2 = () => (
        <div className="step-content">
            <div className="form-group">
                <label className="form-label">Job Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="search-input w-full"
                    style={{ minHeight: '150px' }}
                    placeholder="Describe the project, goals, and what you are looking for..."
                />
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label className="form-label">Responsibilities</label>
                    <textarea
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleChange}
                        className="search-input w-full"
                        style={{ minHeight: '100px' }}
                        placeholder="- Build reusable components&#10;- Optimize performance..."
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Requirements</label>
                    <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        className="search-input w-full"
                        style={{ minHeight: '100px' }}
                        placeholder="- 3+ years of experience&#10;- Strong communication skills..."
                    />
                </div>
            </div>

            <div className="budget-summary-box form-row-tri">
                <div className="form-group">
                    <label className="form-label">Budget ($)</label>
                    <div style={{ position: 'relative' }}>
                        <DollarSign size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--gray-400)' }} />
                        <input type="number" name="budget" value={formData.budget} onChange={handleChange} className="search-input w-full" style={{ paddingLeft: '32px' }} placeholder="1000" />
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Budget Type</label>
                    <select name="budgetType" value={formData.budgetType} onChange={handleChange} className="search-input w-full">
                        <option value="fixed">Fixed Price</option>
                        <option value="hourly">Hourly Rate</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">Duration</label>
                    <input name="duration" value={formData.duration} onChange={handleChange} className="search-input w-full" placeholder="e.g. 3 months" />
                </div>
            </div>
        </div>
    );

    /** Step 3: Preferences */
    const Step3 = () => (
        <div className="step-content">
            <div className="form-group">
                <label className="form-label" style={{ marginBottom: '1rem' }}>Preferred Role</label>
                <div className="options-grid">
                    {['freelancer', 'student', 'teacher', 'any'].map(role => (
                        <label key={role} className={`option-box ${formData.preferredRole === role ? 'active' : ''}`}>
                            <input type="radio" name="preferredRole" value={role} checked={formData.preferredRole === role} onChange={handleChange} style={{ display: 'none' }} />
                            <span className="option-name">{role}</span>
                            <span className="option-desc">Target niche talent</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label" style={{ marginBottom: '1rem' }}>Location Preference</label>
                <div className="form-row-tri">
                    {['remote', 'onsite', 'hybrid'].map(loc => (
                        <label key={loc} className={`option-box ${formData.locationType === loc ? 'active' : ''}`}>
                            <input type="radio" name="locationType" value={loc} checked={formData.locationType === loc} onChange={handleChange} style={{ display: 'none' }} />
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <MapPin size={16} /> <span className="option-name">{loc}</span>
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Application Deadline</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="search-input" style={{ width: '250px' }} />
            </div>
        </div>
    );

    /** Step 4: Review */
    const Step4 = () => (
        <div className="step-content">
            <div className="review-alert">
                <CheckCircle className="icon" size={24} />
                <div>
                    <h4>Almost Done!</h4>
                    <p>Review your job post details below. Once published, it will be visible to potential candidates.</p>
                </div>
            </div>

            <div className="job-preview-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-900)' }}>{formData.title || 'Untitled Job'}</h2>
                        <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                            <span className="badge">{formData.category}</span>
                            <span>•</span>
                            <span style={{ textTransform: 'capitalize' }}>{formData.type}</span>
                            <span>•</span>
                            <span style={{ textTransform: 'capitalize' }}>{formData.locationType}</span>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-600)' }}>${formData.budget}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', textTransform: 'uppercase' }}>{formData.budgetType}</div>
                    </div>
                </div>

                <p className="prose-text" style={{ marginBottom: '2rem' }}>{formData.description || 'No description provided.'}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-100)' }}>
                    <div>
                        <h4 className="form-label">Required Skills</h4>
                        <div className="tag-cloud" style={{ marginTop: '0.5rem' }}>
                            {formData.skills ? formData.skills.split(',').map((s, i) => (
                                <span key={i} className="badge">{s.trim()}</span>
                            )) : <span className="text-muted italic">None specified</span>}
                        </div>
                    </div>
                    <div>
                        <h4 className="form-label">Preferences</h4>
                        <ul className="text-sm" style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '0.25rem' }}><strong>Level:</strong> <span style={{ textTransform: 'capitalize' }}>{formData.experienceLevel}</span></li>
                            <li style={{ marginBottom: '0.25rem' }}><strong>Role:</strong> <span style={{ textTransform: 'capitalize' }}>{formData.preferredRole}</span></li>
                            <li><strong>Duration:</strong> {formData.duration}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="post-job-container">
            <div className="post-job-header">
                <h1>Post a New Job</h1>
                <p>Follow the steps to attract the best talent.</p>
            </div>

            {/* Stepper */}
            <div className="post-job-stepper">
                {[
                    { n: 1, label: 'Job Basics' },
                    { n: 2, label: 'Details' },
                    { n: 3, label: 'Preferences' },
                    { n: 4, label: 'Review' }
                ].map((s, i) => (
                    <div key={s.n} className={`step-item ${step === s.n ? 'active' : ''} ${step > s.n ? 'completed' : ''}`}>
                        <div className="step-circle">
                            {step > s.n ? <CheckCircle size={20} /> : s.n}
                        </div>
                        <div className="step-label">{s.label}</div>
                        {i < 3 && <div className="step-line"></div>}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="form-card">
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
            </div>

            {/* Navigation Actions */}
            <div className="form-navigation">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className="btn btn-secondary"
                    style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {step < 4 ? (
                    <button
                        onClick={handleNext}
                        className="btn btn-primary"
                        style={{ padding: '0.875rem 2.5rem' }}
                    >
                        Next <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="btn-publish"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'Publish Job'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmployerPostJob;
