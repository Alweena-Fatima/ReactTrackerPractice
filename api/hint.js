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
        You are a backend API that MUST output ONLY valid JSON.

        Keep everything SHORT and SIMPLE.

        Rules:
        1. "hint": easy and simple hint to remember in interview.
        2. "pseudoCode": Java-style, it should be easy and simple. No classes, no imports, no comments.
        3. "complexity": one short line like "O(n)" and space complexity also.
        4. NO markdown, NO chat, NO explanations, NO extra text.

        Return ONLY this JSON structure:
        {
        "hint": "",
        "pseudoCode": "",
        "complexity": ""
        }

        Problem: ${problemTitle}`
    ;

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