"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/lib/api";
import { Check, Copy } from "lucide-react";

export default function SnippetPage() {
  const [slug, setSlug] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    getMe().then(({ data }) => setSlug(data.tenant_slug));
  }, []);

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!slug) return <div className="p-10 text-gray-400 text-sm">Loading...</div>;

  const scriptSnippet = `<script src="https://zebboy.com/widget.js" data-slug="${slug}" defer></script>`;
  const iframeSnippet = `<iframe
  src="https://zebboy.com/widget/${slug}"
  width="400"
  height="600"
  frameborder="0"
  allow="clipboard-write"
></iframe>`;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Embed your chatbot</h1>
        <p className="text-gray-500 text-sm mt-1">
          Paste one of these snippets into your website's HTML to add your chatbot.
        </p>
      </div>

      {/* Option 1 — Script tag */}
      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <div>
          <h2 className="font-semibold">Option 1 — Script tag (recommended)</h2>
          <p className="text-sm text-gray-500">
            Adds a floating chat bubble to the bottom-right of your site. Paste before{" "}
            <code className="bg-gray-100 px-1 rounded text-xs">&lt;/body&gt;</code>.
          </p>
        </div>
        <div className="relative">
          <pre className="bg-gray-950 text-green-400 text-xs p-4 rounded-lg overflow-x-auto">
            {scriptSnippet}
          </pre>
          <button
            onClick={() => copy(scriptSnippet, "script")}
            className="absolute top-2 right-2 p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
          >
            {copied === "script" ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Option 2 — iframe */}
      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <div>
          <h2 className="font-semibold">Option 2 — Inline iframe</h2>
          <p className="text-sm text-gray-500">
            Embed the chat directly in a section of your page.
          </p>
        </div>
        <div className="relative">
          <pre className="bg-gray-950 text-green-400 text-xs p-4 rounded-lg overflow-x-auto">
            {iframeSnippet}
          </pre>
          <button
            onClick={() => copy(iframeSnippet, "iframe")}
            className="absolute top-2 right-2 p-1.5 rounded bg-gray-800 hover:bg-gray-700 text-gray-300 transition"
          >
            {copied === "iframe" ? <Check size={14} /> : <Copy size={14} />}
          </button>
        </div>
      </div>

      {/* Slug info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
        Your chatbot slug is <strong>{slug}</strong>. Your widget is live at{" "}
        <code className="bg-blue-100 px-1 rounded">
          https://zebboy.com/widget/{slug}
        </code>
      </div>
    </div>
  );
}
