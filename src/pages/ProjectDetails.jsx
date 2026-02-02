import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Share2, Github, ExternalLink, MessageCircle, ChevronLeft, Eye, Download, Code } from 'lucide-react';

const ProjectDetails = () => {
    const { id } = useParams();
    const [liked, setLiked] = useState(false);

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
            <p class="mb-4">Managing personal finances can be tedious. This project aims to automate expense tracking by parsing bank statements and transaction SMS using Natural Language Processing.</p>
            <h3 class="text-lg font-bold mb-2">Problem Statement</h3>
            <p class="mb-4">Most finance apps require manual entry or have poor categorization for local merchants. Users often lose track of subscriptions and small daily expenses.</p>
            <h3 class="text-lg font-bold mb-2">Solution</h3>
            <p class="mb-4">I built a web app that allows CSV uploads and connects to Plaid API. Using OpenAI's GPT-3.5, categorization accuracy improved by 40% compared to rule-based systems.</p>
        `,
        techStack: ['React', 'Node.js', 'Python', 'FastAPI', 'PostgreSQL', 'Docker'],
        tags: ['Fintech', 'AI', 'Automation', 'SaaS']
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Hero Header */}
            <div className="bg-navy-900 pt-24 pb-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <Link to="/projects" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors font-medium">
                        <ChevronLeft size={20} /> Back to Hub
                    </Link>

                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-primary-600 text-white rounded-full text-xs font-bold uppercase tracking-wide">{project.category}</span>
                                <span className="flex items-center gap-1 text-gray-300 text-sm"><Eye size={16} /> {project.views} views</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{project.title}</h1>
                            <p className="text-xl text-gray-300 max-w-2xl">{project.summary}</p>
                        </div>

                        <div className="flex gap-4">
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg hover:shadow-primary-500/30">
                                <ExternalLink size={18} /> View Live
                            </a>
                            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-bold transition-all backdrop-blur-sm">
                                <Github size={18} /> Code
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Image */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <img src={project.image} alt={project.title} className="w-full h-auto" />
                    </div>

                    {/* Detailed Content */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                        <div className="prose max-w-none text-gray-700 font-normal leading-relaxed" dangerouslySetInnerHTML={{ __html: project.description }} />

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center gap-2">
                                <Code className="text-primary-600" /> Tech Stack
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium border border-gray-200">{tech}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Student Profile Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-navy-50 rounded-full flex items-center justify-center font-bold text-2xl text-navy-700">
                                {project.student[0]}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-navy-900">{project.student}</h3>
                                <p className="text-sm text-gray-500">{project.studentRole}</p>
                            </div>
                        </div>
                        <button className="w-full bg-navy-900 hover:bg-navy-800 text-white py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 mb-3">
                            <MessageCircle size={18} /> Contact Student
                        </button>
                        <button className="w-full border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-bold transition-all">
                            View Profile
                        </button>
                    </div>

                    {/* Interaction Actions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-gray-700">Project Stats</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                onClick={() => setLiked(!liked)}
                                className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all ${liked ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}
                            >
                                <Heart size={24} className={liked ? 'fill-current' : ''} />
                                <span className="font-bold text-lg mt-1">{liked ? project.likes + 1 : project.likes}</span>
                                <span className="text-xs">Likes</span>
                            </button>
                            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-all">
                                <Share2 size={24} />
                                <span className="font-bold text-lg mt-1">Share</span>
                                <span className="text-xs">Share</span>
                            </button>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm uppercase tracking-wide">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition-colors cursor-pointer">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
