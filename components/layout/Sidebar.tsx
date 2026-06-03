"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FileText, Settings, MessageSquare, Code, LogOut, BarChart2, MessagesSquare } from "lucide-react";
import { getAnalytics } from "@/lib/api";

const NAV = [
  { href: "/documents", label: "Documents", icon: FileText },
  { href: "/chat", label: "Chat Preview", icon: MessageSquare },
  { href: "/conversations", label: "Conversations", icon: MessagesSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/snippet", label: "Get Snippet", icon: Code },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [usage, setUsage] = useState<{ used: number; limit: number } | null>(null);

  useEffect(() => {
    getAnalytics()
      .then(({ data }) => setUsage({ used: data.messages_this_month, limit: data.free_tier_limit }))
      .catch(() => null);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <aside className="w-56 shrink-0 border-r bg-white flex flex-col h-screen">
      <div className="px-5 py-5 border-b">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-blue-600 hover:text-blue-700"
          onClick={onNavigate}
        >
          Zebboy
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t space-y-3">
        {usage && (
          <div>
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Free tier</span>
              <span>{usage.used}/{usage.limit} msgs</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full ${usage.used / usage.limit >= 0.9 ? "bg-red-500" : "bg-blue-500"}`}
                style={{ width: `${Math.min(100, (usage.used / usage.limit) * 100)}%` }}
              />
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
