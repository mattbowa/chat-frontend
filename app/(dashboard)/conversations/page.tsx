"use client";

import { useEffect, useState } from "react";
import { listSessions, getSession } from "@/lib/api";
import { MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Session = { session_id: string; message_count: number; last_message_at: string };
type Message = { id: string; role: string; content: string; created_at: string };

export default function ConversationsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  useEffect(() => {
    listSessions().then(({ data }) => setSessions(data));
  }, []);

  const toggle = async (sessionId: string) => {
    if (expanded === sessionId) {
      setExpanded(null);
      return;
    }
    setExpanded(sessionId);
    if (!messages[sessionId]) {
      const { data } = await getSession(sessionId);
      setMessages((prev) => ({ ...prev, [sessionId]: data }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Conversations</h1>

      {sessions.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
          <MessageSquare size={28} className="text-gray-300" />
          <p>No conversations yet — share your widget to start getting chats</p>
        </div>
      )}

      <div className="space-y-2">
        {sessions.map((s) => {
          const isOpen = expanded === s.session_id;
          const msgs = messages[s.session_id] ?? [];
          const preview = msgs.find((m) => m.role === "user")?.content ?? "Conversation";

          return (
            <div key={s.session_id} className="bg-white rounded-xl shadow overflow-hidden">
              <button
                onClick={() => toggle(s.session_id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <MessageSquare size={16} className="text-blue-400 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{preview}</p>
                    <p className="text-xs text-gray-400">
                      {s.message_count} messages · {new Date(s.last_message_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </button>

              {isOpen && (
                <div className="border-t bg-gray-50 px-5 py-4 space-y-3 max-h-96 overflow-y-auto">
                  {msgs.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${
                        msg.role === "user"
                          ? "bg-blue-600 text-white rounded-br-sm"
                          : "bg-white border text-gray-800 rounded-bl-sm shadow-sm"
                      }`}>
                        {msg.role === "assistant"
                          ? <ReactMarkdown>{msg.content}</ReactMarkdown>
                          : msg.content}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
