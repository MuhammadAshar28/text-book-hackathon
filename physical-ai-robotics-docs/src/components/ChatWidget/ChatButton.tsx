// src/components/ChatWidget/ChatButton.tsx - Floating chat button component

import React, { useState } from 'react';
import './styles.css';

interface ChatButtonProps {
  onClick: () => void;
  isVisible: boolean;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, isVisible }) => {
  const [hasUnread, setHasUnread] = useState(false);

  // For demonstration, we'll simulate unread messages
  // In a real implementation, this would be connected to actual message state
  React.useEffect(() => {
    // Simulate setting unread status based on messages
    // This is just for visual effect in this component
  }, []);

  const handleClick = () => {
    console.log("ChatButton clicked, calling onClick handler");
    onClick();
  };

  return (
    <button
      className={`chatbot-button ${isVisible ? 'chatbot-button-hidden' : ''}`}
      onClick={handleClick}
      aria-label="Open chat"
    >
      {hasUnread && <div className="chatbot-unread-indicator"></div>}
      <div className="chatbot-icon">
        💬
      </div>
    </button>
  );
};

export default ChatButton;