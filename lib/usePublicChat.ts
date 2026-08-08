"use client";

import { useState, useCallback } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ content: string; document_id: string; chunk_index: number }>;
  suggested_questions?: string[];
};

export function usePublicChat(slug: string, sessionId: string, visitorEmail: string | null, parentHost?: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setStreaming(true);

      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
      const res = await fetch(`${apiBase}/public/chat/${slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: userMessage, visitor_email: visitorEmail, parent_host: parentHost ?? null }),
      });

      // Errors (e.g. 429 when the monthly message limit is hit) come back as
      // JSON, not SSE — surface the detail instead of streaming a blank reply.
      if (!res.ok) {
        let detail = "Something went wrong. Please try again.";
        try {
          const body = await res.json();
          if (typeof body?.detail === "string") detail = body.detail;
        } catch {
          // non-JSON error body; keep the generic message
        }
        setMessages((prev) => [...prev, { role: "assistant", content: detail }]);
        setStreaming(false);
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const raw = decoder.decode(value);
        for (const line of raw.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = JSON.parse(line.slice(6));

          if (data.token) {
            assistantContent += data.token;
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = { role: "assistant", content: assistantContent };
              return next;
            });
          }

          if (data.done) {
            setMessages((prev) => {
              const next = [...prev];
              next[next.length - 1] = {
                role: "assistant",
                content: assistantContent,
                sources: data.sources,
                suggested_questions: data.suggested_questions ?? [],
              };
              return next;
            });
          }
        }
      }

      setStreaming(false);
    },
    [slug, sessionId, visitorEmail, parentHost]
  );

  return { messages, streaming, sendMessage };
}
