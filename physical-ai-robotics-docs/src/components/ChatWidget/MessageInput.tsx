// src/components/ChatWidget/MessageInput.tsx - Input field with send button

import React, { useState, KeyboardEvent } from 'react';
import './styles.css';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled = false }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="chatbot-input-container">
      <textarea
        className="chatbot-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        disabled={disabled}
        rows={1}
      />
      <button
        className="chatbot-send-button"
        onClick={handleSubmit}
        disabled={disabled || !message.trim()}
        aria-label="Send message"
      >
        ➤
      </button>
    </div>
  );
};

export default MessageInput;