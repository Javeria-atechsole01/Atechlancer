import React from 'react';
import './chat.css';

const TypingIndicator = ({ userName }) => {
    return (
        <div className="typing-indicator">
            <span className="typing-user">{userName} is typing</span>
            <div className="typing-dots">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>
        </div>
    );
};

export default TypingIndicator;
