import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseService } from '../../services/courseService';
import { Download, Printer, ShieldCheck, Award, Loader2, ChevronLeft } from 'lucide-react';
import logo from '../../assets/atechlancer_logo.png';

const Certificate = () => {
    const { enrollmentId } = useParams();
    const navigate = useNavigate();
    const [enrollment, setEnrollment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrollment = async () => {
            try {
                const enrollments = await courseService.getUserEnrollments();
                const current = enrollments.find(e => e._id === enrollmentId || e.certificateId === enrollmentId);

                if (!current || !current.isCompleted) {
                    alert('Certificate not found or course not completed.');
                    navigate('/my-courses');
                    return;
                }
                setEnrollment(current);
            } catch (error) {
                console.error('Error fetching certificate:', error);
                navigate('/my-courses');
            } finally {
                setLoading(false);
            }
        };
        fetchEnrollment();
    }, [enrollmentId]);

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin" size={64} /></div>;

    const { courseId: course } = enrollment;
    const completionDate = new Date(enrollment.updatedAt).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4">
            <div className="max-w-4xl mx-auto mb-8 flex justify-between items-center no-print">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-black">
                    <ChevronLeft size={20} /> Back
                </button>
                <div className="flex gap-4">
                    <button onClick={handlePrint} className="btn bg-white border border-gray-200 px-6 py-2 rounded-lg flex items-center gap-2 font-bold shadow-sm">
                        <Printer size={18} /> Print PDF
                    </button>
                </div>
            </div>

            {/* Certificate Document */}
            <div className="certificate-paper bg-white shadow-2xl mx-auto p-16 relative overflow-hidden flex flex-col items-center text-center border-[20px] border-double border-navy-900" style={{ width: '800px', height: '600px' }}>
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-navy-900 -rotate-45 translate-x-16 -translate-y-16"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent-400 rotate-45 -translate-x-16 translate-y-16"></div>

                <div className="mb-8">
                    <img src={logo} alt="Atechlancer" className="h-16 mx-auto mb-2" />
                    <div className="text-2xl font-black tracking-tighter text-navy-900">
                        ATECH<span className="text-green-600">LANCER</span>
                    </div>
                </div>

                <div className="text-primary-600 font-bold tracking-[0.2em] uppercase mb-4">Certificate of Completion</div>
                <h1 className="text-4xl font-serif text-gray-900 mb-8 italic">This is to certify that</h1>

                <div className="text-5xl font-black text-navy-900 border-b-2 border-gray-200 pb-2 mb-8 uppercase tracking-wide">
                    {enrollment.userId?.name || 'Valued Student'}
                </div>

                <p className="text-xl text-gray-600 mb-8">
                    Has successfully completed the comprehensive online course:
                </p>

                <div className="text-3xl font-bold text-gray-900 mb-12 max-w-2xl px-4">
                    "{course.title}"
                </div>

                <div className="flex justify-between w-full items-end mt-auto px-12">
                    <div className="text-left">
                        <div className="font-bold border-b border-gray-400 pb-1 mb-1">{course.teacherId?.name}</div>
                        <div className="text-xs text-gray-500 uppercase">Instructor</div>
                    </div>

                    <div className="text-center">
                        <Award size={64} className="text-accent-400 mb-2 opacity-80" />
                        <div className="text-[10px] text-gray-400 font-mono tracking-tighter">ID: {enrollment.certificateId}</div>
                    </div>

                    <div className="text-right">
                        <div className="font-bold border-b border-gray-400 pb-1 mb-1">{completionDate}</div>
                        <div className="text-xs text-gray-500 uppercase">Date of Completion</div>
                    </div>
                </div>

                <div className="mt-12 flex items-center gap-2 text-[10px] text-gray-400">
                    < ShieldCheck size={12} /> Authenticity verified by Atechlancer Learning Platform
                </div>
            </div>

            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; padding: 0 !important; }
                    .certificate-paper { 
                        box-shadow: none !important; 
                        margin: 0 auto !important;
                        border-width: 15px !important;
                    }
                }
                .certificate-paper {
                    font-family: 'Inter', system-ui, sans-serif;
                }
            `}</style>
        </div>
    );
};

export default Certificate;
