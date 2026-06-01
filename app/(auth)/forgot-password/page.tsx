"use client";

import { useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "@/lib/toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"}/auth/forgot-password`, { email });
      setSent(true);
    } catch {
      toast("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-bold text-blue-600">Chatyy</a>
          <p className="text-gray-500 text-sm mt-1">Reset your password</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border">
          {sent ? (
            <div className="text-center space-y-3">
              <div className="text-4xl">📬</div>
              <p className="font-semibold">Check your email</p>
              <p className="text-sm text-gray-500">If that email exists, we've sent a reset link. Check your inbox.</p>
              <a href="/login" className="block text-sm text-blue-600 hover:underline">Back to sign in</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email address</label>
                <input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading && <Loader2 size={14} className="animate-spin" />}
                {loading ? "Sending..." : "Send reset link"}
              </button>
              <p className="text-sm text-center">
                <a href="/login" className="text-gray-500 hover:text-gray-700">Back to sign in</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
