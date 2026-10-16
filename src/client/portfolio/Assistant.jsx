import { useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { apiUrl } from "../config/api";
import { Action } from "./Primitives";

const prompts = [
  "Give me a 30-second overview",
  "Tell me about Isoliq Inno",
  "What did he build for his father?",
];
export default function Assistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const abort = useRef(null);
  const scroll = useRef(null);
  useEffect(() => () => abort.current?.abort(), []);
  useEffect(() => {
    scroll.current?.scrollTo({
      top: scroll.current.scrollHeight,
      behavior: "instant",
    });
  }, [messages, busy]);
  async function send(text) {
    if (!text.trim() || busy) return;
    const question = text.trim().slice(0, 2000);
    const history = messages
      .map(({ role, text }) => ({ role, text }))
      .slice(-10);
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setBusy(true);
    setError("");
    const controller = new AbortController();
    abort.current = controller;
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
      const response = await fetch(apiUrl("/api/ai/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok || !result.reply) throw new Error("unavailable");
      if (!controller.signal.aborted)
        setMessages((m) => [...m, { role: "model", text: result.reply }]);
    } catch {
      if (scroll.current?.isConnected)
        setError(
          "The assistant is unavailable right now. My résumé and project pages have the same background information.",
        );
    } finally {
      clearTimeout(timeout);
      if (scroll.current?.isConnected) setBusy(false);
    }
  }
  return (
    <div className="assistant">
      <h2>
        A little <em>background.</em>
      </h2>
      <p className="assistant-intro">
        Ask about my projects, skills, or experience. This assistant uses Gemini
        with my portfolio context; it isn’t the Isoliq model.
      </p>
      <div
        className="assistant-messages"
        ref={scroll}
        role="log"
        aria-label="Conversation"
        aria-live="polite"
      >
        {messages.length === 0 && (
          <div className="assistant-welcome">What would you like to know?</div>
        )}
        {messages.map((message, i) => (
          <div className={`chat-message ${message.role}`} key={i}>
            <span className="mono">
              {message.role === "user" ? "YOU" : "PORTFOLIO ASSISTANT"}
            </span>
            <p>{message.text}</p>
          </div>
        ))}
        {busy && (
          <p className="thinking">
            <Loader2 size={16} className="spin" aria-hidden="true" />
            Looking through my portfolio…
          </p>
        )}
        {error && (
          <div className="assistant-error" role="status">
            <p>{error}</p>
            <Action href="/resume.html" external>
              View résumé
            </Action>
          </div>
        )}
      </div>
      <div className="suggested-prompts">
        {prompts.map((prompt) => (
          <button disabled={busy} key={prompt} onClick={() => send(prompt)}>
            {prompt}
          </button>
        ))}
      </div>
      <form
        className="assistant-input"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <label className="sr-only" htmlFor="assistant-message">
          Ask about Priyank’s work
        </label>
        <input
          id="assistant-message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={2000}
          placeholder="Ask about my work…"
          autoComplete="off"
          disabled={busy}
        />
        <button
          className="icon-button"
          aria-label="Send question"
          disabled={busy || !input.trim()}
        >
          <Send size={20} aria-hidden="true" />
        </button>
      </form>
      <p className="assistant-note">
        AI can make mistakes. Follow the project links to verify details.
      </p>
    </div>
  );
}
