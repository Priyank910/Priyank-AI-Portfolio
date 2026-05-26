import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X } from "lucide-react";
import { apiUrl } from "../config/api.js";

const MAX_MESSAGE_LENGTH = 2000;

const SUGGESTED_PROMPTS = [
  "Summarize Priyank in 30 seconds",
  "Explain his AI experience",
  "What projects has he built?",
  "Why should we hire him?",
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-2">
      <span className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </span>
      <span className="text-white/60 text-[12px] font-sans">
        Priyank AI is thinking...
      </span>
    </div>
  );
}

export default function AIChatBot({
  initialMessage,
  isOpenExternal,
  onCloseExternal,
  isInline = false,
}) {
  const [isOpen, setIsOpen] = useState(isInline);
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "model",
      text: "Hello. I am Priyank's AI Assistant. I have been trained on his resume, projects, and skills. Ask me anything about his expertise or choose a prompt below.",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);
  const chatEndRef = useRef(null);
  const initialMessageSent = useRef(false);

  useEffect(() => {
    if (isOpenExternal !== undefined && isOpenExternal) {
      setIsOpen(true);
    }
  }, [isOpenExternal]);

  const scrollChatToBottom = useCallback((behavior = "smooth") => {
    const container = chatBodyRef.current;
    if (!container) return;
    container.scrollTo({
      top: container.scrollHeight,
      behavior,
    });
  }, []);

  useEffect(() => {
    scrollChatToBottom(isInline ? "auto" : "smooth");
  }, [messages, isLoading, isInline, scrollChatToBottom]);

  const handleSendMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: text.slice(0, MAX_MESSAGE_LENGTH),
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages
        .filter((msg) => msg.id !== "welcome")
        .map((msg) => ({
          role: msg.role === "model" ? "model" : "user",
          text: msg.text,
        }));

      const res = await fetch(apiUrl("/api/ai/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text.slice(0, MAX_MESSAGE_LENGTH),
          history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            "The AI assistant is temporarily unavailable. Please try again in a moment.",
        );
      }

      const assistantMessage = {
        id: crypto.randomUUID(),
        role: "model",
        text:
          data.reply ||
          "I could not generate a response. Please try another question about Priyank's experience or projects.",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "model",
          text:
            err.message ||
            "The AI assistant is temporarily unavailable. Please browse the site or use the contact form to reach Priyank directly.",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  useEffect(() => {
    if (initialMessage && isOpen && !initialMessageSent.current) {
      initialMessageSent.current = true;
      handleSendMessage(initialMessage);
      if (onCloseExternal) {
        onCloseExternal();
      }
    }
  }, [initialMessage, isOpen, handleSendMessage, onCloseExternal]);

  const renderContent = () => (
    <div
      className={`flex flex-col bg-[#0F0F0F] rounded-2xl border border-white/10 shadow-2xl overflow-hidden ${
        isInline ? "w-full h-[min(540px,70vh)]" : "h-[min(600px,calc(100vh-6rem))] w-full"
      }`}
    >
      <div className="px-4 sm:px-6 py-3.5 border-b border-white/5 flex items-center justify-between bg-zinc-900/50 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xs font-semibold tracking-wide text-white/80 uppercase">
            Recruiter AI Assistant
          </span>
        </div>
        <span className="text-[10px] text-white/30 font-mono">v1.0.4 - ONLINE</span>
      </div>

      <div
        ref={chatBodyRef}
        data-lenis-prevent
        className="flex-1 min-h-0 px-4 sm:px-5 py-4 sm:py-5 space-y-4 overflow-y-auto overscroll-contain font-mono text-[13px] bg-[#09090b] scroll-smooth"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"} gap-1.5`}
          >
            <div
              className={`px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl leading-relaxed max-w-[92%] sm:max-w-[85%] ${
                msg.role === "user"
                  ? "bg-white text-black font-sans font-medium rounded-tl-xl rounded-bl-xl rounded-br-xl"
                  : "bg-white/5 text-white/90 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-white/5"
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
            <span className="text-[8px] text-white/20 uppercase tracking-widest px-1 font-mono">
              {msg.role === "user" ? "RECRUITER" : "AI ASSISTANT"} ({msg.timestamp})
            </span>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start gap-1.5">
            <div className="bg-white/5 text-white/60 px-4 py-3 rounded-tr-xl rounded-br-xl rounded-bl-xl border border-white/5">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={chatEndRef} className="h-px shrink-0" aria-hidden />
      </div>

      <div className="p-3 sm:p-4 border-t border-white/5 bg-black/40 space-y-2.5 sm:space-y-3 shrink-0">
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              disabled={isLoading}
              className="px-2.5 sm:px-3 py-1.5 rounded-full border border-white/5 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.05] text-[10px] text-white/40 hover:text-white/80 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {prompt}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(input);
          }}
          className="relative flex items-center"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about projects, skills, experience..."
            disabled={isLoading}
            maxLength={MAX_MESSAGE_LENGTH}
            aria-label="Message for AI recruiter assistant"
            className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 sm:py-3 px-4 pr-12 text-xs focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 text-white placeholder-white/20 transition-all font-sans disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="absolute right-2 w-8 h-8 bg-white hover:bg-gray-200 duration-200 rounded flex items-center justify-center text-black font-bold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            →
          </button>
        </form>
      </div>
    </div>
  );

  if (isInline) {
    return renderContent();
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="chat-toggle-btn"
            type="button"
            aria-label="Open recruiter AI chat"
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-2.5 bg-zinc-900/95 border border-white/10 hover:border-cyan-500/25 text-white font-medium px-4 sm:px-5 py-3 sm:py-3.5 rounded-full shadow-2xl cursor-pointer backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
          >
            <MessageSquare className="w-5 h-5 text-cyan-400" />
            <span className="text-sm tracking-tight">Chat with AI</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] sm:backdrop-blur-sm"
              onClick={() => {
                setIsOpen(false);
                if (onCloseExternal) onCloseExternal();
              }}
              aria-hidden
            />
            <motion.div
              id="chat-panel"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-[450px] px-3 pb-3 sm:px-0 sm:pb-0 shadow-2xl flex flex-col"
            >
              <div className="relative">
                <button
                  id="close-chat"
                  onClick={() => {
                    setIsOpen(false);
                    if (onCloseExternal) onCloseExternal();
                  }}
                  className="absolute top-3.5 right-3.5 z-10 p-1.5 bg-zinc-800/90 hover:bg-zinc-700 text-white/60 hover:text-white rounded-md cursor-pointer backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
                {renderContent()}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
