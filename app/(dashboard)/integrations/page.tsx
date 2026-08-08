"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Trash2, CheckCircle2, XCircle, Loader2, Globe } from "lucide-react";
import { listIntegrations, upsertWebsite, triggerSync, deleteIntegration } from "@/lib/api";

type Integration = {
  id: string;
  type: string;
  status: string;
  last_synced_at: string | null;
  error_message: string | null;
  site_url: string | null;
  connected: boolean;
};

const STATUS_BADGE: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  idle: { label: "Not synced", className: "bg-gray-100 text-gray-600", icon: null },
  syncing: { label: "Crawling…", className: "bg-blue-50 text-blue-600", icon: <Loader2 size={12} className="animate-spin" /> },
  ready: { label: "Synced", className: "bg-green-50 text-green-700", icon: <CheckCircle2 size={12} /> },
  error: { label: "Error", className: "bg-red-50 text-red-600", icon: <XCircle size={12} /> },
};

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [siteUrl, setSiteUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const website = integrations.find((i) => i.type === "website") ?? null;

  useEffect(() => {
    load();
  }, []);

  // Poll while syncing
  useEffect(() => {
    if (website?.status !== "syncing") return;
    const timer = setInterval(load, 3000);
    return () => clearInterval(timer);
  }, [website?.status]);

  async function load() {
    const { data } = await listIntegrations();
    setIntegrations(data);
  }

  function flash(text: string, ok: boolean) {
    setMessage({ text, ok });
    setTimeout(() => setMessage(null), 3000);
  }

  async function handleSaveAndSync() {
    if (!siteUrl.trim()) {
      flash("Enter your website URL.", false);
      return;
    }
    setSaving(true);
    try {
      const { data: saved } = await upsertWebsite({ site_url: siteUrl.trim() });
      setIntegrations((prev) => {
        const rest = prev.filter((i) => i.type !== "website");
        return [...rest, saved];
      });
      const { data: syncing } = await triggerSync(saved.id);
      setIntegrations((prev) => prev.map((i) => (i.id === syncing.id ? syncing : i)));
      flash("Crawl started — your pages will appear in Documents shortly.", true);
    } catch (e: any) {
      flash(e?.response?.data?.detail ?? "Something went wrong.", false);
    }
    setSaving(false);
  }

  async function handleSync() {
    if (!website) return;
    try {
      const { data } = await triggerSync(website.id);
      setIntegrations((prev) => prev.map((i) => (i.id === data.id ? data : i)));
      flash("Crawl started.", true);
    } catch {
      flash("Could not start crawl.", false);
    }
  }

  async function handleDisconnect() {
    if (!website || !confirm("Disconnect your website? Crawled pages stay in Documents until the next sync — delete them there if needed.")) return;
    await deleteIntegration(website.id);
    setIntegrations((prev) => prev.filter((i) => i.type !== "website"));
    flash("Website disconnected.", true);
  }

  const badge = STATUS_BADGE[website?.status ?? "idle"];

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Integrations</h1>
      <p className="text-sm text-gray-500">
        Connect your website to automatically crawl its pages into your chatbot's knowledge base.
      </p>

      {/* Website crawler card */}
      <div className="bg-white rounded-xl shadow p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
              <Globe size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Website</p>
              {website?.site_url && (
                <p className="text-xs text-gray-400">{website.site_url}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {badge.icon}
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badge.className}`}>
              {badge.label}
            </span>
          </div>
        </div>

        {website?.last_synced_at && (
          <p className="text-xs text-gray-400">
            Last crawled {new Date(website.last_synced_at).toLocaleString()}
          </p>
        )}

        {website?.status === "error" && website.error_message && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2">
            {website.error_message}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">
            Website URL
          </label>
          <input
            type="text"
            placeholder="https://yourcompany.com"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            We'll read your sitemap.xml if you have one, or follow links from your homepage (up to 40 pages). Each page becomes a document your bot can answer from.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handleSaveAndSync}
            disabled={saving || website?.status === "syncing"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {saving || website?.status === "syncing" ? "Crawling…" : website?.connected ? "Save & Re-crawl" : "Connect & Crawl"}
          </button>

          {website?.connected && website.status !== "syncing" && (
            <button
              onClick={handleSync}
              className="flex items-center gap-1.5 border px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              <RefreshCw size={14} />
              Re-crawl now
            </button>
          )}

          {website && (
            <button
              onClick={handleDisconnect}
              className="flex items-center gap-1.5 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-50 transition"
            >
              <Trash2 size={14} />
              Disconnect
            </button>
          )}
        </div>
      </div>

      {message && (
        <div
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-lg text-sm font-medium shadow-lg text-white transition-all ${
            message.ok ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
