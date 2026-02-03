import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, ShieldCheck, ArrowRight, ClipboardList, UserCheck, Zap } from 'lucide-react';

const AssignmentLanding = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="bg-navy-900 py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Academic Assignment <span className="text-secondary-400">Marketplace</span>
                    </h1>
                    <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Connect with verified academic experts for guidance and solutions. Professional, ethical, and result-oriented.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/dashboard/student/post-assignment" className="bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-all flex items-center justify-center gap-2">
                            Post Assignment <ArrowRight size={20} />
                        </Link>
                        <Link to="/assignments" className="bg-white text-navy-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all border border-gray-200">
                            Browse Assignments
                        </Link>
                    </div>
                </div>
            </div>

            {/* How it Works */}
            <div className="py-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-navy-900 mb-4">How It Works</h2>
                    <p className="text-gray-600">A seamless process designed for academic success</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { icon: <ClipboardList className="text-primary-600" />, title: "Post Requirement", desc: "Share your assignment details, files, and deadline." },
                        { icon: <Zap className="text-primary-600" />, title: "Receive Bids", desc: "Verified experts review and provide competitive offers." },
                        { icon: <UserCheck className="text-primary-600" />, title: "Select Expert", desc: "Choose the best match based on profile and bids." },
                        { icon: <CheckCircle className="text-primary-600" />, title: "Get Solution", desc: "Receive high-quality work and release payment." }
                    ].map((step, i) => (
                        <div key={i} className="text-center group">
                            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold text-navy-900 mb-2">{step.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trust & Ethics Section */}
            <div className="bg-gray-50 py-24 px-4">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 p-8 md:p-12 shadow-xl">
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                            <ShieldCheck className="text-green-600" size={48} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-navy-900 mb-4">Academic Integrity First</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                AtechLancer is committed to fostering a supportive and ethical learning environment. Our marketplace is designed for tutoring, guidance, and reference purposes. We strictly prohibit any activities that violate institutional academic policies.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Plagiarism-free solutions guaranteed",
                                    "Verified academic experts only",
                                    "Confidential and secure platform",
                                    "Transparent communication channels"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium font-secondary">
                                        <CheckCircle size={18} className="text-green-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentLanding;
