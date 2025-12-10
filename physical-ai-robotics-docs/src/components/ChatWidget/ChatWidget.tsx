// src/components/ChatWidget/ChatWidget.tsx - Main chat widget component

import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatPanel from './ChatPanel';
import MessagesList from './MessagesList';
import MessageInput from './MessageInput';
import useChat from '../../hooks/useChat';
import './styles.css';

const ChatWidget: React.FC = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  // Add state to prevent rapid clicking
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { messages, sendMessage, isSending, error, clearConversation } = useChat();

  const togglePanel = () => {
    // Prevent rapid clicking during transitions
    if (isTransitioning || isSending) return;

    console.log("Toggle panel called, current isPanelVisible:", isPanelVisible);
    setIsTransitioning(true);
    setIsPanelVisible(!isPanelVisible);
    console.log("After toggle, new isPanelVisible:", !isPanelVisible);

    // Reset the transitioning state after a brief delay
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // Match the CSS transition duration
  };

  const handleClose = () => {
    console.log("Handle close called, setting isPanelVisible to false");
    // Prevent closing during transitions
    if (isTransitioning) return;
    setIsPanelVisible(false);
  };

  const handleSend = (message: string) => {
    sendMessage(message);
  };

  // Debug logging for state changes
  console.log("ChatWidget rendered, isPanelVisible:", isPanelVisible);

  return (
    <>
      <ChatButton onClick={togglePanel} isVisible={isPanelVisible} />
      <ChatPanel isVisible={isPanelVisible} onClose={handleClose}>
        <MessagesList 
          messages={messages} 
          isTyping={isSending} 
        />
        {error && (
          <div style={{ 
            color: 'red', 
            fontSize: '0.8em', 
            padding: '8px',
            backgroundColor: '#ffe6e6',
            borderRadius: '4px',
            margin: '4px',
            alignSelf: 'flex-start'
          }}>
            Error: {error}
          </div>
        )}
        <MessageInput 
          onSend={handleSend} 
          disabled={isSending} 
        />
      </ChatPanel>
    </>
  );
};

export default ChatWidget;