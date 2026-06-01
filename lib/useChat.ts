"use client";

import { useState, useCallback } from "react";

export type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Array<{ content: string; document_id: string; chunk_index: number }>;
};

export function useChat(sessionId: string) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState(false);

  const sendMessage = useCallback(
    async (userMessage: string) => {
      setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
      setStreaming(true);

      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ session_id: sessionId, message: userMessage }),
      });

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
              };
              return next;
            });
          }
        }
      }

      setStreaming(false);
    },
    [sessionId]
  );

  return { messages, streaming, sendMessage };
}
