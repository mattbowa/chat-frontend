import Link from "next/link";
import { MessageSquare, FileText, Code, Zap, Shield, BarChart2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">

      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-16 md:py-28 text-center">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          AI-powered customer support
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
          A chatbot trained on{" "}
          <span className="text-blue-600">your documents</span>,{" "}
          ready in minutes
        </h1>
        <p className="text-base md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your docs, customize your bot, and embed it on your website with one line of code.
          Your customers get instant, accurate answers — 24/7.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-gray-50 transition"
          >
            Sign in
          </Link>
        </div>
        <p className="text-sm text-gray-400 mt-4">No credit card required · 100 messages free every month</p>
      </section>

      {/* Widget preview */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100 shadow-xl">

          {/* Fake page content */}
          <div className="space-y-3 mb-6">
            <div className="h-4 bg-white rounded-full w-1/2 shadow-sm" />
            <div className="h-3 bg-white/80 rounded-full w-3/4" />
            <div className="h-3 bg-white/80 rounded-full w-2/3" />
            <div className="h-3 bg-white/80 rounded-full w-5/6" />
          </div>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm space-y-2">
                <div className="h-3 bg-gray-100 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-1/2" />
              </div>
            ))}
          </div>

          {/* Chat widget */}
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-2">
            {/* Chat window */}
            <div className="bg-white rounded-2xl shadow-2xl w-72 overflow-hidden border border-gray-100">
              {/* Header */}
              <div className="bg-blue-600 px-4 py-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold text-white">A</div>
                <div>
                  <p className="text-xs font-semibold text-white">AI Assistant</p>
                  <p className="text-xs text-blue-200">Online</p>
                </div>
              </div>
              {/* Messages */}
              <div className="p-3 space-y-2 bg-gray-50">
                <div className="flex justify-start">
                  <div className="bg-white border text-gray-700 text-xs px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm max-w-48">
                    Hi! How can I help you today? 👋
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white text-xs px-3 py-2 rounded-2xl rounded-br-sm max-w-40">
                    What's your return policy?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border text-gray-700 text-xs px-3 py-2 rounded-2xl rounded-bl-sm shadow-sm max-w-48">
                    We offer 30-day returns on all orders. No questions asked!
                  </div>
                </div>
              </div>
              {/* Input */}
              <div className="px-3 py-2 border-t flex items-center gap-2 bg-white">
                <div className="flex-1 bg-gray-100 rounded-full h-7 text-xs px-3 flex items-center text-gray-400">
                  Type a message...
                </div>
                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <MessageSquare size={12} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Everything you need</h2>
          <p className="text-center text-gray-500 mb-14">Set up in minutes, not months.</p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: FileText,
                title: "Upload any document",
                desc: "PDF, Word, TXT, Markdown. Your bot reads and understands all of it.",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: MessageSquare,
                title: "Answers from your content",
                desc: "Every response is grounded in your docs. No hallucinations, no guessing.",
                color: "bg-purple-50 text-purple-600",
              },
              {
                icon: Code,
                title: "One line to embed",
                desc: "Paste a script tag and your chatbot appears on any website instantly.",
                color: "bg-green-50 text-green-600",
              },
              {
                icon: Zap,
                title: "Streaming responses",
                desc: "Answers appear word by word — fast, modern, and satisfying to use.",
                color: "bg-yellow-50 text-yellow-600",
              },
              {
                icon: Shield,
                title: "Private & secure by design",
                desc: "Your data is encrypted, isolated, and never used to train AI models.",
                color: "bg-red-50 text-red-600",
              },
              {
                icon: BarChart2,
                title: "Usage analytics",
                desc: "See what your customers are asking and how your bot is performing.",
                color: "bg-cyan-50 text-cyan-600",
              },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${color}`}>
                  <Icon size={18} />
                </div>
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Up and running in 3 steps</h2>
        <p className="text-center text-gray-500 mb-14">No engineers required.</p>
        <div className="space-y-6">
          {[
            {
              step: "01",
              title: "Sign up and upload your docs",
              desc: "Create a free account, then drag and drop your PDFs, Word docs, or text files. We process and index everything automatically.",
            },
            {
              step: "02",
              title: "Customize your chatbot",
              desc: "Set your bot's name, color, and personality. Write a system prompt to define its tone — friendly, professional, or concise.",
            },
            {
              step: "03",
              title: "Embed it on your website",
              desc: "Copy one line of code from the dashboard and paste it into your website. A floating chat bubble appears instantly — no engineering needed.",
            },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex gap-6 items-start bg-white border rounded-xl p-6 shadow-sm">
              <span className="text-3xl font-black text-blue-100 shrink-0 w-12">{step}</span>
              <div>
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Simple pricing</h2>
          <p className="text-gray-500 mb-14">Start free. Upgrade when you're ready.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free */}
            <div className="bg-white rounded-2xl border p-8 text-left shadow-sm">
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Free</p>
              <p className="text-4xl font-black mb-1">$0</p>
              <p className="text-sm text-gray-400 mb-8">forever</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                {[
                  "100 messages / month",
                  "Up to 10 documents",
                  "1 chatbot widget",
                  "Custom branding",
                  "Analytics dashboard",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/signup"
                className="block w-full text-center border border-blue-600 text-blue-600 py-2.5 rounded-lg font-medium hover:bg-blue-50 transition text-sm"
              >
                Get started free
              </Link>
            </div>

            {/* Pro — coming soon */}
            <div className="bg-blue-600 rounded-2xl p-8 text-left text-white relative overflow-hidden shadow-lg shadow-blue-200">
              <div className="absolute top-4 right-4 bg-white/20 text-white text-xs px-2 py-0.5 rounded-full font-medium">
                Coming soon
              </div>
              <p className="text-sm font-semibold text-blue-200 uppercase tracking-wide mb-2">Pro</p>
              <p className="text-4xl font-black mb-1">$29</p>
              <p className="text-sm text-blue-200 mb-8">per month</p>
              <ul className="space-y-3 text-sm text-blue-100 mb-8">
                {[
                  "2,000 messages / month",
                  "Unlimited documents",
                  "Multiple chatbots",
                  "Remove Zebboy branding",
                  "Priority support",
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="text-white font-bold">✓</span> {f}
                  </li>
                ))}
              </ul>
              <button
                disabled
                className="block w-full text-center bg-white/20 text-white py-2.5 rounded-lg font-medium text-sm opacity-60 cursor-not-allowed"
              >
                Coming soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">Ready to add AI to your website?</h2>
        <p className="text-gray-500 mb-8">Join for free. No credit card required.</p>
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-base hover:bg-blue-700 transition shadow-lg shadow-blue-200 inline-block"
        >
          Start for free →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-sm text-gray-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <span className="font-bold text-blue-600">Zebboy</span>
          <p>© {new Date().getFullYear()} Zebboy. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/login" className="hover:text-gray-600">Sign in</Link>
            <Link href="/signup" className="hover:text-gray-600">Sign up</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
