"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { submitContact } from "@/lib/api";
import { toast } from "@/lib/toast";

function ContactForm() {
  const searchParams = useSearchParams();
  // Links from a limit-reached banner pass ?source=message_limit so the
  // submission is tagged with where it came from.
  const source = searchParams.get("source") ?? "contact_page";

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitContact({ ...form, source });
      setSent(true);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { detail?: string } } })?.response?.data?.detail;
      toast(typeof msg === "string" ? msg : "Could not send your message. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border text-center">
        <CheckCircle2 className="mx-auto text-green-500 mb-3" size={40} />
        <h2 className="font-semibold text-lg mb-1">Message sent</h2>
        <p className="text-sm text-gray-500">
          Thanks for getting in touch — I&apos;ll reply to {form.email} as soon as I can.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm border space-y-4">
      {source === "message_limit" && (
        <div className="bg-blue-50 border border-blue-100 text-blue-800 text-sm rounded-lg p-3">
          Looks like you&apos;ve hit the monthly message limit. Send a note below and I&apos;ll
          raise it for you.
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          required
          value={form.name}
          onChange={set("name")}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          required
          type="email"
          value={form.email}
          onChange={set("email")}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Message</label>
        <textarea
          required
          rows={6}
          value={form.message}
          onChange={set("message")}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {loading && <Loader2 size={16} className="animate-spin" />}
        {loading ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto py-16 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Get in touch</h1>
          <p className="text-gray-500 text-sm">
            Questions, feedback, or need a higher usage limit? Drop me a message.
          </p>
        </div>
        <Suspense fallback={<div className="text-sm text-gray-400 text-center">Loading...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
