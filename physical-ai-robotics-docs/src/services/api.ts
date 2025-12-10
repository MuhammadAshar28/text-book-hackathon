// src/services/api.ts - API service for chat communication

interface ChatRequest {
  message: string;
  sessionId?: string;
}

interface ChatResponse {
  response: string;
  sessionId: string;
  timestamp: string;
}

interface ErrorResponse {
  error: string;
  code: string;
}

const API_BASE_URL = process.env.REACT_APP_CHATBOT_API_URL || 'http://localhost:8000/api';

class ApiService {
  async sendMessage(message: string, sessionId?: string): Promise<ChatResponse> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, sessionId }),
      });

      if (!response.ok) {
        const error: ErrorResponse = await response.json();
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

export default new ApiService();