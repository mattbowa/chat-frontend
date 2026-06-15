"use client";

import { useEffect, useState } from "react";
import { getSettings, updateSettings } from "@/lib/api";

type Settings = {
  system_prompt: string;
  model: string;
  temperature: number;
  top_k_chunks: number;
  max_response_tokens: number;
  fallback_message: string;
  suggested_questions: string[];
  bot_name: string;
  primary_color: string;
  logo_url: string | null;
};

const COLORS = ["#2563eb", "#7c3aed", "#059669", "#dc2626", "#d97706", "#0891b2", "#111827"];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");

  useEffect(() => {
    getSettings().then(({ data }) => setSettings(data));
  }, []);

  const save = async () => {
    if (!settings) return;
    setSaving(true);
    await updateSettings(settings);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (!settings) return <div className="p-10 text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Bot Settings</h1>

      {/* Branding */}
      <div className="bg-white rounded-xl shadow p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Branding</h2>

        <div>
          <label className="block text-sm font-medium mb-1">Bot name</label>
          <input
            type="text"
            value={settings.bot_name}
            onChange={(e) => setSettings({ ...settings, bot_name: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Chat bubble color</label>
          <div className="flex gap-2 flex-wrap">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSettings({ ...settings, primary_color: color })}
                className="w-8 h-8 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: color,
                  borderColor: settings.primary_color === color ? "#000" : "transparent",
                }}
              />
            ))}
            <input
              type="color"
              value={settings.primary_color}
              onChange={(e) => setSettings({ ...settings, primary_color: e.target.value })}
              className="w-8 h-8 rounded-full border cursor-pointer"
              title="Custom color"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">Selected: {settings.primary_color}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Logo URL <span className="text-gray-400">(optional)</span></label>
          <input
            type="url"
            placeholder="https://yourcompany.com/logo.png"
            value={settings.logo_url ?? ""}
            onChange={(e) => setSettings({ ...settings, logo_url: e.target.value || null })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bot behaviour */}
      <div className="bg-white rounded-xl shadow p-6 space-y-5">
        <h2 className="font-semibold text-gray-800">Bot behaviour</h2>

        <div>
          <label className="block text-sm font-medium mb-1">System prompt</label>
          <p className="text-xs text-gray-400 mb-2">Defines your bot's persona, tone, and restrictions.</p>
          <textarea
            rows={5}
            value={settings.system_prompt}
            onChange={(e) => setSettings({ ...settings, system_prompt: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Fallback message</label>
          <p className="text-xs text-gray-400 mb-2">Shown when the bot can't find relevant information.</p>
          <textarea
            rows={2}
            value={settings.fallback_message}
            onChange={(e) => setSettings({ ...settings, fallback_message: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Suggested questions</label>
          <p className="text-xs text-gray-400 mb-2">Clickable prompts shown in the widget when no answer is found (or on first open).</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {settings.suggested_questions.map((q, i) => (
              <span
                key={i}
                className="flex items-center gap-1 bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full border border-blue-200"
              >
                {q}
                <button
                  type="button"
                  onClick={() => setSettings({
                    ...settings,
                    suggested_questions: settings.suggested_questions.filter((_, idx) => idx !== i),
                  })}
                  className="ml-0.5 text-blue-400 hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && newQuestion.trim()) {
                  e.preventDefault();
                  setSettings({ ...settings, suggested_questions: [...settings.suggested_questions, newQuestion.trim()] });
                  setNewQuestion("");
                }
              }}
              placeholder="Type a question and press Enter"
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => {
                if (newQuestion.trim()) {
                  setSettings({ ...settings, suggested_questions: [...settings.suggested_questions, newQuestion.trim()] });
                  setNewQuestion("");
                }
              }}
              className="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Temperature <span className="text-gray-400">({settings.temperature})</span>
            </label>
            <input
              type="range" min={0} max={1} step={0.05}
              value={settings.temperature}
              onChange={(e) => setSettings({ ...settings, temperature: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Chunks retrieved ({settings.top_k_chunks})
            </label>
            <input
              type="range" min={1} max={20} step={1}
              value={settings.top_k_chunks}
              onChange={(e) => setSettings({ ...settings, top_k_chunks: parseInt(e.target.value) })}
              className="w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Max response tokens</label>
          <input
            type="number" min={256} max={4096}
            value={settings.max_response_tokens}
            onChange={(e) => setSettings({ ...settings, max_response_tokens: parseInt(e.target.value) })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        onClick={save}
        disabled={saving}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {saved ? "Saved!" : saving ? "Saving..." : "Save settings"}
      </button>
    </div>
  );
}
