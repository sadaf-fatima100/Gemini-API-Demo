


//   // import { GoogleGenAI } from "@google/genai";
//   import { GoogleGenerativeAI } from "@google/generative-ai";

// // Apni API key yahan paste karein
// const apiKey = import.meta.env.VITE_GEMINI_API_KEY;


// // const genAI = new GoogleGenAI({ apiKey });
// const genAI = new GoogleGenerativeAI({apiKey});

//  async function runChat(prompt) {
//   // Chat session start karna
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

//   // Optional: Generation config aur safety settings
//   const generationConfig = {
//     temperature: 1,
//     // maxOutputTokens: 2048,
//   };

//   const safetySettings = [
//     {
//       category: "HARM_CATEGORY_DANGEROUS_CONTENT",
//       threshold: "BLOCK_MEDIUM_AND_ABOVE",
//     },
//     // aur bhi categories add kar sakte hain
//   ];

//   // Chat session initialize
//   const chat = model.startChat({
//     generationConfig,
//     safetySettings,
//     history: [], // Yahan pehle ki conversation rakh sakte hain
//   });

//   // User ka prompt bhejna
//   const result = await chat.sendMessage(prompt);
//   const response = result.response;
//   console.log(response.text());
//   return response.text();
// }

// export  default runChat;

import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();

if (!apiKey) {
  throw new Error(
    "Missing Google Gemini API key. Please add VITE_GEMINI_API_KEY to your .env file"
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

async function runChat(prompt) {
  try {
    if (!prompt || typeof prompt !== "string") {
      throw new Error("Invalid prompt: Must be a non-empty string");
    }

    // Use the correct model name and API version
    const model = genAI.getGenerativeModel({ 
      // model: "gemini-1.5-pro-latest", // Updated model name
      model: "gemini-2.0-flash", // Updated model name
    });

    // For single-turn conversations (no chat history needed)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error(`Failed to get response from Gemini: ${error.message}`);
  }
}

export default runChat;