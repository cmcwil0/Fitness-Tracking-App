# Fitness AI Chatbot

A simplified RAG (Retrieval-Augmented Generation) chatbot powered by Google Gemini AI, designed to answer fitness-related questions based on a curated knowledge base.

## Features

- **Persistent Chat Widget**: Floats on all pages of the application
- **Knowledge Base Driven**: Answers questions only from the provided fitness knowledge base
- **Categories**: Nutrition, Workouts, Goals, and General Fitness
- **Clean UI**: Modern, responsive chat interface
- **Context Aware**: Maintains conversation history for better responses

## Architecture

```
chatbot/
├── components/
│   ├── ChatWidget.jsx      # Main floating chat UI
│   └── ChatMessage.jsx      # Individual message component
├── context/
│   └── ChatContext.jsx      # State management
├── data/
│   └── knowledgeBase.json   # Fitness knowledge base
├── services/
│   └── geminiService.js     # Gemini API integration
└── index.js                 # Export module
```

## Setup

### 1. Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variable

Add your API key to the `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Restart Development Server

After adding the API key, restart your dev server:

```bash
npm run dev
```

## Usage

The chatbot is automatically integrated into the app. Users will see:

1. **Chat Button**: A floating blue button in the bottom-right corner
2. **Click to Open**: Opens the chat window
3. **Ask Questions**: Type fitness-related questions
4. **Get Answers**: Receive answers based on the knowledge base
5. **Clear Chat**: Reset conversation anytime
6. **Persistent**: Available on all pages

## How It Works

1. **User Question** → Sent to Gemini API with knowledge base context
2. **Gemini Processing** → Generates answer using ONLY the knowledge base
3. **Response** → Displayed in the chat window
4. **History** → Last 5 messages maintained for context

## Knowledge Base

The chatbot can answer questions about:

### Nutrition
- Macronutrients
- Protein sources
- Pre/Post-workout nutrition
- Hydration
- Weight loss & muscle gain nutrition

### Workouts
- Beginner workout plans
- Strength training
- Cardio exercises
- HIIT workouts
- Core exercises
- Recovery
- Home workouts
- Gym equipment

### Goals
- Setting fitness goals
- Weight loss goals
- Muscle building goals
- Performance goals
- Staying motivated
- Overcoming plateaus
- Long-term sustainability

### General Fitness
- Getting started
- Exercise frequency
- Proper form
- Common mistakes
- Fitness tracking

## Updating the Knowledge Base

To add or modify knowledge:

1. Edit `src/chatbot/data/knowledgeBase.json`
2. Follow the existing structure:
   ```json
   {
     "category": {
       "title": "Category Name",
       "content": [
         {
           "topic": "Topic Name",
           "info": "Detailed information..."
         }
       ]
     }
   }
   ```
3. Save the file - changes are automatic!

## Customization

### Styling

All styles are inline in the components. To customize:
- Colors: Change hex values in component styles
- Size: Modify width/height in ChatWidget
- Position: Adjust `bottom` and `right` values

### Behavior

- **Message History**: Change `slice(-5)` in ChatContext.jsx
- **Response Length**: Modify `maxOutputTokens` in geminiService.js
- **Temperature**: Adjust in geminiService.js (0-1, higher = more creative)

## Injection into Other Apps

This chatbot is designed to be easily portable:

```jsx
// In your App.jsx
import { ChatProvider, ChatWidget } from './chatbot'

function App() {
  return (
    <ChatProvider>
      <YourApp />
      <ChatWidget />
    </ChatProvider>
  )
}
```

That's it! Just 3 lines of code.

## API Limits

Google Gemini Free Tier:
- 60 requests per minute
- 1,500 requests per day
- More than enough for personal/development use

## Troubleshooting

**Chat button doesn't appear:**
- Check browser console for errors
- Verify App.jsx includes `<ChatWidget />`

**"API key not configured" error:**
- Check `.env` file exists in project root
- Verify `VITE_GEMINI_API_KEY` is set
- Restart dev server after adding key

**Chatbot gives wrong answers:**
- Check if question is covered in knowledge base
- Update knowledge base with more information
- The AI only uses provided knowledge base content

**API errors:**
- Verify API key is valid
- Check internet connection
- Ensure you haven't exceeded API limits

## Future Enhancements

Potential improvements:
- Voice input/output
- Multi-language support
- Save conversation history
- Export chat transcripts
- Add images to knowledge base
- Integration with actual vector database
- User feedback on responses
- Analytics dashboard

## License

Part of the Fitness Tracking App project.
