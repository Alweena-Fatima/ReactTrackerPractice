// /api/hint.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Check for the key (It will be stored safely in Vercel Dashboard)
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Server missing API key" });
  }

  // 2. Parse the User's Request
  const { problemTitle } = req.body;

  if (!problemTitle) {
    return res.status(400).json({ error: "Missing problem title" });
  }

  try {
    // 3. Call Google Gemini (Securely on the server)
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // STRICT + SHORT + SIMPLE AI PROMPT
    const prompt = `
        You are a backend API. You MUST output ONLY valid JSON. No markdown. No extra text.

        Your job is to return:
        {
        "hint": "",
        "pseudoCode": "",
        "complexity": ""
        }

        RULES:
        1. "hint": one simple, beginner-friendly line that helps remember the solution.
        2. "pseudoCode": very short Java-style pseudocode.
        - No classes
        - No imports
        - No comments
        - Only simple variable names
        - Use loops, if-else, arrays, maps as needed.
        - Keep it 5–10 lines max.
        3. "complexity": one short line (time + space), e.g., "O(n), O(1)"
        4. Absolutely NO explanation, NO natural language outside JSON.
        5. Output must be **pure JSON only**.

        Problem: ${problemTitle}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up markdown
    text = text.replace(/```json|```/g, "").trim();
    
    // Send the clean JSON back to your frontend
    return res.status(200).json(JSON.parse(text));

  } catch (error) {
    console.error("AI Error:", error);
    return res.status(500).json({ error: "Failed to generate hint" });
  }
}