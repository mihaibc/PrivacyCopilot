
import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const AI_AVATAR = (
  <span className="avatar ai-avatar" title="AI">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#6366F1"/><path d="M10 22c0-2.21 2.686-4 6-4s6 1.79 6 4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="16" cy="14" r="4" fill="#fff"/></svg>
  </span>
);
const USER_AVATAR = (
  <span className="avatar user-avatar" title="You">
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#F59E42"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="Arial" fontWeight="bold">U</text></svg>
  </span>
);

function Message({ message, isUser }) {
  return (
    <div className={`message-row ${isUser ? "user" : "ai"}`}>
      {!isUser && AI_AVATAR}
      <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>{message.text}</div>
      {isUser && USER_AVATAR}
    </div>
  );
}


export default function App() {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm your Privacy Copilot. How can I help you today?", isUser: false },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { text: input, isUser: true };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");
    setIsThinking(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        { text: "This is a mock response from your Copilot.", isUser: false },
      ]);
      setIsThinking(false);
    }, 900);
  };

  return (
    <div className="layout-root">
      <aside className="side-menu">
        <div className="side-menu-title">☰ Menu</div>
        <nav className="side-menu-nav">
          <button className="side-menu-btn">New Chat</button>
          <button className="side-menu-btn">History</button>
          <button className="side-menu-btn">Settings</button>
        </nav>
      </aside>
      <div className="chat-app">
        <header className="chat-header">
          Privacy Copilot
          <div className="profile-section">
            <span className="profile-avatar" title="Profile">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#10a37f"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="#fff" fontFamily="Arial" fontWeight="bold">PC</text></svg>
            </span>
            <span className="profile-name">User</span>
          </div>
        </header>
        <main className="chat-window">
          <div className="chat-thread">
            {messages.map((msg, i) => (
              <Message key={i} message={msg} isUser={msg.isUser} />
            ))}
            {isThinking && (
              <div className="message-row ai thinking">
                {AI_AVATAR}
                <div className="message-bubble ai-bubble thinking-bubble">I'm thinking<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </main>
        <form className="chat-input-bar" onSubmit={handleSend}>
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isThinking}
            autoFocus
          />
          <button className="send-btn" type="submit" disabled={isThinking || !input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
