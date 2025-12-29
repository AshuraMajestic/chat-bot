import { type Message } from "../type";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "USER";

  return (
    <div
      style={{
        alignSelf: isUser ? "flex-end" : "flex-start",
        background: isUser ? "#4f46e5" : "#e5e7eb",
        color: isUser ? "#fff" : "#000",
        padding: "10px 14px",
        borderRadius: 12,
        marginBottom: 8,
        maxWidth: "70%",
      }}
    >
      {message.text}
    </div>
  );
}
