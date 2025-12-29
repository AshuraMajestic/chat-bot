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

  // Send message handler
 const handleSend = async (text: string) => {
  if (!conversationId) return;

  // USER message (optimistic)
  const tempUserMessage: Message = {
    id: crypto.randomUUID(),
    conversation_id: conversationId,
    sender: "USER",
    text,
  };

  // AI loading placeholder
  const aiLoadingMessage: Message = {
    id: "ai-loading",
    conversation_id: conversationId,
    sender: "AI",
    text: "",
  };

  setMessages((prev) => [...prev, tempUserMessage, aiLoadingMessage]);

  try {
    const response = await sendMessage(conversationId, text, "USER");

    setMessages((prev) => {
      // remove temp + loading
      const filtered = prev.filter(
        (m) => m.id !== tempUserMessage.id && m.id !== "ai-loading"
      );

      return [...filtered, response.userMessage, response.aiMessage];
    });
  } catch (error) {
    console.error("Failed to send message:", error);

    // Remove loading bubble on error
    setMessages((prev) =>
      prev.filter((m) => m.id !== "ai-loading")
    );
  }
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
        {/* Empty State */}
        {messages.length === 0 && (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              color: "#6b7280",
              padding: "20px",
            }}
          >
            <div>
              <h2
                style={{
                  marginBottom: "8px",
                  color: "#111827",
                }}
              >
                👋 Hi, I’m your E-commerce Assistant
              </h2>
              <p>
                I can help you with orders, deliveries, refunds,
                payments, and product questions.
                <br />
                Ask me anything to get started.
              </p>
            </div>
          </div>
        )}

        {/* Chat Messages */}
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
