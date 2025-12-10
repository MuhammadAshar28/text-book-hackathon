// src/components/ChatWidget/ChatPanel.tsx - Chat panel component

import React, { useRef, useEffect } from 'react';
import './styles.css';

interface ChatPanelProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isVisible, onClose, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  // Add debug logging
  console.log("ChatPanel rendered, isVisible:", isVisible);

  return (
    <div className="chatbot-panel" ref={panelRef}>
      <div className="chatbot-panel-header">
        <h3 className="chatbot-panel-title">AI Assistant</h3>
        <button
          className="chatbot-panel-close"
          onClick={onClose}
          aria-label="Close chat"
        >
          ×
        </button>
      </div>
      <div className="chatbot-messages-container">
        {children}
      </div>
    </div>
  );
};

export default ChatPanel;