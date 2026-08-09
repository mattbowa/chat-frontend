"use client";

import { useState, useCallback } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ content: string; document_id: string; chunk_index: number }>;
  suggested_questions?: string[];
};

const GENERIC_ERROR = "Something went wrong. Please try again.";

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
        let detail = GENERIC_ERROR;
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
      let buffer = "";

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const replaceLast = (message: Message) =>
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = message;
          return next;
        });

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          // A network chunk can split an SSE line in half, so hold the trailing
          // partial line back until the rest of it arrives.
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = JSON.parse(line.slice(6));

            // The backend sends this when the LLM call fails after the SSE
            // response has already started — it can't return an HTTP error.
            if (data.error) {
              assistantContent = assistantContent ? `${assistantContent}\n\n${data.error}` : data.error;
              replaceLast({ role: "assistant", content: assistantContent });
            }

            if (data.token) {
              assistantContent += data.token;
              replaceLast({ role: "assistant", content: assistantContent });
            }

            if (data.done) {
              replaceLast({
                role: "assistant",
                content: assistantContent,
                sources: data.sources,
                suggested_questions: data.suggested_questions ?? [],
              });
            }
          }
        }

        // Stream closed without sending anything — e.g. the server died
        // mid-response. Don't leave an empty bubble typing forever.
        if (!assistantContent) replaceLast({ role: "assistant", content: GENERIC_ERROR });
      } catch {
        replaceLast({ role: "assistant", content: assistantContent || GENERIC_ERROR });
      } finally {
        setStreaming(false);
      }
    },
    [slug, sessionId, visitorEmail, parentHost]
  );

  return { messages, streaming, sendMessage };
}
