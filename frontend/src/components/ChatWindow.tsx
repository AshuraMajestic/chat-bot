import { useEffect, useState } from "react";
import { type Message } from "../type";
import {
  createConversation,
  getMessages,
  sendMessage,
} from "../services/api";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

const STORAGE_KEY = "chat_conversation_id";

export default function ChatWindow() {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Load or create conversation
  useEffect(() => {
    const storedId = localStorage.getItem(STORAGE_KEY);

    if (storedId) {
      setConversationId(storedId);
      getMessages(storedId).then(setMessages);
    } else {
      createConversation().then((conv) => {
        localStorage.setItem(STORAGE_KEY, conv.id);
        setConversationId(conv.id);
      });
    }
  }, []);

  const handleSend = async (text: string) => {
    if (!conversationId) return;

    const userMsg = await sendMessage(conversationId, text, "USER");
    setMessages((prev) => [...prev, userMsg]);

    // MOCK AI reply (backend will later generate)
    const aiMsg = await sendMessage(
      conversationId,
      `Thanks for contacting support. Regarding "${text}", our team will assist you shortly.`,
      "AI"
    );
    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f9fafb",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "16px",
          background: "#111827",
          color: "white",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        🛒 E-Commerce Help Desk
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          padding: "16px",
        }}
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "12px",
          borderTop: "1px solid #e5e7eb",
          background: "white",
        }}
      >
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
