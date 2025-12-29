import ChatWindow from "./components/ChatWindow";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth:"100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f9fafb",
      }}
    >
      <ChatWindow />
    </div>
  );
}
