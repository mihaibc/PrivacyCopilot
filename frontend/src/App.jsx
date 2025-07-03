
import React, { useRef, useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import AppShell from "./components/AppShell";

// Theme utility
function setTheme(theme) {
  const root = document.documentElement;
  root.classList.remove("theme-dark", "theme-light");
  if (theme === "dark") root.classList.add("theme-dark");
  else if (theme === "light") root.classList.add("theme-light");
  else {
    // System
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      root.classList.add("theme-dark");
    } else {
      root.classList.add("theme-light");
    }
  }
}
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




export default function App() {
  return <AppShell />;
}
