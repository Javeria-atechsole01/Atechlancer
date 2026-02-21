import React, { useState, useEffect } from 'react';
import { verificationService } from '../../services/verificationService';
import DocumentUpload from '../../components/verification/DocumentUpload';
import SkillTest from '../../components/verification/SkillTest';
import InterviewBooking from '../../components/verification/InterviewBooking';
import {
    FileText, Award, Calendar, CheckCircle, Loader2,
    AlertCircle, Shield
} from 'lucide-react';
import './verification.css';

const VerificationPage = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { id: 'documents', label: 'Upload Documents', icon: FileText },
        { id: 'test', label: 'Skill Test', icon: Award },
        { id: 'interview', label: 'Interview', icon: Calendar },
        { id: 'complete', label: 'Complete', icon: CheckCircle }
    ];

    useEffect(() => {
        loadVerificationStatus();
    }, []);

    const loadVerificationStatus = async () => {
        setLoading(true);
        try {
            const data = await verificationService.getVerificationStatus();
            setStatus(data);

            // Determine current step based on status
            if (!data.documentsSubmitted) {
                setCurrentStep(0);
            } else if (!data.testCompleted) {
                setCurrentStep(1);
            } else if (!data.interviewBooked) {
                setCurrentStep(2);
            } else {
                setCurrentStep(3);
            }
        } catch (error) {
            console.error('Failed to load verification status:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDocumentsComplete = () => {
        setCurrentStep(1);
        loadVerificationStatus();
    };

    const handleTestComplete = () => {
        setCurrentStep(2);
        loadVerificationStatus();
    };

    const handleInterviewComplete = () => {
        setCurrentStep(3);
        loadVerificationStatus();
    };

    if (loading) {
        return (
            <div className="verification-loading">
                <Loader2 className="animate-spin" size={48} />
                <p>Loading verification status...</p>
            </div>
        );
    }

    return (
        <div className="verification-page">
            <div className="verification-header">
                <Shield size={48} className="header-icon" />
                <h1>Seller Verification</h1>
                <p>Complete the verification process to build trust with clients</p>
            </div>

            {/* Progress Stepper */}
            <div className="verification-stepper">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isCompleted = index < currentStep;
                    const isCurrent = index === currentStep;

                    return (
                        <div
                            key={step.id}
                            className={`step-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}
                        >
                            <div className="step-indicator">
                                {isCompleted ? (
                                    <CheckCircle size={24} />
                                ) : (
                                    <Icon size={24} />
                                )}
                            </div>
                            <span className="step-label">{step.label}</span>
                            {index < steps.length - 1 && (
                                <div className="step-connector" />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Step Content */}
            <div className="verification-content">
                {currentStep === 0 && (
                    <DocumentUpload onComplete={handleDocumentsComplete} />
                )}

                {currentStep === 1 && (
                    <div className="step-container">
                        <div className="step-intro">
                            <Award size={48} />
                            <h2>Skill Assessment</h2>
                            <p>Complete a skill test to demonstrate your expertise</p>
                            <div className="test-info">
                                <div className="info-item">
                                    <strong>Duration:</strong> 30 minutes
                                </div>
                                <div className="info-item">
                                    <strong>Questions:</strong> 20 MCQs
                                </div>
                                <div className="info-item">
                                    <strong>Passing Score:</strong> 70%
                                </div>
                            </div>
                        </div>
                        <SkillTest
                            category={status?.category || 'general'}
                            onComplete={handleTestComplete}
                        />
                    </div>
                )}

                {currentStep === 2 && (
                    <InterviewBooking onComplete={handleInterviewComplete} />
                )}

                {currentStep === 3 && (
                    <div className="verification-complete">
                        <div className="complete-icon">
                            <CheckCircle size={64} />
                        </div>
                        <h2>Verification Complete!</h2>

                        {status?.verificationStatus === 'approved' ? (
                            <>
                                <p className="success-message">
                                    Congratulations! Your verification has been approved.
                                </p>
                                <div className="verification-details">
                                    <div className="detail-item">
                                        <strong>Verification Level:</strong>
                                        <span className="level-badge">{status.level || 'Basic'}</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Test Score:</strong>
                                        <span>{status.testScore || 0}%</span>
                                    </div>
                                    <div className="detail-item">
                                        <strong>Verified On:</strong>
                                        <span>{new Date(status.verifiedAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <a href="/dashboard" className="btn btn-primary">
                                    Go to Dashboard
                                </a>
                            </>
                        ) : status?.verificationStatus === 'pending' ? (
                            <>
                                <p className="pending-message">
                                    Your verification is under review. We'll notify you once it's complete.
                                </p>
                                <div className="pending-info">
                                    <AlertCircle size={20} />
                                    <span>This usually takes 1-2 business days</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="rejected-message">
                                    Your verification was not approved. Please review the feedback and try again.
                                </p>
                                {status?.rejectionReason && (
                                    <div className="rejection-reason">
                                        <strong>Reason:</strong>
                                        <p>{status.rejectionReason}</p>
                                    </div>
                                )}
                                <button
                                    className="btn btn-primary"
                                    onClick={() => setCurrentStep(0)}
                                >
                                    Start Over
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerificationPage;
