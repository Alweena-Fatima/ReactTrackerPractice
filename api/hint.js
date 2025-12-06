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
        You are a backend API. Output ONLY valid JSON. No markdown. No explanation.

        Return this JSON exactly:
        {
        "hint": "",
        "pseudoCode": "",
        "complexity": ""
        }

        Rules:
        1. "hint": one line only.
        2. "pseudoCode":
        - 5–10 lines max
        - No comments
        - No classes, no full functions
        - No assumptions like "parents map exists"
        - No Java code syntax that compiles — only high-level steps
        - No BFS/DFS full code structure, only simplified steps
        - Must NOT include initializations like "Queue q = ..." or full loops unless necessary.
        - Pseudocode MUST look like: 
            set x = 0
            loop i from 0 to n
                if condition
                    update value
            return result
        3. "complexity": one short line like "O(n), O(1)"
        4. Output pure JSON. Nothing else.

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