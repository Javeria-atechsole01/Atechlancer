import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assignmentService } from '../../../services/assignmentService';
import {
    Loader2, BookOpen, Clock, DollarSign, FileText,
    CheckCircle, ArrowRight, ArrowLeft, Upload, AlertCircle
} from 'lucide-react';

const PostAssignment = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

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
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Assignment Title</label>
                <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="search-input w-full"
                    placeholder="e.g. Advanced Algorithms - Sorting and Searching Project"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">Subject / Category</label>
                    <select name="subject" value={formData.subject} onChange={handleChange} className="search-input w-full">
                        <option>Computer Science</option>
                        <option>Mathematics</option>
                        <option>Physics</option>
                        <option>Business & Finance</option>
                        <option>Engineering</option>
                        <option>Humanities</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">Academic Level</label>
                    <select name="academicLevel" value={formData.academicLevel} onChange={handleChange} className="search-input w-full">
                        <option>High School</option>
                        <option>Undergraduate</option>
                        <option>Graduate</option>
                        <option>Doctorate</option>
                        <option>Professional</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">Deadline</label>
                    <div className="relative">
                        <Clock size={16} className="absolute left-3 top-3 text-gray-400" />
                        <input type="date" name="deadline" value={formData.deadline} onChange={handleChange} className="search-input w-full pl-10" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-navy-900 mb-2">Budget Range ($)</label>
                    <div className="flex gap-4">
                        <input type="number" name="budget.min" value={formData.budget.min} onChange={handleChange} placeholder="Min" className="search-input w-full" />
                        <input type="number" name="budget.max" value={formData.budget.max} onChange={handleChange} placeholder="Max" className="search-input w-full" />
                    </div>
                </div>
            </div>
        </div>
    );

    /** Step 2: Details & Files */
    const Step2 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Detailed Description</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="search-input w-full min-h-[200px]"
                    placeholder="Describe your assignment requirements in detail. Mention specific tools, methodologies, or references to be used..."
                />
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                <Upload className="mx-auto text-gray-400 mb-4 group-hover:text-primary-600 transition-colors" size={40} />
                <p className="text-navy-900 font-bold mb-1">Upload Assignment Files</p>
                <p className="text-gray-500 text-sm">PDF, DOCX, ZIP, or Images (Max 20MB)</p>
                <input type="file" className="hidden" multiple />
            </div>

            <div className="bg-primary-50 p-4 rounded-xl border border-primary-100 flex gap-3">
                <AlertCircle className="text-primary-600 shrink-0" size={20} />
                <p className="text-sm text-primary-800">
                    <strong>Clarity Tip:</strong> Clear instructions lead to 40% better solutions. Ensure all relevant materials are included.
                </p>
            </div>
        </div>
    );

    /** Step 3: Preferences */
    const Step3 = () => (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div>
                <label className="block text-sm font-semibold text-navy-900 mb-4">Preferred Expert Level</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['entry', 'mid', 'expert'].map(level => (
                        <label key={level} className={`border rounded-2xl p-4 cursor-pointer transition-all hover:shadow-md ${formData.preferences.freelancerLevel === level ? 'bg-primary-50 border-primary-500 ring-1 ring-primary-500' : 'border-gray-200 bg-white'}`}>
                            <input type="radio" name="prefLevel" checked={formData.preferences.freelancerLevel === level} onChange={() => handlePreferenceChange('freelancerLevel', level)} className="hidden" />
                            <div className="font-bold capitalize text-navy-900 mb-1">{level}</div>
                            <div className="text-xs text-gray-500">
                                {level === 'entry' && 'Standard guidance'}
                                {level === 'mid' && 'Professional analysis'}
                                {level === 'expert' && 'Specialized dissertation level'}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-navy-900 mb-2">Language Requirements</label>
                <select name="prefLang" value={formData.preferences.language} onChange={(e) => handlePreferenceChange('language', e.target.value)} className="search-input w-full md:w-1/2">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                </select>
            </div>

            <div className="bg-navy-900 p-6 rounded-2xl text-white">
                <label className="flex items-center gap-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.preferences.plagiarismFree}
                        onChange={(e) => handlePreferenceChange('plagiarismFree', e.target.checked)}
                        className="w-5 h-5 accent-primary-500"
                    />
                    <div>
                        <div className="font-bold text-lg">Strict Plagiarism-Free Guarantee</div>
                        <div className="text-gray-400 text-sm">By checking this, you mandate a unique solution with supporting similarity reports.</div>
                    </div>
                </label>
            </div>
        </div>
    );

    /** Step 4: Review */
    const Step4 = () => (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-green-50 border border-green-100 p-4 rounded-xl flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                <p className="text-sm text-green-800 font-medium">Your assignment is ready for publication.</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-navy-900 mb-2">{formData.title || 'Assignment Title'}</h2>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">{formData.subject}</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold">{formData.academicLevel}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">${formData.budget.min || 0} - ${formData.budget.max || 0}</div>
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-wider mt-1">Budget Range</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-100 mb-6">
                    <div>
                        <div className="text-gray-400 text-xs font-bold uppercase mb-2">Deadline</div>
                        <div className="flex items-center gap-2 text-navy-900 font-medium">
                            <Clock size={16} /> {formData.deadline || 'Not set'}
                        </div>
                    </div>
                    <div>
                        <div className="text-gray-400 text-xs font-bold uppercase mb-2">Requirement Level</div>
                        <div className="flex items-center gap-2 text-navy-900 font-medium font-secondary capitalize">
                            <CheckCircle size={16} className="text-green-500" /> {formData.preferences.freelancerLevel}
                        </div>
                    </div>
                </div>

                <div className="text-gray-600 prose prose-sm max-w-none">
                    <p className="font-bold underline mb-1">Description:</p>
                    <p className="whitespace-pre-line">{formData.description || 'No description provided.'}</p>
                </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-500 italic">
                AtechLancer Academic Integrity Notice: This assignment will be visible to all verified experts. Ensure no personal identification data is present in the description or files.
            </div>
        </div>
    );

    return (
        <div className="dashboard-page max-w-4xl mx-auto py-12 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold text-navy-900 mb-2">Post an Assignment</h1>
                <p className="text-gray-500">Fill in the details to receive bids from top experts.</p>
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between mb-12 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-0"></div>
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-primary-600 -translate-y-1/2 -z-0 transition-all duration-500"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                ></div>

                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="relative z-10 flex flex-col items-center">
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg border-[3px] transition-all duration-300
                            ${step >= s ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-100' : 'bg-white border-gray-200 text-gray-400'}
                            ${step === s ? 'ring-4 ring-primary-100 scale-110' : ''}
                        `}>
                            {step > s ? <CheckCircle size={24} /> : s}
                        </div>
                    </div>
                ))}
            </div>

            {/* Form Container */}
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
                <div className="min-h-[400px]">
                    {step === 1 && <Step1 />}
                    {step === 2 && <Step2 />}
                    {step === 3 && <Step3 />}
                    {step === 4 && <Step4 />}
                </div>

                <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                    <button
                        onClick={handleBack}
                        disabled={step === 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        <ArrowLeft size={20} /> Back
                    </button>

                    <div className="flex gap-4">
                        <button className="text-gray-500 font-bold hover:underline px-4">Save as Draft</button>
                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                className="flex items-center gap-2 bg-navy-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-navy-800 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Next Step <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="flex items-center gap-2 bg-primary-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
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
