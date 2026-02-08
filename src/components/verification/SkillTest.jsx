import React, { useState, useEffect } from 'react';
import { verificationService } from '../../services/verificationService';
import { Clock, CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import './verification.css';

const SkillTest = ({ category, onComplete }) => {
    const [test, setTest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [timeRemaining, setTimeRemaining] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadTest();
    }, [category]);

    useEffect(() => {
        if (timeRemaining > 0) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeRemaining === 0 && test) {
            handleSubmit();
        }
    }, [timeRemaining]);

    const loadTest = async () => {
        setLoading(true);
        try {
            const data = await verificationService.getSkillTest(category);
            setTest(data.test);
            setTimeRemaining(data.test.duration * 60); // Convert minutes to seconds
        } catch (error) {
            setError('Failed to load skill test');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerSelect = (questionId, optionIndex) => {
        setAnswers({ ...answers, [questionId]: optionIndex });
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const result = await verificationService.submitSkillTest(test._id, answers);
            onComplete(result);
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to submit test');
        } finally {
            setSubmitting(false);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getAnsweredCount = () => {
        return Object.keys(answers).length;
    };

    if (loading) {
        return (
            <div className="test-loading">
                <Loader2 className="animate-spin" size={48} />
                <p>Loading skill test...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="test-error">
                <AlertCircle size={48} />
                <h3>Error</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="skill-test">
            <div className="test-header">
                <div className="test-info">
                    <h2>{test.title}</h2>
                    <p>{test.description}</p>
                </div>
                <div className="test-timer">
                    <Clock size={20} />
                    <span className={timeRemaining < 300 ? 'time-warning' : ''}>
                        {formatTime(timeRemaining)}
                    </span>
                </div>
            </div>

            <div className="test-progress">
                <div className="progress-info">
                    <span>Question {getAnsweredCount()} of {test.questions.length} answered</span>
                </div>
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${(getAnsweredCount() / test.questions.length) * 100}%` }}
                    />
                </div>
            </div>

            <div className="test-questions">
                {test.questions.map((question, qIndex) => (
                    <div key={question._id} className="question-card">
                        <div className="question-header">
                            <span className="question-number">Question {qIndex + 1}</span>
                            {answers[question._id] !== undefined && (
                                <CheckCircle size={18} className="answered-icon" />
                            )}
                        </div>
                        <h3 className="question-text">{question.text}</h3>

                        <div className="options-list">
                            {question.options.map((option, oIndex) => (
                                <label
                                    key={oIndex}
                                    className={`option-item ${answers[question._id] === oIndex ? 'selected' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name={`question-${question._id}`}
                                        checked={answers[question._id] === oIndex}
                                        onChange={() => handleAnswerSelect(question._id, oIndex)}
                                    />
                                    <span className="option-label">{String.fromCharCode(65 + oIndex)}</span>
                                    <span className="option-text">{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="test-actions">
                <div className="test-stats">
                    <span>{getAnsweredCount()} / {test.questions.length} answered</span>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={submitting || getAnsweredCount() === 0}
                >
                    {submitting ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Submitting...
                        </>
                    ) : (
                        <>
                            <CheckCircle size={18} />
                            Submit Test
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default SkillTest;
