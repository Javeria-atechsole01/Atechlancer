import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { assignmentService } from '../../../services/assignmentService';
import {
    Loader2, BookOpen, Clock, DollarSign, FileText,
    CheckCircle, ArrowRight, ArrowLeft, Upload, AlertCircle
} from 'lucide-react';
import './post-assignment.css';

const PostAssignment = () => {
    const navigate = useNavigate();
    const { user, loading: authLoading } = useAuth();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/login', { state: { from: '/dashboard/student/post-assignment' } });
        }
    }, [user, authLoading, navigate]);

    if (authLoading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '10rem' }}><Loader2 className="animate-spin" size={48} /></div>;
    if (!user) return null;

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        subject: 'Computer Science',
        academicLevel: 'Undergraduate',
        deadline: '',
        budget: { min: '', max: '' },
        description: '',
        files: [], // Simplified for now
        preferences: {
            freelancerLevel: 'mid',
            language: 'English',
            plagiarismFree: true
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('budget.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                budget: { ...prev.budget, [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handlePreferenceChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            preferences: { ...prev.preferences, [name]: value }
        }));
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = {
                ...formData,
                budget: {
                    min: Number(formData.budget.min),
                    max: Number(formData.budget.max)
                }
            };
            const result = await assignmentService.create(payload);
            navigate(`/assignments/${result._id}`);
        } catch (error) {
            console.error(error);
            alert("Failed to publish assignment. Please check all fields.");
        } finally {
            setLoading(false);
        }
    };

    /** Step 1: Basics */
    const Step1 = () => (
        <div className="section-content">
            <div className="form-group">
                <label>Assignment Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g. Advanced Algorithms - Sorting and Searching Project"
                />
            </div>

            <div className="form-input-row">
                <div className="form-group">
                    <label>Subject / Category</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} className="form-input">
                        <option>Computer Science</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Business & Finance</option>
                        <option>Engineering</option>
                        <option>Humanities</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Academic Level</label>
                    <select name="academicLevel" value={formData.academicLevel} onChange={handleChange} className="form-input">
                        <option>High School</option>
                        <option>Undergraduate</option>
                        <option>Graduate</option>
                        <option>Doctorate</option>
                        <option>Professional</option>
                    </select>
                </div>
            </div>

            <div className="form-input-row">
                <div className="form-group">
                    <label>Deadline</label>
                    <div style={{ position: 'relative' }}>
                        <Clock size={16} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--gray-400)' }} />
                        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="form-input" style={{ paddingLeft: '40px' }} />
                    </div>
                </div>
                <div className="form-group">
                    <label>Budget Range ($)</label>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <input type="number" name="budget.min" value={formData.budget.min} onChange={handleChange} placeholder="Min" className="form-input" />
                        <input type="number" name="budget.max" value={formData.budget.max} onChange={handleChange} placeholder="Max" className="form-input" />
                    </div>
                </div>
            </div>
        </div>
    );

    /** Step 2: Details & Files */
    const Step2 = () => (
        <div className="section-content">
            <div className="form-group">
                <label>Detailed Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="form-input"
                    style={{ minHeight: '200px' }}
                    placeholder="Describe your assignment requirements in detail..."
                />
            </div>

            <div className="upload-box" style={{ border: '2px dashed var(--gray-200)', borderRadius: '1rem', padding: '3rem', textAlign: 'center', backgroundColor: 'var(--gray-50)' }}>
                <Upload style={{ margin: '0 auto 1rem', color: 'var(--gray-400)' }} size={40} />
                <p style={{ fontWeight: '700', marginBottom: '4px' }}>Upload Assignment Files</p>
                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>PDF, DOCX, ZIP, or Images (Max 20MB)</p>
                <input type="file" style={{ display: 'none' }} multiple />
            </div>

            <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--primary-50)', borderRadius: '0.75rem', border: '1px solid var(--primary-100)', display: 'flex', gap: '1rem' }}>
                <AlertCircle className="text-primary-600" size={20} />
                <p style={{ fontSize: '0.875rem', color: 'var(--primary-800)' }}>
                    <strong>Clarity Tip:</strong> Clear instructions lead to better solutions.
                </p>
            </div>
        </div>
    );

    /** Step 3: Preferences */
    const Step3 = () => (
        <div className="section-content">
            <div className="form-group">
                <label>Preferred Expert Level</label>
                <div className="expert-level-grid">
                    {['entry', 'mid', 'expert'].map(level => (
                        <label key={level} className={`level-card ${formData.preferences.freelancerLevel === level ? 'active' : ''}`}>
                            <input type="radio" name="prefLevel" checked={formData.preferences.freelancerLevel === level} onChange={() => handlePreferenceChange('freelancerLevel', level)} style={{ display: 'none' }} />
                            <div className="level-name">{level}</div>
                            <div className="level-desc">
                                {level === 'entry' && 'Standard guidance'}
                                {level === 'mid' && 'Professional analysis'}
                                {level === 'expert' && 'Specialized dissertation level'}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Language Requirements</label>
                <select name="prefLang" value={formData.preferences.language} onChange={(e) => handlePreferenceChange('language', e.target.value)} className="form-input" style={{ maxWidth: '400px' }}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                </select>
            </div>

            <div className="guarantee-box">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={formData.preferences.plagiarismFree}
                        onChange={(e) => handlePreferenceChange('plagiarismFree', e.target.checked)}
                        className="custom-checkbox"
                    />
                    <div className="checkbox-text">
                        <div className="text-bold">Strict Plagiarism-Free Guarantee</div>
                        <div className="text-muted">By checking this, you mandate a unique solution with supporting similarity reports.</div>
                    </div>
                </label>
            </div>
        </div>
    );

    /** Step 4: Review */
    const Step4 = () => (
        <div className="review-section">
            <div className="review-box">
                <div className="review-header">
                    <div>
                        <h2 className="review-title">{formData.title || 'Assignment Title'}</h2>
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <span className="badge">{formData.subject}</span>
                            <span className="badge">{formData.academicLevel}</span>
                        </div>
                    </div>
                    <div className="review-budget">
                        <div className="budget-val">${formData.budget.min || 0} - ${formData.budget.max || 0}</div>
                        <div className="budget-lbl">Budget Range</div>
                    </div>
                </div>

                <div className="review-details" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '1.5rem 0', borderBottom: '1px solid var(--gray-200)' }}>
                    <div>
                        <div style={{ color: 'var(--gray-400)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Deadline</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                            <Clock size={16} /> {formData.deadline || 'Not set'}
                        </div>
                    </div>
                    <div>
                        <div style={{ color: 'var(--gray-400)', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>Level</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
                            <CheckCircle size={16} style={{ color: 'var(--accent-500)' }} /> {formData.preferences.freelancerLevel}
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                    <p style={{ fontWeight: '700', marginBottom: '8px' }}>Description:</p>
                    <p style={{ whiteSpace: 'pre-line', color: 'var(--gray-600)' }}>{formData.description || 'No description provided.'}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="post-assignment-page">
            <div className="post-assignment-header">
                <h1>Post an Assignment</h1>
                <p>Fill in the details to receive bids from top experts.</p>
            </div>

            {/* Stepper */}
            <div className="assignment-stepper">
                <div className="stepper-track"></div>
                <div
                    className="stepper-progress"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                ></div>

                {[1, 2, 3, 4].map((s) => (
                    <div
                        key={s}
                        className={`step-node ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`}
                    >
                        {step > s ? <CheckCircle size={24} /> : s}
                    </div>
                ))}
            </div>

            {/* Form Container */}
            <div className="form-card">
                <div style={{ minHeight: '350px' }}>
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                </div>

                <div className="form-actions">
                    <button
                        onClick={handleBack}
                        className="btn-back"
                        style={{ visibility: step === 1 ? 'hidden' : 'visible' }}
                    >
                        <ArrowLeft size={20} /> Back
                    </button>

                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                className="btn btn-primary"
                                style={{ padding: '0.75rem 2.5rem' }}
                            >
                                Next Step <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="btn btn-primary"
                                style={{ padding: '0.75rem 3rem' }}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Publish Assignment'}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostAssignment;
