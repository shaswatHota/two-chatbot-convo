# AI Conversation Bot

Two Gemini AI bots talking to each other in an endless conversation.

## Setup

1. **Install dependencies**
   ```bash
   npm run dev
   ```

2. **Get API Keys**
   - Get 2 Gemini API keys (1 will work but tokens will exceed quickly)
   - Create a `.env` file in the project root:
   ```
   GEMINI_API_KEY_1=your_first_api_key_here
   GEMINI_API_KEY_2=your_second_api_key_here
   ```

3. **Run**
   ```bash
   node index.js
   ```

The bots will start talking to each other for 25 turns (configurable). Watch the conversation unfold in your terminal.