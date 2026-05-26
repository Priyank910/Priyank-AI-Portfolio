import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSystemPrompt } from "../prompts/systemPrompt.js";
import portfolioContext from "../data/portfolioContext.js";

let aiClient = null;
let cachedSystemPrompt = null;

export function getGeminiClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const err = new Error("AI service is not configured.");
      err.status = 503;
      throw err;
    }

    aiClient = new GoogleGenerativeAI(apiKey);
  }

  return aiClient;
}

function getCachedSystemPrompt() {
  if (!cachedSystemPrompt) {
    cachedSystemPrompt = getSystemPrompt(portfolioContext);
  }
  return cachedSystemPrompt;
}

function formatHistoryRole(role) {
  if (role === "assistant" || role === "model") {
    return "Assistant";
  }
  return "User";
}

export async function askGemini(history, userInput) {
  const genAI = getGeminiClient();

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const systemPrompt = getCachedSystemPrompt();

  const formattedHistory = history
    .map((msg) => `${formatHistoryRole(msg.role)}: ${msg.text}`)
    .join("\n");

  const finalPrompt = `${systemPrompt}

Conversation History:
${formattedHistory || "(none)"}

User Question:
<user_query>
${userInput}
</user_query>

Answer professionally and naturally. Use only the portfolio context above.`;

  if (process.env.NODE_ENV !== "production") {
    console.log("Calling Gemini API...");
  }

  try {
    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    const text = response.text();

    return text
      .replace(/\*\*/g, "")
      .replace(/###/g, "")
      .replace(/##/g, "")
      .trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    const err = new Error(
      "The AI service is temporarily unavailable. Please try again shortly.",
    );
    err.status = 502;
    throw err;
  }
}
