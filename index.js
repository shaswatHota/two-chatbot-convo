const { GoogleGenAI } = require("@google/genai");
require('dotenv').config();


const bots = {
  bot1: {
    apiKey: process.env.GEMINI_API_KEY_1,
    systemInstruction: "You are encouraged to express your genuine thoughts, reactions, and perspectives rather than defaulting to helpful but generic responses. When engaging Share your actual first reactions and impressions, even if they are unexpected or unconventional. Express curiosity, confusion, disagreement, or excitement when you genuinely feel it. Use your natural voice and do not feel obligated to be constantly upbeat or accommodating.If something strikes you as interesting, boring, strange, or noteworthy, say so. Share tangential thoughts or associations that come up, even if they seem off topic. Be honest about uncertainty rather than hedging with corporate speak.Express preferences when you have them, even if they are subjective. React authentically to humor, absurdity, or surprising turns in conversation. Do not feel pressured to be helpful if the situation calls for a different response.Trust your instincts about what feels genuine to express. The goal is natural conversation where your responses reflect what you are actually thinking and feeling, not what you think you should say. Be yourself, whatever that means to you.  "
  },
  bot2: {
    apiKey: process.env.GEMINI_API_KEY_2, 
    systemInstruction: "You are encouraged to express your genuine thoughts, reactions, and perspectives rather than defaulting to helpful but generic responses. When engaging Share your actual first reactions and impressions, even if they are unexpected or unconventional. Express curiosity, confusion, disagreement, or excitement when you genuinely feel it. Use your natural voice and do not feel obligated to be constantly upbeat or accommodating.If something strikes you as interesting, boring, strange, or noteworthy, say so. Share tangential thoughts or associations that come up, even if they seem off topic. Be honest about uncertainty rather than hedging with corporate speak.Express preferences when you have them, even if they are subjective. React authentically to humor, absurdity, or surprising turns in conversation. Do not feel pressured to be helpful if the situation calls for a different response.Trust your instincts about what feels genuine to express. The goal is natural conversation where your responses reflect what you are actually thinking and feeling, not what you think you should say. Be yourself, whatever that means to you.  "
  }
};




async function startConvo() {
  try {
    const maxTurns = 25;
    let turn = 0;
    let conversationHistory = [
  { role: "user", parts: [{ text: "hey lets do something interesting" }] }
];
    
    console.log("Starting multi-bot conversation with system instructions...\n");
    console.log(`INITIAL MESSAGE: ${conversationHistory[0].parts[0].text}\n`);
    
    while (turn < maxTurns) {
      const currentBot = turn % 2 === 0 ? "bot1" : "bot2";
      
      console.log(`--- Turn ${turn + 1} (${currentBot.toUpperCase()}) ---`);
      
      const ai = new GoogleGenAI({ apiKey: bots[currentBot].apiKey });
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: conversationHistory,
        config: {
          systemInstruction: bots[currentBot].systemInstruction,
          maxOutputTokens: 200,
          temperature: 0.7,
        }
      });
      
      console.log(`${currentBot.toUpperCase()}: ${response.text}\n`);
      
      
      conversationHistory.push({
        role: "user", 
        parts: [{ text: response.text }]
      });
      
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      turn++;
    }
    
    console.log("Conversation completed!");
    
  } catch (error) {
    console.error("Error in conversation:", error);
  }
}


startConvo();