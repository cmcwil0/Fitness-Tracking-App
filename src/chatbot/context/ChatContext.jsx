import { createContext, useContext, useState, useCallback } from 'react';
import { sendMessage, isApiKeyConfigured } from '../services/geminiService';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your fitness assistant. I can help you with questions about nutrition, workouts, and fitness goals. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const sendUserMessage = useCallback(async (userMessage) => {
    if (!userMessage.trim()) return;

    // Check if API key is configured
    if (!isApiKeyConfigured()) {
      const errorMsg = {
        id: Date.now(),
        text: "Gemini API key is not configured. Please add your API key to the .env file as VITE_GEMINI_API_KEY to use the chatbot.",
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
      return;
    }

    // Add user message
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Get conversation history (last 5 messages for context)
      const recentHistory = messages.slice(-5).map(msg => ({
        text: msg.text,
        sender: msg.sender
      }));

      // Send to Gemini
      const response = await sendMessage(userMessage, recentHistory);

      // Add bot response
      const botMsg = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error sending message:', error);

      const errorMsg = {
        id: Date.now() + 1,
        text: `Sorry, I encountered an error: ${error.message}. Please try again.`,
        sender: 'bot',
        timestamp: new Date(),
        isError: true
      };

      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([
      {
        id: 1,
        text: "Hi! I'm your fitness assistant. I can help you with questions about nutrition, workouts, and fitness goals. What would you like to know?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);

  const value = {
    messages,
    isOpen,
    isLoading,
    toggleChat,
    sendUserMessage,
    clearChat
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
