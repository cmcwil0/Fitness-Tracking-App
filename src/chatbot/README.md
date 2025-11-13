Chatbot Readme

The fitness chatbot was built using React and integrates with Google's Gemini 2.5 Flash AI API. The implementation consists of several key components working together.RAG needs a Vector database usually to convert knowledge base into vectors using embedding models like ADA so that answers can only come from knowledge base. We can construct the knowledge base as per the application needs.

When a user asks a question, the system creates a specialized prompt that includes the entire knowledge base and instructs the AI to answer only from that information, ensuring responses stay focused on fitness topics the app supports. 

The service sends the user's message along with recent conversation history (last 5 messages) to maintain context across multiple exchanges. The implementation includes proper error handling for API failures, loading states during AI response generation, and the ability to clear chat history. The chatbot appears as a floating button at the bottom of the web page.

Use your own GEMINI API key and put it in .env file. You can get it from https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=<KEY>

Here are the files:

index.js - Entry point that exports all chatbot components (ChatProvider, useChatContext, ChatWidget, ChatMessage) for easy integration into the main application.

services/geminiService.js - Handles API communication with Google's Gemini AI model, formats the knowledge base into prompts, and manages conversation context with error handling and safety settings.

context/ChatContext.jsx - React context provider that manages global chat state including messages array, chat visibility, loading status, and provides functions for sending messages and clearing chat history.

components/ChatWidget.jsx - Main UI component that renders the floating chat button and chat window interface, handles user input, displays message history with auto-scrolling, and manages the chat open/close states.

components/ChatMessage.jsx - Reusable component that renders individual chat messages with appropriate styling for user vs bot messages, displays timestamps, and handles error message formatting.

data/knowledgeBase.json - Structured JSON database containing fitness-related information organized into categories (nutrition, workouts, goals, general) that the AI uses to answer user questions.
