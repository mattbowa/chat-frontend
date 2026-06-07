"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { register } from "@/lib/api";
import { toast } from "@/lib/toast";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ tenant_name: "", tenant_slug: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Auto-generate slug from company name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setForm((prev) => ({
      ...prev,
      tenant_name: name,
      tenant_slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await register(form);
      localStorage.setItem("token", data.access_token);
      toast("Account created! Welcome to Zebboy.", "success");
      router.push("/documents");
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      toast(msg ?? "Registration failed. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-gray-500 text-sm mt-1">Create your free account</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company name</label>
            <input
              type="text"
              placeholder="Your company"
              value={form.tenant_name}
              onChange={handleNameChange}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">URL slug</label>
            <div className="flex items-center border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
              <span className="bg-gray-50 px-3 py-2 text-sm text-gray-400 border-r">zebboy.com/widget/</span>
              <input
                type="text"
                value={form.tenant_slug}
                onChange={set("tenant_slug")}
                required
                className="flex-1 px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={form.email}
              onChange={set("email")}
              required
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={set("password")}
              required
              minLength={8}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={14} className="animate-spin" />}
            {loading ? "Creating account..." : "Create free account"}
          </button>
          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
}
