"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import type { ToastType } from "@/lib/toast";

type Toast = { id: number; message: string; type: ToastType };

const ICONS = {
  success: <CheckCircle size={16} className="text-green-500 shrink-0" />,
  error: <XCircle size={16} className="text-red-500 shrink-0" />,
  info: <Info size={16} className="text-blue-500 shrink-0" />,
};

const BG = {
  success: "border-green-200 bg-green-50",
  error: "border-red-200 bg-red-50",
  info: "border-blue-200 bg-blue-50",
};

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, type } = (e as CustomEvent).detail;
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
    };
    window.addEventListener("zebboy-toast", handler);
    return () => window.removeEventListener("zebboy-toast", handler);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[99999] flex flex-col gap-2 items-center">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-2 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium text-gray-800 animate-in fade-in slide-in-from-bottom-2 ${BG[t.type]}`}
        >
          {ICONS[t.type]}
          {t.message}
          <button onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}>
            <X size={14} className="text-gray-400 hover:text-gray-600 ml-1" />
          </button>
        </div>
      ))}
    </div>
  );
}
