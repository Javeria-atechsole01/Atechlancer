import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobService } from '../../../services/jobService';
import { Loader2, Briefcase, DollarSign, MapPin, Calendar, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';

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
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="e.g. Senior React Developer needed for Fintech Project"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="search-input w-full">
                        <option>Web Development</option>
                        <option>Mobile Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                        <option>Marketing</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Job Type</label>
                    <select name="type" value={formData.type} onChange={handleChange} className="search-input w-full">
                        <option value="freelance">Freelance</option>
                        <option value="contract">Contract</option>
                        <option value="part-time">Part-Time</option>
                        <option value="full-time">Full-Time</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Required Skills (comma separated)</label>
                <input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="e.g. React, Node.js, AWS, TypeScript"
                />
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Experience Level</label>
                <div className="flex gap-4">
                    {['entry', 'mid', 'senior', 'expert'].map(level => (
                        <label key={level} className={`flex-1 border rounded-lg p-3 text-center cursor-pointer transition-all ${formData.experienceLevel === level ? 'bg-primary-50 border-primary-500 text-primary-700 font-bold shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <input type="radio" name="experienceLevel" value={level} checked={formData.experienceLevel === level} onChange={handleChange} className="hidden" />
                            <span className="capitalize">{level}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    /** Step 2: Job Details */
    const Step2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="search-input w-full min-h-[150px]"
                    placeholder="Describe the project, goals, and what you are looking for..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Responsibilities</label>
                    <textarea
                        name="responsibilities"
                        value={formData.responsibilities}
                        onChange={handleChange}
                        className="search-input w-full min-h-[100px]"
                        placeholder="- Build reusable components&#10;- Optimize performance..."
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Requirements</label>
                    <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        className="search-input w-full min-h-[100px]"
                        placeholder="- 3+ years of experience&#10;- Strong communication skills..."
                    />
                </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Budget ($)</label>
                    <div className="relative">
                        <DollarSign size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input type="number" name="budget" value={formData.budget} onChange={handleChange} className="search-input w-full pl-8" placeholder="1000" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Budget Type</label>
                    <select name="budgetType" value={formData.budgetType} onChange={handleChange} className="search-input w-full">
                        <option value="fixed">Fixed Price</option>
                        <option value="hourly">Hourly Rate</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                    <input name="duration" value={formData.duration} onChange={handleChange} className="search-input w-full" placeholder="e.g. 3 months" />
                </div>
            </div>
        </div>
    );

    /** Step 3: Preferences */
    const Step3 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Preferred Role</label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {['freelancer', 'student', 'teacher', 'any'].map(role => (
                        <label key={role} className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${formData.preferredRole === role ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500' : 'border-gray-200'}`}>
                            <input type="radio" name="preferredRole" value={role} checked={formData.preferredRole === role} onChange={handleChange} className="hidden" />
                            <div className="font-bold capitalize text-navy-900 mb-1">{role}</div>
                            <div className="text-xs text-gray-500">Target specific talent pool</div>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Location Preference</label>
                <div className="flex gap-4">
                    {['remote', 'onsite', 'hybrid'].map(loc => (
                        <label key={loc} className={`flex-1 border rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer transition-all ${formData.locationType === loc ? 'bg-primary-50 border-primary-500 text-primary-700 font-bold' : 'border-gray-200 hover:bg-gray-50'}`}>
                            <input type="radio" name="locationType" value={loc} checked={formData.locationType === loc} onChange={handleChange} className="hidden" />
                            <MapPin size={16} /> <span className="capitalize">{loc}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Application Deadline</label>
                <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="search-input w-full md:w-1/3" />
            </div>
        </div>
    );

    /** Step 4: Review */
    const Step4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-primary-50 border border-primary-100 p-4 rounded-lg flex items-start gap-3">
                <CheckCircle className="text-primary-600 shrink-0 mt-1" />
                <div>
                    <h4 className="font-bold text-primary-900">Almost Done!</h4>
                    <p className="text-sm text-primary-700">Review your job post details below. Once published, it will be visible to potential candidates.</p>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-navy-900">{formData.title || 'Untitled Job'}</h2>
                        <div className="flex gap-2 text-sm text-gray-500 mt-1">
                            <span className="bg-gray-100 px-2 py-1 rounded">{formData.category}</span>
                            <span>•</span>
                            <span className="capitalize">{formData.type}</span>
                            <span>•</span>
                            <span className="capitalize">{formData.locationType}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">${formData.budget}</div>
                        <div className="text-xs text-gray-400 uppercase">{formData.budgetType}</div>
                    </div>
                </div>

                <div className="prose prose-sm max-w-none text-gray-700 mb-6">
                    <p>{formData.description || 'No description provided.'}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                    <div>
                        <h4 className="font-bold text-navy-900 mb-2">Required Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {formData.skills ? formData.skills.split(',').map((s, i) => (
                                <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{s.trim()}</span>
                            )) : <span className="text-gray-400 italic">None specified</span>}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-navy-900 mb-2">Preferences</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                            <li><strong>Level:</strong> <span className="capitalize">{formData.experienceLevel}</span></li>
                            <li><strong>Role:</strong> <span className="capitalize">{formData.preferredRole}</span></li>
                            <li><strong>Duration:</strong> {formData.duration}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="dashboard-page max-w-4xl mx-auto py-8">
            <div className="mb-8 px-4">
                <h1 className="text-2xl font-bold text-navy-900">Post a New Job</h1>
                <p className="text-gray-500">Follow the steps to attract the best talent.</p>
            </div>

            {/* Progress Stepper */}
            <div className="flex items-center justify-between mb-8 px-4">
                {[
                    { n: 1, label: 'Job Basics' },
                    { n: 2, label: 'Details' },
                    { n: 3, label: 'Preferences' },
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
            <div className="flex justify-between items-center mt-8 px-4">
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
                        {loading ? 'Publishing...' : 'Publish Job'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default EmployerPostJob;
