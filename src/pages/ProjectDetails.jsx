import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Github, ExternalLink, MessageCircle, ChevronLeft, Eye, Code, CheckCircle } from 'lucide-react';
import ContactOwnerModal from '../components/projects/ContactOwnerModal';

const ProjectDetails = () => {
    const { id } = useParams();
    const [liked, setLiked] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    // Mock Data
    const project = {
        id: 1,
        title: 'AI-Powered Personal Finance Tracker',
        student: 'Sarah Smith',
        studentRole: 'Full Stack Developer',
        category: 'AI/Machine Learning',
        summary: 'A smart dashboard that categorizes expenses automatically using NLP and predicts future spending.',
        views: 342,
        likes: 28,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
        repoUrl: 'https://github.com',
        liveUrl: 'https://demo.com',
        description: `
            <p class="mb-4 text-lg leading-relaxed text-gray-600">Managing personal finances can be tedious. This project aims to automate expense tracking by parsing bank statements and transaction SMS using Natural Language Processing.</p>
            <h3 class="text-xl font-bold text-navy-900 mt-8 mb-3">Problem Statement</h3>
            <p class="mb-4 text-gray-600 leading-relaxed">Most finance apps require manual entry or have poor categorization for local merchants. Users often lose track of subscriptions and small daily expenses.</p>
            <div class="my-8 p-6 bg-blue-50 rounded-xl border-l-4 border-blue-500 italic text-blue-800">
                "The goal was not just to track, but to provide actionable insights that actually save money."
            </div>
            <h3 class="text-xl font-bold text-navy-900 mt-8 mb-3">Solution</h3>
            <p class="mb-4 text-gray-600 leading-relaxed">I built a web app that allows CSV uploads and connects to Plaid API. Using OpenAI's GPT-3.5, categorization accuracy improved by 40% compared to rule-based systems.</p>
        `,
        techStack: ['React', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
        tags: ['Fintech', 'AI', 'Automation', 'SaaS'],
        isVerified: true
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <ContactOwnerModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                studentName={project.student}
                projectTitle={project.title}
            />

            {/* Hero Header */}
            <div className="bg-navy-900 pt-24 pb-20 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <Link to="/projects" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors font-medium">
                        <ChevronLeft size={20} /> Back to Hub
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-3xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-4 py-1.5 bg-primary-600/20 text-primary-300 border border-primary-500/30 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                                    {project.category}
                                </span>
                                <span className="flex items-center gap-1.5 text-gray-300 text-sm font-medium">
                                    <Eye size={16} /> {project.views} views
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-gray-300 font-light leading-relaxed">
                                {project.summary}
                            </p>
                        </div>

                        <div className="flex gap-3 shrink-0">
                            {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white px-6 py-3.5 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary-600/30 hover:-translate-y-0.5">
                                    <ExternalLink size={18} /> View Live
                                </a>
                            )}
                            {project.repoUrl && (
                                <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3.5 rounded-xl font-bold transition-all backdrop-blur-sm border border-white/10 hover:border-white/20">
                                    <Github size={18} /> Code
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Main Image */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 ring-1 ring-black/5 group">
                        <div className="relative overflow-hidden">
                            <img src={project.image} alt={project.title} className="w-full h-auto transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    </div>

                    {/* Detailed Content */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-10">
                        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-navy-900 prose-blue" dangerouslySetInnerHTML={{ __html: project.description }} />

                        <div className="mt-10 pt-10 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-navy-900 mb-5 flex items-center gap-2">
                                <Code className="text-primary-600" size={24} /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-4 py-2 bg-white text-navy-700 rounded-lg text-sm font-semibold border border-gray-200 shadow-sm hover:border-primary-300 hover:text-primary-700 transition-colors cursor-default">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Student Profile Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-navy-900 to-navy-700 rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-md border-2 border-white">
                                {project.student[0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-navy-900 flex items-center gap-1">
                                    {project.student}
                                    {project.isVerified && <CheckCircle size={14} className="text-green-500 fill-current" />}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium">{project.studentRole}</p>
                                <div className="mt-2 flex gap-2">
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">5 Projects</span>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-medium">120 Likes</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => setIsContactOpen(true)}
                                className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-navy-900/20 hover:shadow-navy-900/30 transform hover:-translate-y-0.5"
                            >
                                <MessageCircle size={18} /> Contact Student
                            </button>
                            <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-3.5 rounded-xl font-bold transition-all">
                                View Full Profile
                            </button>
                        </div>

                        {/* Interaction Actions */}
                        <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 ${liked ? 'bg-red-50 border-red-200 text-red-600 scale-95' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                            >
                                <Heart size={24} className={liked ? 'fill-current animate-bounce' : ''} />
                                <span className="font-bold text-lg mt-1">{liked ? project.likes + 1 : project.likes}</span>
                                <span className="text-xs font-medium">Appreciate</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-all">
                                <Share2 size={24} />
                                <span className="font-bold text-lg mt-1">Share</span>
                                <span className="text-xs font-medium">Spread Word</span>
                            </button>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-bold text-gray-900 mb-4 text-xs uppercase tracking-wider text-opacity-50">Related Topics</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
