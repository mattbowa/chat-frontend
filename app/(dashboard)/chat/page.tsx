"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/lib/api";
import { usePublicChat } from "@/lib/usePublicChat";
import ReactMarkdown from "react-markdown";
import { Send } from "lucide-react";

function getSessionId() {
  const key = "zebboy_preview_session";
  let id = sessionStorage.getItem(key);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(key, id); }
  return id;
}

export default function ChatPreviewPage() {
  const [slug, setSlug] = useState<string | null>(null);
  const [sessionId] = useState(() => typeof window !== "undefined" ? getSessionId() : crypto.randomUUID());

  useEffect(() => {
    getMe().then(({ data }) => setSlug(data.tenant_slug));
  }, []);

  const { messages, streaming, sendMessage } = usePublicChat(slug ?? "", sessionId, null);
  const [input, setInput] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || streaming || !slug) return;
    const msg = input.trim();
    setInput("");
    await sendMessage(msg);
  };

  if (!slug) return <div className="p-10 text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      <div className="px-6 py-4 border-b bg-white flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold">Chat Preview</h1>
          <p className="text-sm text-gray-500">Previewing exactly what your end-users see.</p>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem("zebboy_preview_session"); window.location.reload(); }}
          className="text-xs text-gray-400 hover:text-gray-600 border rounded px-2 py-1"
        >
          New conversation
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">Ask anything about your documents.</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-white border text-gray-800 rounded-bl-sm shadow-sm"
            }`}>
              {msg.role === "assistant"
                ? <ReactMarkdown>{msg.content || "▋"}</ReactMarkdown>
                : msg.content}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="border-t p-3 flex gap-2 bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!input.trim() || streaming}
          className="w-9 h-9 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition disabled:opacity-40"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
