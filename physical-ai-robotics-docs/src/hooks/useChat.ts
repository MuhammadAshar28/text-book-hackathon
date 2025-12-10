// src/hooks/useChat.ts - Custom hook for chat state management

import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, ConversationSession } from '../types/chat';
import ApiService from '../services/api';

interface UseChatReturn {
  messages: ChatMessage[];
  sendMessage: (text: string) => Promise<void>;
  isSending: boolean;
  error: string | null;
  clearConversation: () => void;
  sessionId: string | null;
}

const useChat = (): UseChatReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);

  // Initialize conversation on first load
  useEffect(() => {
    // Generate a new session ID on component mount if one doesn't exist
    if (!sessionId) {
      setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
  }, []);

  const addMessage = useCallback((message: ChatMessage) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isSending) return;

    setIsSending(true);
    setError(null);

    try {
      // Add user message to UI immediately
      const userMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        content: text,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent'
      };

      addMessage(userMessage);

      // Send to backend API
      const response = await ApiService.sendMessage(text, sessionId);

      // Add bot response to UI
      const botMessage: ChatMessage = {
        id: `msg_${Date.now() + 1}`,
        content: response.response,
        sender: 'bot',
        timestamp: new Date(response.timestamp),
        status: undefined
      };

      addMessage(botMessage);

      // Update session ID if returned from backend
      if (response.sessionId) {
        setSessionId(response.sessionId);
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
      
      // Update the user message status to error
      setMessages(prev => {
        const lastMessageIndex = prev.length - 1;
        if (lastMessageIndex >= 0 && prev[lastMessageIndex].sender === 'user') {
          const lastMessage = prev[lastMessageIndex];
          return [
            ...prev.slice(0, lastMessageIndex),
            { ...lastMessage, status: 'error' }
          ];
        }
        return prev;
      });
    } finally {
      setIsSending(false);
    }
  }, [addMessage, isSending, sessionId]);

  const clearConversation = useCallback(() => {
    setMessages([]);
    // Generate new session ID when clearing
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    setError(null);
  }, []);

  return {
    messages,
    sendMessage,
    isSending,
    error,
    clearConversation,
    sessionId
  };
};

export default useChat;