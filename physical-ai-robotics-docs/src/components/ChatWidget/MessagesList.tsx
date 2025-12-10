// src/components/ChatWidget/MessagesList.tsx - Component to display conversation messages

import React from 'react';
import { ChatMessage } from '../../types/chat';
import './styles.css';

interface MessagesListProps {
  messages: ChatMessage[];
  isTyping?: boolean;
}

const MessagesList: React.FC<MessagesListProps> = ({ messages, isTyping = false }) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {messages.map((message) => (
        <div 
          key={message.id} 
          className={`chatbot-message ${message.sender === 'user' ? 'chatbot-message-user' : 'chatbot-message-bot'}`}
        >
          <div>{message.content}</div>
          <div style={{ fontSize: '0.7em', marginTop: '4px', opacity: 0.7 }}>
            {formatDate(message.timestamp)}
          </div>
        </div>
      ))}
      {isTyping && (
        <div className="chatbot-typing-indicator">
          AI is typing
          <div className="chatbot-typing-dots">
            <div className="chatbot-typing-dot"></div>
            <div className="chatbot-typing-dot"></div>
            <div className="chatbot-typing-dot"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagesList;