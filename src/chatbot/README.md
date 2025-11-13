Chatbot Readme

The fitness chatbot was built using React and integrates with Google's Gemini 2.5 Flash AI API. The implementation consists of several key components working together: 
ChatWidget component: It provides a floating chat button and conversational interface with features like auto-scrolling messages, input handling, and a clean UI design
ChatContext provider that manages the global state including messages, loading status, and chat visibility using React Context AP.
GeminiService that handles all communication with the Gemini API. 

RAG needs a Vector database usually to convert knowledge base into vectors using embedding models like ADA so that answers can only come from knowledge base. We can construct the knowledge base as per the application needs.


When a user asks a question, the system creates a specialized prompt that includes the entire knowledge base and instructs the AI to answer only from that information, ensuring responses stay focused on fitness topics the app supports. 

The service sends the user's message along with recent conversation history (last 5 messages) to maintain context across multiple exchanges. The implementation includes proper error handling for API failures, loading states during AI response generation, and the ability to clear chat history. The chatbot appears as a floating button at the bottom of the web page.

Use your own GEMINI API key and put it in .env file. You can get it from https://makersuite.google.com/app/apikey
VITE_GEMINI_API_KEY=<KEY>

