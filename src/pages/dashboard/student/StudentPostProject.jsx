import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Image, FileText, Link as LinkIcon, CheckCircle, ArrowRight, ArrowLeft, Eye, UploadCloud, X, Save } from 'lucide-react';
// import { projectService } from '../../../services/projectService'; // To be implemented

const StudentPostProject = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: 'Web Development',
        summary: '',
        tags: [], // Array for chips

        // Step 2: Content
        thumbnail: null, // File object
        thumbnailPreview: '',
        file: null, // PDF/Report
        videoUrl: '',
        repoUrl: '',
        liveUrl: '',

        // Step 3: Details
        problemStatement: '',
        solutionOverview: '',
        techStack: '',

        // Step 4
        visibility: 'public'
    });

    // Tag State
    const [tagInput, setTagInput] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Tag Handlers
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

    // File Handlers
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
            // Simulate Upload
            console.log(isDraft ? "Saving Draft..." : "Publishing Project...", formData);

            await new Promise(resolve => setTimeout(resolve, 1500)); // Sim delay

            alert(isDraft ? "Draft Saved!" : "Project Published Successfully!");
            navigate('/dashboard/student/home');
        } catch (error) {
            console.error(error);
            alert("Failed to process project");
        } finally {
            setLoading(false);
        }
    };

    // --- STEPS COMPONENTS ---

    /** Step 1: Basics */
    const Step1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Project Title <span className="text-red-500">*</span></label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="search-input w-full text-lg"
                    placeholder="e.g. AI-Powered Personal Finance Tracker"
                    autoFocus
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
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

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Short Summary (Tagline) <span className="text-red-500">*</span></label>
                <input
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="A brief 1-line description appearing on project cards..."
                    maxLength={100}
                />
                <p className="text-xs text-right text-gray-400 mt-1">{formData.summary.length}/100</p>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tags / Technologies</label>
                <div className="border border-gray-300 rounded-xl p-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-transparent bg-white">
                    {formData.tags.map(tag => (
                        <span key={tag} className="bg-primary-50 text-primary-700 px-2 py-1 rounded-lg text-sm font-medium flex items-center gap-1 border border-primary-100">
                            {tag}
                            <button onClick={() => removeTag(tag)} className="hover:text-primary-900"><X size={14} /></button>
                        </span>
                    ))}
                    <input
                        value={tagInput}
                        onChange={e => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        className="flex-1 outline-none min-w-[120px] p-1"
                        placeholder="Type and press Enter..."
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Add up to 5 tags (e.g. React, Python, Figma)</p>
            </div>
        </div>
    );

    /** Step 2: Media & Links */
    const Step2 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Thumbnail Upload */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Project Thumbnail</label>
                <div className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${formData.thumbnailPreview ? 'border-primary-500 bg-primary-50/10' : 'border-gray-300 hover:bg-gray-50'}`}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {formData.thumbnailPreview ? (
                        <div className="relative h-48 w-full">
                            <img src={formData.thumbnailPreview} alt="Preview" className="h-full w-full object-contain rounded-lg" />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                                <span className="text-white font-bold flex items-center gap-2"><UploadCloud size={20} /> Change Image</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center py-6">
                            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4">
                                <Image size={32} />
                            </div>
                            <h4 className="font-bold text-navy-900 text-lg">Upload Thumbnail</h4>
                            <p className="text-sm text-gray-500 mt-1">Drag & drop or click to browse</p>
                            <p className="text-xs text-gray-400 mt-2">Recommended: 1600x900px JPG/PNG</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                        <LinkIcon size={14} /> GitHub Repository
                    </label>
                    <input name="repoUrl" value={formData.repoUrl} onChange={handleChange} className="search-input w-full" placeholder="https://github.com/..." />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                        <Eye size={14} /> Live Demo URL
                    </label>
                    <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="search-input w-full" placeholder="https://myproject.com" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 flex items-center gap-2">
                    Video Demo (YouTube/Vimeo)
                </label>
                <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="search-input w-full" placeholder="https://youtube.com/watch?v=..." />
            </div>

            {/* Document Upload */}
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Project Report (PDF)</label>
                <div className="flex items-center gap-4 border border-gray-200 p-4 rounded-xl bg-gray-50">
                    <div className="w-10 h-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                        <FileText size={20} />
                    </div>
                    <div className="flex-1">
                        <p className="text-sm font-bold text-navy-900">Upload Case Study / Report</p>
                        <p className="text-xs text-gray-500">Max 10MB. PDF only.</p>
                    </div>
                    <button className="text-primary-600 text-sm font-bold hover:underline">Browse</button>
                    {/* Input hidden for visual demo */}
                </div>
            </div>
        </div>
    );

    /** Step 3: Deep Dive */
    const Step3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Problem Statement</label>
                <textarea
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleChange}
                    className="search-input w-full min-h-[120px]"
                    placeholder="Describe the problem you set out to solve. What was the user pain point?"
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Solution & Approach</label>
                <textarea
                    name="solutionOverview"
                    value={formData.solutionOverview}
                    onChange={handleChange}
                    className="search-input w-full min-h-[140px]"
                    placeholder="How did you solve it? Describe your methodology and architectural decisions."
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tech Stack & Tools Used</label>
                <textarea
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    className="search-input w-full min-h-[100px]"
                    placeholder="List languages, frameworks, and tools involved (e.g. React, Node.js, AWS)."
                />
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Learning Outcomes</label>
                <textarea
                    className="search-input w-full min-h-[100px]"
                    placeholder="What did you learn from this project? What challenges did you overcome?"
                />
            </div>
        </div>
    );

    /** Step 4: Review */
    const Step4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <h3 className="text-lg font-bold text-navy-900 border-b pb-2">Preview Card</h3>
            <div className="flex justify-center py-4">
                <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
                    <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                        {formData.thumbnailPreview ? (
                            <img src={formData.thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-gray-400 flex flex-col items-center gap-2"><Image /> No Image</span>
                        )}
                    </div>
                    <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{formData.category}</span>
                                <h3 className="font-bold text-lg text-navy-900 leading-tight mt-1">{formData.title || 'Untitled Project'}</h3>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{formData.summary || 'No summary provided.'}</p>

                        <div className="flex flex-wrap gap-2">
                            {formData.tags.length > 0 ? formData.tags.slice(0, 3).map((s, i) => (
                                <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">{s}</span>
                            )) : <span className="text-xs text-gray-400">No tags</span>}
                            {formData.tags.length > 3 && <span className="text-xs text-gray-500">+{formData.tags.length - 3} more</span>}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                    <Eye size={20} />
                </div>
                <div>
                    <h4 className="font-bold text-navy-900">Visibility Settings</h4>
                    <p className="text-sm text-gray-600 mb-3">Control who can see your project.</p>
                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.visibility === 'public' ? 'border-primary-600' : 'border-gray-400'}`}>
                                {formData.visibility === 'public' && <div className="w-2 h-2 bg-primary-600 rounded-full"></div>}
                            </div>
                            <input type="radio" name="visibility" value="public" checked={formData.visibility === 'public'} onChange={handleChange} className="hidden" />
                            <span className="font-medium text-gray-800 group-hover:text-primary-700">Public</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.visibility === 'private' ? 'border-primary-600' : 'border-gray-400'}`}>
                                {formData.visibility === 'private' && <div className="w-2 h-2 bg-primary-600 rounded-full"></div>}
                            </div>
                            <input type="radio" name="visibility" value="private" checked={formData.visibility === 'private'} onChange={handleChange} className="hidden" />
                            <span className="font-medium text-gray-800 group-hover:text-primary-700">Private (Draft)</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-page max-w-4xl mx-auto py-8 px-4">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-navy-900">Upload Project</h1>
                    <p className="text-gray-500 mt-1">Showcase your best work to get noticed by recruiters.</p>
                </div>
                <button
                    onClick={() => handleSubmit(true)}
                    className="text-gray-500 hover:text-navy-900 font-medium flex items-center gap-2 transition-colors"
                >
                    <Save size={18} /> Save Draft
                </button>
            </div>

            {/* Progress Stepper */}
            <div className="flex items-center justify-between mb-8">
                {[
                    { n: 1, label: 'Basics' },
                    { n: 2, label: 'Content' },
                    { n: 3, label: 'Details' },
                    { n: 4, label: 'Review' }
                ].map((s, i) => (
                    <div key={s.n} className={`flex items-center ${i < 3 ? 'flex-1' : ''}`}>
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 z-10 bg-white transition-all
                            ${step >= s.n ? 'border-primary-600 text-primary-600 shadow-sm' : 'border-gray-200 text-gray-400'}
                            ${step === s.n ? 'ring-4 ring-primary-50 scale-110' : ''}
                         `}>
                            {step > s.n ? <CheckCircle size={20} className="fill-current" /> : s.n}
                        </div>
                        <div className={`ml-3 hidden md:block font-medium text-sm ${step >= s.n ? 'text-navy-900' : 'text-gray-400'}`}>
                            {s.label}
                        </div>
                        {i < 3 && (
                            <div className={`h-1 flex-1 mx-4 rounded-full transition-all ${step > s.n ? 'bg-primary-600' : 'bg-gray-100'}`}></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 min-h-[500px] relative">
                {step === 1 && <Step1 />}
                {step === 2 && <Step2 />}
                {step === 3 && <Step3 />}
                {step === 4 && <Step4 />}
            </div>

            {/* Navigation Actions */}
            <div className="flex justify-between items-center mt-8">
                <button
                    onClick={handleBack}
                    disabled={step === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:text-navy-900 hover:bg-gray-100'}`}
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {step < 4 ? (
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-navy-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        Next Step <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        onClick={() => handleSubmit(false)}
                        disabled={loading}
                        className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-500 transition-all shadow-lg hover:shadow-xl hover:shadow-primary-600/20 hover:-translate-y-0.5 disabled:opacity-70 disabled:transform-none"
                    >
                        {loading ? 'Publishing...' : 'Publish Project'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default StudentPostProject;
