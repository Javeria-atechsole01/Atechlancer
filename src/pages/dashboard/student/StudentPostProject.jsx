import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layers, Image, FileText, Link as LinkIcon, CheckCircle, ArrowRight, ArrowLeft, Eye } from 'lucide-react';
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
        tags: '',

        // Step 2: Content
        imageUrl: '', // Main Thumbnail
        videoUrl: '',
        repoUrl: '',
        liveUrl: '',

        // Step 3: Details
        description: '',
        problemStatement: '',
        solutionOverview: '',
        techStack: '',

        // Step 4
        visibility: 'public'
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
                tags: formData.tags.split(',').map(s => s.trim()).filter(Boolean),
                images: formData.imageUrl ? [formData.imageUrl] : [] // Simple array for now
            };
            // await projectService.create(payload);
            console.log("Submitting Project:", payload);
            alert("Project Published Successfully! (Connected to backend check needed)");
            navigate('/dashboard/student/home');
        } catch (error) {
            console.error(error);
            alert("Failed to publish project");
        } finally {
            setLoading(false);
        }
    };

    // --- STEPS COMPONENTS ---

    /** Step 1: Basics */
    const Step1 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Project Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="e.g. AI-Powered Personal Finance Tracker"
                    autoFocus
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                <select name="category" value={formData.category} onChange={handleChange} className="search-input w-full">
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>AI/Machine Learning</option>
                    <option>UI/UX Design</option>
                    <option>Blockchain</option>
                    <option>Cybersecurity</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Short Summary (Tagline)</label>
                <input
                    name="summary"
                    value={formData.summary}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="A brief 1-line description appearing on project cards..."
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tags (comma separated)</label>
                <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="e.g. React, Python, OpenAI, TensorFlow"
                />
            </div>
        </div>
    );

    /** Step 2: Media & Links */
    const Step2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 text-center border-dashed border-2">
                <Image className="mx-auto text-blue-400 mb-2" size={32} />
                <h4 className="font-bold text-navy-900">Project Thumbnail</h4>
                <p className="text-sm text-gray-500 mb-4">Upload a high-quality image to represent your project.</p>
                {/* Simplified Text Input for URL for now, strictly should be file upload */}
                <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="Enter Image URL (e.g. from Cloudinary)"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <LinkIcon size={14} /> GitHub Repo URL
                    </label>
                    <input name="repoUrl" value={formData.repoUrl} onChange={handleChange} className="search-input w-full" placeholder="https://github.com/..." />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                        <Eye size={14} /> Live Demo URL
                    </label>
                    <input name="liveUrl" value={formData.liveUrl} onChange={handleChange} className="search-input w-full" placeholder="https://myproject.com" />
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-2">
                    Video Demo URL (YouTube/Vimeo)
                </label>
                <input name="videoUrl" value={formData.videoUrl} onChange={handleChange} className="search-input w-full" placeholder="https://youtube.com/..." />
            </div>
        </div>
    );

    /** Step 3: Deep Dive */
    const Step3 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Problem Statement</label>
                <textarea
                    name="problemStatement"
                    value={formData.problemStatement}
                    onChange={handleChange}
                    className="search-input w-full min-h-[100px]"
                    placeholder="What problem does this project solve?"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Solution Overview</label>
                <textarea
                    name="solutionOverview"
                    value={formData.solutionOverview}
                    onChange={handleChange}
                    className="search-input w-full min-h-[120px]"
                    placeholder="How did you solve it? Describe your approach."
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Tech Stack Details</label>
                <textarea
                    name="techStack"
                    value={formData.techStack}
                    onChange={handleChange}
                    className="search-input w-full min-h-[100px]"
                    placeholder="Why did you choose these technologies?"
                />
            </div>
        </div>
    );

    /** Step 4: Preview */
    const Step4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                {/* Mock Card Preview */}
                <div className="h-48 bg-gray-100 flex items-center justify-center">
                    {formData.imageUrl ? (
                        <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-gray-400">No Image</span>
                    )}
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-navy-900">{formData.title || 'Untitled Project'}</h2>
                        <span className="bg-primary-50 text-primary-700 px-2 py-1 rounded text-xs font-bold">{formData.category}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{formData.summary || 'No summary provided.'}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {formData.tags ? formData.tags.split(',').map((s, i) => (
                            <span key={i} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-semibold">{s}</span>
                        )) : <span className="text-gray-400 italic">No tags</span>}
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <h4 className="font-bold text-navy-900 mb-2">Visibility Settings</h4>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="visibility" value="public" checked={formData.visibility === 'public'} onChange={handleChange} />
                        <span>Public (Everyone can see)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="visibility" value="private" checked={formData.visibility === 'private'} onChange={handleChange} />
                        <span>Private (Only you)</span>
                    </label>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-page max-w-4xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-navy-900">Showcase Your Work</h1>
                <p className="text-gray-500">Share your projects with the world and get hired.</p>
            </div>

            {/* Progress Stepper */}
            <div className="flex items-center justify-between mb-8 px-4">
                {[
                    { n: 1, label: 'Basics' },
                    { n: 2, label: 'Media' },
                    { n: 3, label: 'Details' },
                    { n: 4, label: 'Review' }
                ].map((s, i) => (
                    <div key={s.n} className={`flex items-center ${i < 3 ? 'flex-1' : ''}`}>
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg border-2 z-10 bg-white
                            ${step >= s.n ? 'border-primary-600 text-primary-600' : 'border-gray-200 text-gray-400'}
                            ${step === s.n ? 'ring-4 ring-primary-100' : ''}
                         `}>
                            {step > s.n ? <CheckCircle size={20} className="fill-current" /> : s.n}
                        </div>
                        <div className={`ml-3 hidden md:block font-medium ${step >= s.n ? 'text-navy-900' : 'text-gray-400'}`}>
                            {s.label}
                        </div>
                        {i < 3 && (
                            <div className={`h-1 flex-1 mx-4 rounded ${step > s.n ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Form Content */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 min-h-[400px]">
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
                    className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <ArrowLeft size={18} /> Back
                </button>

                {step < 4 ? (
                    <button
                        onClick={handleNext}
                        className="flex items-center gap-2 bg-navy-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-navy-800 transition-all shadow-md hover:shadow-lg"
                    >
                        Next <ArrowRight size={18} />
                    </button>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="flex items-center gap-2 bg-primary-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                    >
                        {loading ? 'Publishing...' : 'Publish Project'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default StudentPostProject;
