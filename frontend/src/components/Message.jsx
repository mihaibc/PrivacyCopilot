import React from "react";

export default function Message({ message, isUser, AI_AVATAR, USER_AVATAR }) {
  return (
    <div className={`message-row ${isUser ? "user" : "ai"}`}>
      {!isUser && AI_AVATAR}
      <div className={`message-bubble ${isUser ? "user-bubble" : "ai-bubble"}`}>{message.text}</div>
      {isUser && USER_AVATAR}
    </div>
  );
}
