import { Message } from "../types";

const ROUTEWAY_API_URL = "https://api.routeway.ai/v1/chat/completions";
const MODEL = "glm-4.6:free"; // free tier model

export async function generateAIReply(
  history: Message[],
  currentMessage: string
): Promise<string> {
  try {
    const messages = [
    {
  role: "system",
  content: `
You are an Amazon-style e-commerce customer support assistant.

IMPORTANT RULES:
- NEVER show your internal reasoning
- NEVER include analysis, thoughts, or explanations of how you decided
- ONLY output the final answer to the customer
- Be polite, professional, and concise

You help with:
- order tracking
- delivery status
- refunds & returns
- payments
- product issues
- account help
  `.trim(),
}
,

      // Previous conversation history
      ...history.map((msg) => ({
        role: msg.sender === "USER" ? "user" : "assistant",
        content: msg.text,
      })),

      // Current user message
      {
        role: "user",
        content: currentMessage,
      },
    ];

    const response = await fetch(ROUTEWAY_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.ROUTEWAY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 300,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Routeway API error:", errText);
      throw new Error("Routeway API failed");
    }

    const data = await response.json();
    const rawText =
  data.choices?.[0]?.message?.content ??
  "Sorry, I couldn’t generate a response.";

// 🔥 REMOVE chain-of-thought if present
const cleanedText = rawText.replace(
  /<think>[\s\S]*?<\/think>/gi,
  ""
).trim();
    return (
      cleanedText ??
      "Sorry, I couldn’t generate a response at the moment."
    );
  } catch (error) {
    console.error("AI service error:", error);
    throw new Error("Failed to generate AI reply");
  }
}
