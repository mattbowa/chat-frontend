"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { listContactSubmissions } from "@/lib/api";

type Submission = {
  id: string;
  name: string;
  email: string;
  message: string;
  source: string;
  handled: boolean;
  created_at: string;
};

export default function InboxPage() {
  const [items, setItems] = useState<Submission[] | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    listContactSubmissions()
      .then(({ data }) => setItems(data))
      .catch((err) => {
        if (err?.response?.status === 403) setDenied(true);
        else setItems([]);
      });
  }, []);

  if (denied) {
    return (
      <div className="p-10 text-sm text-gray-500">
        This inbox is only visible to the site owner.
      </div>
    );
  }

  if (!items) return <div className="p-10 text-gray-400 text-sm">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-2xl font-bold">Inbox</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-sm text-gray-400">
          <Mail className="mx-auto mb-3 text-gray-300" size={32} />
          No contact form submissions yet.
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((s) => (
            <div key={s.id} className="bg-white rounded-xl shadow p-5 space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">{s.name}</p>
                  <a href={`mailto:${s.email}`} className="text-sm text-blue-600 hover:underline">
                    {s.email}
                  </a>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400">
                    {new Date(s.created_at).toLocaleDateString()}
                  </p>
                  {s.source === "message_limit" && (
                    <span className="inline-block mt-1 text-[10px] bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">
                      hit limit
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{s.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
