import React, { useState, useEffect } from 'react';
import { verificationService } from '../../services/verificationService';
import { Calendar, Clock, CheckCircle, Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import '../../pages/verification/verification.css';

const InterviewBooking = ({ onComplete }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [booking, setBooking] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadSlots();
    }, [selectedDate]);

    const loadSlots = async () => {
        setLoading(true);
        try {
            const dateStr = selectedDate.toISOString().split('T')[0];
            const data = await verificationService.getInterviewSlots(dateStr);
            setSlots(data.slots || []);
        } catch (error) {
            setError('Failed to load available slots');
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async () => {
        if (!selectedSlot) {
            setError('Please select a time slot');
            return;
        }

        setBooking(true);
        try {
            await verificationService.bookInterview(selectedSlot._id, notes);
            onComplete();
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to book interview');
        } finally {
            setBooking(false);
        }
    };

    const changeDate = (days) => {
        const newDate = new Date(selectedDate);
        newDate.setDate(newDate.getDate() + days);

        // Don't allow past dates
        if (newDate >= new Date().setHours(0, 0, 0, 0)) {
            setSelectedDate(newDate);
            setSelectedSlot(null);
        }
    };

    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="interview-booking">
            <div className="booking-header">
                <h2>Schedule Verification Interview</h2>
                <p>Select a convenient date and time for your verification interview</p>
            </div>

            {error && (
                <div className="error-message">
                    <AlertCircle size={18} />
                    <span>{error}</span>
                </div>
            )}

            {/* Date Selector */}
            <div className="date-selector">
                <button
                    className="date-nav-btn"
                    onClick={() => changeDate(-1)}
                    disabled={selectedDate.toDateString() === new Date().toDateString()}
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="selected-date">
                    <Calendar size={20} />
                    <span>{formatDate(selectedDate)}</span>
                </div>

                <button
                    className="date-nav-btn"
                    onClick={() => changeDate(1)}
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Time Slots */}
            <div className="slots-section">
                <h3>Available Time Slots</h3>

                {loading ? (
                    <div className="slots-loading">
                        <Loader2 className="animate-spin" size={32} />
                        <p>Loading available slots...</p>
                    </div>
                ) : slots.length === 0 ? (
                    <div className="slots-empty">
                        <AlertCircle size={48} />
                        <h4>No slots available</h4>
                        <p>Please select a different date</p>
                    </div>
                ) : (
                    <div className="slots-grid">
                        {slots.map((slot) => (
                            <button
                                key={slot._id}
                                className={`slot-card ${selectedSlot?._id === slot._id ? 'selected' : ''} ${!slot.available ? 'disabled' : ''}`}
                                onClick={() => slot.available && setSelectedSlot(slot)}
                                disabled={!slot.available}
                            >
                                <Clock size={18} />
                                <span className="slot-time">{formatTime(slot.time)}</span>
                                {!slot.available && (
                                    <span className="slot-status">Booked</span>
                                )}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Additional Notes */}
            {selectedSlot && (
                <div className="booking-notes">
                    <label htmlFor="notes">Additional Notes (Optional)</label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any specific topics you'd like to discuss or questions you have..."
                        rows={4}
                        maxLength={500}
                    />
                    <span className="input-hint">{notes.length}/500 characters</span>
                </div>
            )}

            {/* Booking Summary */}
            {selectedSlot && (
                <div className="booking-summary">
                    <h4>Interview Summary</h4>
                    <div className="summary-details">
                        <div className="summary-item">
                            <Calendar size={18} />
                            <span>{formatDate(selectedDate)}</span>
                        </div>
                        <div className="summary-item">
                            <Clock size={18} />
                            <span>{formatTime(selectedSlot.time)}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Actions */}
            <div className="booking-actions">
                <button
                    className="btn btn-primary"
                    onClick={handleBooking}
                    disabled={!selectedSlot || booking}
                >
                    {booking ? (
                        <>
                            <Loader2 className="animate-spin" size={18} />
                            Booking...
                        </>
                    ) : (
                        <>
                            <CheckCircle size={18} />
                            Confirm Booking
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default InterviewBooking;
