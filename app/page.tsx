import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, FileText, Code, Zap, Shield, BarChart2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  alternates: { canonical: "https://zebboy.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Zebboy",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: "https://zebboy.com",
  description:
    "AI chatbot builder that lets you upload your documents and embed a fully trained customer support bot on your website in minutes.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    name: "Free",
    description: "Free to use — get in touch if you need a higher message limit",
  },
  featureList: [
    "Upload PDF, Word, and text documents",
    "AI answers grounded in your content",
    "One-line embed code",
    "Streaming responses",
    "Private and secure data handling",
    "Usage analytics dashboard",
  ],
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 md:pt-24 pb-12 md:pb-14 text-center">
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
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 pt-16 pb-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-3">Everything you need</h2>
          <p className="text-center text-gray-500 mb-10">Set up in minutes.</p>
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
          <div className="text-center mt-12">
            <Link
              href="/features"
              className="inline-block border border-gray-200 bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold text-sm hover:bg-gray-50 transition"
            >
              See all features →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="pt-20 pb-14 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-3">Up and running in 3 steps</h2>
        <p className="text-center text-gray-500 mb-10">No engineers required.</p>
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

      {/* CTA */}
      <section className="pt-16 pb-24 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Ready to add AI to your website?</h2>
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-10 py-4 rounded-xl font-semibold text-base hover:bg-blue-700 transition shadow-lg shadow-blue-200 inline-block"
        >
          Start for free →
        </Link>
      </section>

      <Footer />

    </div>
  );
}
