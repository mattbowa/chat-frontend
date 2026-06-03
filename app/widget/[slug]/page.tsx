"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { usePublicChat } from "@/lib/usePublicChat";
import { Send, Moon, Sun } from "lucide-react";

function getOrCreateSessionId(): string {
  const key = "zebboy_session_id";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

function getStoredEmail(): string | null {
  return sessionStorage.getItem("zebboy_visitor_email");
}

function storeEmail(email: string): void {
  sessionStorage.setItem("zebboy_visitor_email", email);
}

type Branding = { bot_name: string; primary_color: string; logo_url: string | null };

export default function WidgetPage() {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const [sessionId] = useState(() =>
    typeof window !== "undefined" ? getOrCreateSessionId() : crypto.randomUUID()
  );
  const [visitorEmail, setVisitorEmail] = useState<string | null>(() =>
    typeof window !== "undefined" ? getStoredEmail() : null
  );
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const { messages, streaming, sendMessage } = usePublicChat(slug, sessionId, visitorEmail);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [branding, setBranding] = useState<Branding>({ bot_name: "AI Assistant", primary_color: "#2563eb", logo_url: null });
  const [dark, setDark] = useState(searchParams.get("theme") === "dark");

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
    fetch(`${apiBase}/public/settings/${slug}`)
      .then((r) => r.json())
      .then((d) => setBranding({ bot_name: d.bot_name, primary_color: d.primary_color, logo_url: d.logo_url }))
      .catch(() => null);
  }, [slug]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submitEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed.includes("@")) {
      setEmailError("Please enter a valid email.");
      return;
    }
    storeEmail(trimmed);
    setVisitorEmail(trimmed);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || streaming) return;
    const msg = input.trim();
    setInput("");
    await sendMessage(msg);
  };

  const bg = dark ? "bg-gray-900" : "bg-white";
  const msgBg = dark ? "bg-gray-800" : "bg-gray-50";
  const inputBg = dark ? "bg-gray-900 border-gray-700" : "bg-white border-t";
  const bubbleBg = dark ? "bg-gray-700 border-gray-600 text-gray-100" : "bg-white border text-gray-800";

  if (!visitorEmail) {
    return (
      <div className={`flex flex-col h-screen font-sans ${bg}`}>
        <title>{branding.bot_name}</title>
        <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ backgroundColor: branding.primary_color }}>
          {branding.logo_url ? (
            <img src={branding.logo_url} alt="logo" className="w-8 h-8 rounded-full object-cover bg-white/20" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
              {slug[0].toUpperCase()}
            </div>
          )}
          <p className="text-sm font-semibold">{branding.bot_name}</p>
        </div>
        <div className={`flex-1 flex flex-col items-center justify-center px-6 ${msgBg}`}>
          <p className="text-3xl mb-3">👋</p>
          <p className="font-semibold text-lg mb-1">Welcome!</p>
          <p className="text-sm text-gray-500 text-center mb-6">Enter your email to start chatting.</p>
          <form onSubmit={submitEmail} className="w-full max-w-xs space-y-3">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => { setEmailInput(e.target.value); setEmailError(""); }}
              placeholder="you@example.com"
              className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            {emailError && <p className="text-xs text-red-500 text-center">{emailError}</p>}
            <button
              type="submit"
              className="w-full py-2 rounded-full text-white text-sm font-medium transition hover:opacity-90"
              style={{ backgroundColor: branding.primary_color }}
            >
              Start chatting
            </button>
          </form>
        </div>
        <div className="text-center py-1.5 text-xs text-gray-400 bg-white border-t">
          Powered by <span className="font-medium text-blue-500">Zebboy</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-screen font-sans ${bg}`}>
      <title>{branding.bot_name}</title>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 text-white" style={{ backgroundColor: branding.primary_color }}>
        {branding.logo_url ? (
          <img src={branding.logo_url} alt="logo" className="w-8 h-8 rounded-full object-cover bg-white/20" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
            {slug[0].toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <p className="text-sm font-semibold leading-none">{branding.bot_name}</p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.7)" }}>Online</p>
        </div>
        <button onClick={() => setDark((d) => !d)} className="text-white/70 hover:text-white">
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </div>

      {/* Messages */}
      <div className={`flex-1 overflow-y-auto px-4 py-4 space-y-3 ${msgBg}`}>
        {messages.length === 0 && (
          <div className="text-center text-gray-400 text-sm mt-8">
            <p className="text-2xl mb-2">👋</p>
            <p>Hi! Ask me anything.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : `${bubbleBg} rounded-bl-sm shadow-sm`
              }`}
            >
              {msg.role === "assistant" ? (
                <ReactMarkdown>{msg.content || "▋"}</ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={submit} className={`flex items-center gap-2 px-3 py-3 ${inputBg}`}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || streaming}
          className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-40"
        >
          <Send size={15} />
        </button>
      </form>

      {/* Powered by */}
      <div className="text-center py-1.5 text-xs text-gray-400 bg-white border-t">
        Powered by <span className="font-medium text-blue-500">Zebboy</span>
      </div>
    </div>
  );
}
