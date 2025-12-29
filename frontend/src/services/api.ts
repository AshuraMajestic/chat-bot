import { type Message,type  Sender } from "../type";

const API_BASE = "/api";

export async function createConversation() {
  const res = await fetch(`${API_BASE}/conversations`, {
    method: "POST",
  });
  return res.json();
}

export async function getMessages(conversationId: string): Promise<Message[]> {
  const res = await fetch(
    `${API_BASE}/messages/conversation/${conversationId}`
  );
  return res.json();
}

export async function sendMessage(
  conversationId: string,
  text: string,
  sender: Sender
): Promise<Message> {
  const res = await fetch(`${API_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      conversation_id: conversationId,
      sender,
      text,
    }),
  });
  return res.json();
}
