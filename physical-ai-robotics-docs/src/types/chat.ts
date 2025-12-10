// src/types/chat.ts - TypeScript interfaces for chat entities

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'error'; // Only applicable for user messages
}

export interface ConversationSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  lastActiveAt: Date;
  isActive: boolean;
}