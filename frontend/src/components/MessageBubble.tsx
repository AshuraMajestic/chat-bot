import { type Message } from "../type";

export default function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "USER";
  const isLoading = message.id === "ai-loading";

  if (isLoading) {
    return (
      <div
        style={{
          alignSelf: "flex-start",
          background: "#e5e7eb",
          padding: "10px 14px",
          borderRadius: 12,
          marginBottom: 8,
          width: "120px",
        }}
      >
        <div
          style={{
            height: 10,
            width: "100%",
            background: "#d1d5db",
            borderRadius: 4,
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>
    );
  }

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
        whiteSpace: "pre-wrap",
      }}
    >
      {message.text}
    </div>
  );
}
