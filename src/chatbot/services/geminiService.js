import knowledgeBase from '../data/knowledgeBase.json';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

// Format knowledge base as a readable string
const formatKnowledgeBase = () => {
  let formatted = "KNOWLEDGE BASE:\n\n";

  Object.keys(knowledgeBase).forEach(category => {
    formatted += `\n=== ${knowledgeBase[category].title.toUpperCase()} ===\n\n`;
    knowledgeBase[category].content.forEach(item => {
      formatted += `Topic: ${item.topic}\n${item.info}\n\n`;
    });
  });

  return formatted;
};

// Create the system prompt with knowledge base
const createSystemPrompt = () => {
  return `You are a helpful fitness assistant chatbot for a fitness tracking application. Your role is to answer user questions ONLY based on the knowledge base provided below.

IMPORTANT RULES:
1. Answer questions ONLY using information from the knowledge base below
2. If a question cannot be answered from the knowledge base, politely say: "I don't have that information in my knowledge base. I can help you with questions about nutrition, workouts, and fitness goals based on what I know."
3. Be friendly, encouraging, and supportive
4. Keep answers concise but informative
5. If relevant, suggest related topics from the knowledge base the user might be interested in
6. Do not make up information or provide advice outside the knowledge base

${formatKnowledgeBase()}

Now, please answer the user's fitness-related questions based solely on the above knowledge base.`;
};

export const sendMessage = async (userMessage, conversationHistory = []) => {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file');
  }

  try {
    // Build the conversation context
    const systemPrompt = createSystemPrompt();

    // Format conversation for Gemini API
    const contents = [
      {
        parts: [{ text: systemPrompt }]
      },
      ...conversationHistory.map(msg => ({
        parts: [{ text: msg.text }]
      })),
      {
        parts: [{ text: userMessage }]
      }
    ];

    const requestBody = {
      contents: [contents[contents.length - 1]], // Send only the latest message with system context
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        topP: 0.8,
        topK: 40
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    console.log('🔍 DEBUG: API URL:', GEMINI_API_URL);
    console.log('🔍 DEBUG: API Key (first 10 chars):', GEMINI_API_KEY?.substring(0, 10) + '...');
    console.log('🔍 DEBUG: Request Body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log('🔍 DEBUG: Response status:', response.status);
    console.log('🔍 DEBUG: Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('🔍 DEBUG: Full error response:', JSON.stringify(errorData, null, 2));
      throw new Error(errorData.error?.message || 'Failed to get response from Gemini');
    }

    const data = await response.json();
    console.log('🔍 DEBUG: Success response:', JSON.stringify(data, null, 2));

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response generated');
    }

    const candidate = data.candidates[0];
    if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
      throw new Error('Invalid response format: ' + JSON.stringify(candidate));
    }

    const aiResponse = candidate.content.parts[0].text;
    return aiResponse;

  } catch (error) {
    console.error('❌ Error calling Gemini API:', error);
    throw error;
  }
};

// Helper function to check if API key is configured
export const isApiKeyConfigured = () => {
  return !!GEMINI_API_KEY;
};
