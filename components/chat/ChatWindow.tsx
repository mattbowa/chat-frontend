"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@/lib/useChat";
import ReactMarkdown from "react-markdown";

export default function ChatWindow({ sessionId, tenantName }: { sessionId: string; tenantName?: string }) {
  const { messages, streaming, sendMessage } = useChat(sessionId);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || streaming) return;
    const msg = input.trim();
    setInput("");
    await sendMessage(msg);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b px-4 py-3 font-semibold text-sm bg-white">
        {tenantName ?? "Chat"}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-400 text-sm mt-10">Ask anything about your documents.</p>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-sm"
                  : "bg-white border text-gray-800 rounded-bl-sm"
              }`}
            >
              <ReactMarkdown>{msg.content}</ReactMarkdown>
              {msg.sources && msg.sources.length > 0 && (
                <details className="mt-2 text-xs text-gray-400 cursor-pointer">
                  <summary>{msg.sources.length} source(s)</summary>
                  <ul className="mt-1 space-y-1">
                    {msg.sources.map((s, si) => (
                      <li key={si} className="truncate">
                        {s.kind === "qa"
                          ? `curated: ${s.content.replace(/^Q: /, "").split("\n")[0]}`
                          : `doc:${s.document_id.slice(0, 8)} chunk:${s.chunk_index}`}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
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
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
