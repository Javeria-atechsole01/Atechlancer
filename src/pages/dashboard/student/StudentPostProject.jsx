import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, FileText, Link as LinkIcon, CheckCircle, ArrowRight, ArrowLeft, Eye, UploadCloud, X, Save } from 'lucide-react';
import './student.css';

const StudentPostProject = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web Development',
        summary: '',
        tags: [],
        thumbnail: null,
        thumbnailPreview: '',
        file: null,
        videoUrl: '',
        repoUrl: '',
        liveUrl: '',
        problemStatement: '',
        solutionOverview: '',
        techStack: '',
        learningOutcomes: '',
        visibility: 'public'
    });

    const [tagInput, setTagInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const tag = tagInput.trim();
            if (tag && !formData.tags.includes(tag)) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
            }
            setTagInput('');
        }
    };
    const removeTag = (tagToRemove) => {
        setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tagToRemove) }));
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                thumbnail: file,
                thumbnailPreview: URL.createObjectURL(file)
            }));
        }
    };

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleSubmit = async (isDraft = false) => {
        setLoading(true);
        try {
            console.log(isDraft ? "Saving Draft..." : "Publishing Project...", formData);
            await new Promise(resolve => setTimeout(resolve, 1500));
            alert(isDraft ? "Draft Saved!" : "Project Published Successfully!");
            navigate('/dashboard/student/home');
        } catch (error) {
            console.error(error);
            alert("Failed to process project");
        } finally {
            setLoading(false);
        }
    };

    /** Step 1: Basics */
    const Step1 = () => (
        <div className="flex-col gap-lg animate-fade-in">
            <div className="form-group">
                <label className="label-required">Project Title <span>*</span></label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="search-input w-full text-lg"
                    placeholder="e.g. AI-Powered Personal Finance Tracker"
                    autoFocus
                />
            </div>

            <div className="form-group">
                <label className="label-required">Category <span>*</span></label>
                <select name="category" value={formData.category} onChange={handleChange} className="search-input w-full">
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>AI/Machine Learning</option>
                    <option>UI/UX Design</option>
                    <option>Blockchain</option>
                    <option>Cybersecurity</option>
                    <option>Data Science</option>
                    <option>Game Development</option>
                </select>
            </div>

            <div className="form-group">
                <label className="label-required">Short Summary (Tagline) <span>*</span></label>
                <input
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="A brief 1-line description appearing on project cards..."
                    maxLength={100}
                />
                <p className="text-char-count">{formData.summary.length}/100</p>
            </div>

            <div className="form-group">
                <label className="label-required">Tags / Technologies</label>
                <div className="chips-container">
                    {formData.tags.map(tag => (
                        <span key={tag} className="chip-item">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="btn-icon-sm"><X size={14} /></button>
                        </span>
                    ))}
                    <input
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        className="chip-input"
                        placeholder="Type and press Enter..."
                    />
                </div>
                <p className="text-xs text-muted mt-sm">Add up to 5 tags (e.g. React, Python, Figma)</p>
            </div>
        </div>
    );

    /** Step 2: Media & Links */
    const Step2 = () => (
        <div className="flex-col gap-xl animate-fade-in">
            <div className="form-group">
                <label className="label-required">Project Thumbnail</label>
                <div className={`dropzone-area ${formData.thumbnailPreview ? 'active' : ''}`}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="absolute-fill-hidden-input"
                    />

                    {formData.thumbnailPreview ? (
                        <div className="relative h-200">
                            <img src={formData.thumbnailPreview} alt="Preview" className="preview-thumbnail" />
                            <div className="dropzone-overlay">
                                <span className="text-white font-bold flex-row-gap gap-sm"><UploadCloud size={20} /> Change Image</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-col items-center py-lg">
                            <div className="icon-circle mb-md icon-primary-bg">
                                <Image size={32} />
                            </div>
                            <h4 className="font-bold text-navy-900 text-lg">Upload Thumbnail</h4>
                            <p className="text-sm text-muted mt-xs">Drag & drop or click to browse</p>
                            <p className="text-xs text-muted mt-xs">Recommended: 1600x900px JPG/PNG</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="profile-form-grid">
                <div className="form-group">
                    <label className="label-required flex-row-gap gap-sm">
                        <LinkIcon size={14} /> GitHub Repository
                    </label>
                    <input name="repoUrl" value={formData.repoUrl} onChange={handleChange} className="search-input w-full" placeholder="https://github.com/..." />
                </div>
                <div className="form-group">
                    <label className="label-required flex-row-gap gap-sm">
                        <Eye size={14} /> Live Demo URL
                    </label>
                    <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="search-input w-full" placeholder="https://myproject.com" />
                </div>
            </div>

            <div className="form-group">
                <label className="label-required flex-row-gap gap-sm">
                    Video Demo (YouTube/Vimeo)
                </label>
                <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="search-input w-full" placeholder="https://youtube.com/watch?v=..." />
            </div>

            <div className="form-group">
                <label className="label-required">Project Report (PDF)</label>
                <div className="file-upload-card">
                    <div className="file-icon-box">
                        <FileText size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-navy-900">Upload Case Study / Report</p>
                        <p className="text-xs text-muted">Max 10MB. PDF only.</p>
                    </div>
                    <button className="btn-inline-browse">Browse</button>
                </div>
            </div>
        </div>
    );

    /** Step 3: Deep Dive */
    const Step3 = () => (
        <div className="flex-col gap-lg animate-fade-in">
            <div className="form-group">
                <label className="label-required">Problem Statement</label>
                <textarea
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleChange}
                    className="search-input w-full textarea-min-120"
                    placeholder="Describe the problem you set out to solve. What was the user pain point?"
                />
            </div>

            <div className="form-group">
                <label className="label-required">Solution & Approach</label>
                <textarea
                    name="solutionOverview"
                    value={formData.solutionOverview}
                    onChange={handleChange}
                    className="search-input w-full textarea-min-140"
                    placeholder="How did you solve it? Describe your methodology and architectural decisions."
                />
            </div>

            <div className="form-group">
                <label className="label-required">Tech Stack & Tools Used</label>
                <textarea
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    className="search-input w-full textarea-min-100"
                    placeholder="List languages, frameworks, and tools involved (e.g. React, Node.js, AWS)."
                />
            </div>

            <div className="form-group">
                <label className="label-required">Learning Outcomes</label>
                <textarea
                    name="learningOutcomes"
                    value={formData.learningOutcomes}
                    onChange={handleChange}
                    className="search-input w-full textarea-min-100"
                    placeholder="What did you learn from this project? What challenges did you overcome?"
                />
            </div>
        </div>
    );

    /** Step 4: Review */
    const Step4 = () => (
        <div className="flex-col gap-xl animate-fade-in">
            <h3 className="card-title border-bottom pb-sm">Preview Card</h3>
            <div className="project-preview-card-wrapper">
                <div className="project-preview-card">
                    <div className="project-preview-img-container">
                        {formData.thumbnailPreview ? (
                            <img src={formData.thumbnailPreview} alt="Preview" className="project-preview-img" />
                        ) : (
                            <span className="text-muted flex-col items-center gap-sm"><Image /> No Image</span>
                        )}
                    </div>
                    <div className="project-preview-content">
                        <div className="mb-sm">
                            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{formData.category}</span>
                            <h3 className="font-bold text-lg text-navy-900 mt-xs leading-tight">{formData.title || 'Untitled Project'}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-md line-clamp-2">{formData.summary || 'No summary provided.'}</p>

                        <div className="flex-row-gap gap-sm">
                            {formData.tags.length > 0 ? formData.tags.slice(0, 3).map((s, i) => (
                                <span key={i} className="tag tag-sm text-0-7">{s}</span>
                            )) : <span className="text-xs text-muted">No tags</span>}
                            {formData.tags.length > 3 && <span className="text-xs text-muted">+{formData.tags.length - 3} more</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="project-banner">
                <div className="banner-icon-box">
                    <Eye size={20} />
                </div>
                <div className="banner-content">
                    <h4 className="font-bold text-navy-900">Visibility Settings</h4>
                    <p className="text-sm text-gray-600 mb-md">Control who can see your project.</p>
                    <div className="visibility-options">
                        <label className="visibility-label">
                            <input type="radio" name="visibility" value="public" checked={formData.visibility === 'public'} onChange={handleChange} />
                            <span>Public</span>
                        </label>
                        <label className="visibility-label">
                            <input type="radio" name="visibility" value="private" checked={formData.visibility === 'private'} onChange={handleChange} />
                            <span>Private (Draft)</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-page overflow-y-auto">
            <div className="student-profile-container pt-2rem">
                <div className="project-upload-header">
                    <div>
                        <h1 className="text-3xl font-extrabold text-navy-900">Upload Project</h1>
                        <p className="text-muted mt-xs">Showcase your best work to get noticed by recruiters.</p>
                    </div>
                    <button
                        onClick={() => handleSubmit(true)}
                        className="btn-save-draft"
                    >
                        <Save size={18} /> Save Draft
                    </button>
                </div>

                {/* Progress Stepper */}
                <div className="progress-stepper">
                    {[
                        { n: 1, label: 'Basics' },
                        { n: 2, label: 'Content' },
                        { n: 3, label: 'Details' },
                        { n: 4, label: 'Review' }
                    ].map((s, i) => (
                        <div key={s.n} className={`step-item ${i < 3 ? 'flex-1' : ''}`}>
                            <div className={`step-circle ${step === s.n ? 'active' : ''} ${step > s.n ? 'completed' : ''}`}>
                                {step > s.n ? <CheckCircle size={24} /> : s.n}
                            </div>
                            <div className={`step-label hidden md:block ${step >= s.n ? 'active' : ''}`}>
                                {s.label}
                            </div>
                            {i < 3 && (
                                <div className={`step-line ${step > s.n ? 'completed' : ''}`}></div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <div className="upload-form-container">
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                </div>

                {/* Navigation Actions */}
                <div className="step-nav-buttons">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`btn btn-secondary flex-row-gap gap-sm ${step === 1 ? 'opacity-0 pointer-events-none' : ''}`}
                    >
                        <ArrowLeft size={18} /> Back
                    </button>

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            className="btn btn-primary flex-row-gap gap-sm btn-lg"
                        >
                            Next Step <ArrowRight size={18} />
                        </button>
                    ) : (
                        <button
                            onClick={() => handleSubmit(false)}
                            disabled={loading}
                            className="btn btn-primary flex-row-gap gap-sm btn-lg"
                        >
                            {loading ? 'Publishing...' : 'Publish Project'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentPostProject;
