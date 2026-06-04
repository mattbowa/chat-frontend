"use client";

import { useEffect, useState } from "react";
import { getAnalytics } from "@/lib/api";
import { MessageSquare, FileText, Zap } from "lucide-react";

type Usage = {
  plan: string;
  messages_this_month: number;
  free_tier_limit: number;
  messages_remaining: number;
  total_messages: number;
  doc_count: number;
  daily_messages: { date: string; count: number }[];
  recent_questions: { question: string; at: string }[];
};

export default function AnalyticsPage() {
  const [data, setData] = useState<Usage | null>(null);

  useEffect(() => {
    getAnalytics().then(({ data }) => setData(data));
  }, []);

  if (!data) return <div className="p-10 text-gray-400 text-sm">Loading...</div>;

  const usedPct = Math.min(100, Math.round((data.messages_this_month / data.free_tier_limit) * 100));

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* Stat cards  */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Messages this month", value: data.messages_this_month, icon: MessageSquare, color: "text-blue-600" },
          { label: "Total messages", value: data.total_messages, icon: Zap, color: "text-purple-600" },
          { label: "Documents ready", value: data.doc_count, icon: FileText, color: "text-green-600" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl shadow p-5 flex items-center gap-4">
            <div className={`${color} bg-gray-50 rounded-lg p-2`}>
              <Icon size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Free tier usage bar */}
      <div className="bg-white rounded-xl shadow p-6 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold">Free tier usage</h2>
            <p className="text-sm text-gray-500">
              {data.messages_this_month} / {data.free_tier_limit} messages this month
            </p>
          </div>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-full font-medium text-gray-600 uppercase">
            {data.plan}
          </span>

          {/* ----------------------------------------------------------------
              STRIPE (future) — replace the span above with an Upgrade button:
              <a href="/billing" className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-full font-medium hover:bg-blue-700">
                Upgrade
              </a>
          ---------------------------------------------------------------- */}
        </div>

        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all ${usedPct >= 90 ? "bg-red-500" : usedPct >= 70 ? "bg-yellow-500" : "bg-blue-500"}`}
            style={{ width: `${usedPct}%` }}
          />
        </div>
        <p className="text-xs text-gray-400">{data.messages_remaining} messages remaining</p>
      </div>

      {/* Daily chart — simple bar chart */}
      {data.daily_messages.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="font-semibold">Messages per day (last 30 days)</h2>
          <div className="flex items-end gap-[3px] h-24 overflow-x-auto pb-1">
            {data.daily_messages.map((d) => {
              const max = Math.max(...data.daily_messages.map((x) => x.count));
              const h = max > 0 ? Math.max(4, Math.round((d.count / max) * 88)) : 4;
              return (
                <div key={d.date} className="flex-shrink-0 w-4 flex flex-col items-center group relative">
                  <div
                    className="w-full bg-blue-400 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${h}px` }}
                  />
                  <span className="absolute -top-6 text-xs bg-gray-800 text-white px-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-10">
                    {d.count} on {d.date}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recent questions */}
      {data.recent_questions.length > 0 && (
        <div className="bg-white rounded-xl shadow p-6 space-y-3">
          <h2 className="font-semibold">Recent questions</h2>
          <ul className="divide-y divide-gray-100">
            {data.recent_questions.map((q, i) => (
              <li key={i} className="py-2 flex justify-between items-start gap-4">
                <p className="text-sm text-gray-700 truncate">{q.question}</p>
                <span className="text-xs text-gray-400 shrink-0">{q.at}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
