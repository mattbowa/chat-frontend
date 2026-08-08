import type { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Globe,
  MessageSquare,
  Quote,
  Sparkles,
  Palette,
  Sliders,
  HelpCircle,
  Code,
  Zap,
  Shield,
  Lock,
  BarChart2,
  MessagesSquare,
  RefreshCw,
  Eye,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Features — Everything Zebboy Can Do",
  description:
    "Every Zebboy feature in one place: document and website training, full branding and tone customization, one-line embedding, source citations, analytics, and domain security.",
  alternates: { canonical: "https://zebboy.com/features" },
  openGraph: {
    title: "Zebboy Features",
    description:
      "Document and website training, full customization, one-line embedding, analytics, and security — everything Zebboy can do.",
    url: "https://zebboy.com/features",
  },
};

const groups = [
  {
    id: "knowledge",
    label: "Knowledge base",
    heading: "Train it on everything you already have",
    intro:
      "Your bot only answers from content you give it. Add that content two ways — upload files, or point us at your website.",
    features: [
      {
        icon: FileText,
        title: "Document upload",
        desc: "Drag and drop PDFs, plain text, and Markdown files. Each one is parsed, split into passages, and indexed automatically — no formatting or cleanup required.",
      },
      {
        icon: Globe,
        title: "Website crawler",
        desc: "Connect your site URL and we read your sitemap.xml, or follow links from your homepage if you don't have one, up to 40 pages. Every page becomes a document your bot can answer from.",
      },
      {
        icon: RefreshCw,
        title: "Re-crawl on demand",
        desc: "Changed your pricing or policy page? Hit re-crawl and your bot is up to date. Uploaded documents work the same way — replace the file and answers change immediately.",
      },
      {
        icon: Sparkles,
        title: "Automatic processing",
        desc: "Chunking, embedding, and indexing all happen in the background the moment you upload. There is no training run to wait on and no retraining cycle to manage.",
      },
    ],
  },
  {
    id: "answers",
    label: "Answer quality",
    heading: "Grounded answers, not guesses",
    intro:
      "Every reply is built from passages retrieved out of your own content, so the bot stays inside what you have actually told it.",
    features: [
      {
        icon: MessageSquare,
        title: "Retrieval-grounded responses",
        desc: "Each question is matched against your indexed content, and only the most relevant passages are handed to the model. Answers come from your documents rather than the model's general knowledge.",
      },
      {
        icon: Quote,
        title: "Source citations",
        desc: "Answers carry the passages they were built from, so you can expand any reply and see exactly which document it came from.",
      },
      {
        icon: HelpCircle,
        title: "Custom fallback message",
        desc: "When the answer genuinely isn't in your content, the bot says so in wording you choose — and can point the customer at your support team instead of inventing something.",
      },
      {
        icon: Zap,
        title: "Streaming replies",
        desc: "Responses stream in word by word as they're generated, so customers see an answer forming instead of staring at a loading dot.",
      },
    ],
  },
  {
    id: "customization",
    label: "Customization",
    heading: "Make it look and sound like you",
    intro:
      "Branding, tone, and retrieval behaviour are all editable from the dashboard — no code, and changes apply to the live widget straight away.",
    features: [
      {
        icon: Palette,
        title: "Branding",
        desc: "Set your bot's name, pick a chat bubble colour from the presets or enter your own hex value, and add a logo URL to replace the default avatar.",
      },
      {
        icon: MessagesSquare,
        title: "Personality and tone",
        desc: "Write a system prompt to define how your bot speaks — friendly, formal, brief, or on-brand in whatever way you need. It applies to every answer.",
      },
      {
        icon: Sparkles,
        title: "Suggested questions",
        desc: "Seed the chat with starter questions so visitors know what to ask instead of facing an empty box.",
      },
      {
        icon: Sliders,
        title: "Model controls",
        desc: "Tune temperature, how many passages get retrieved per question, and the maximum response length — so you can dial the bot between tightly literal and more conversational.",
      },
    ],
  },
  {
    id: "embed",
    label: "Deployment",
    heading: "On your site in one line",
    intro:
      "The widget is self-contained. Paste it in and a floating chat bubble appears — no build step, no framework, no plugin.",
    features: [
      {
        icon: Code,
        title: "Script tag embed",
        desc: "Copy one line from your dashboard and paste it into your site's HTML. The chat bubble appears in the corner on every page you add it to.",
      },
      {
        icon: Eye,
        title: "Inline iframe",
        desc: "Prefer the chat sitting inside the page rather than floating over it? Embed it as an iframe anywhere in your layout instead.",
      },
      {
        icon: Globe,
        title: "Works on any platform",
        desc: "Shopify, Webflow, WordPress, or a hand-built site — if you can paste a script tag into your theme or page, the widget works.",
      },
      {
        icon: MessageSquare,
        title: "Test before you ship",
        desc: "A chat preview in the dashboard lets you try questions against your real content before a single customer sees it.",
      },
    ],
  },
  {
    id: "insights",
    label: "Insights",
    heading: "See what customers actually ask",
    intro:
      "Every conversation is logged, so you can find the gaps in your documentation instead of guessing at them.",
    features: [
      {
        icon: BarChart2,
        title: "Usage analytics",
        desc: "Track messages this month, messages all time, documents indexed, and your answer rate over the last 30 days, plus a per-day message chart.",
      },
      {
        icon: HelpCircle,
        title: "Unanswered questions",
        desc: "See the questions your bot couldn't answer in the last 30 days. Each one is a hint about a document you should upload next.",
      },
      {
        icon: MessagesSquare,
        title: "Conversation history",
        desc: "Browse full transcripts of what customers asked and how the bot replied, so nothing about your support load is a black box.",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    heading: "Your content stays yours",
    intro:
      "Each account's content is isolated, and you control which sites are allowed to load your bot.",
    features: [
      {
        icon: Shield,
        title: "Domain allowlist",
        desc: "Restrict the widget to the domains you name, so nobody can lift your embed code and run your bot on their own site. Leave it empty to allow all.",
      },
      {
        icon: Lock,
        title: "Isolated by account",
        desc: "Every document, conversation, and setting is scoped to your account. Retrieval never reaches across into another customer's content.",
      },
      {
        icon: FileText,
        title: "Delete anything, anytime",
        desc: "Remove a document and its indexed passages go with it — the bot stops answering from it immediately.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
        <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-6 uppercase tracking-wide">
          Features
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
          Everything Zebboy does
        </h1>
        <p className="text-base md:text-xl text-gray-500 leading-relaxed">
          A support chatbot trained on your own content — with the branding, tone,
          and guardrails under your control. All of it is included, and it's free.
        </p>
      </section>

      {/* Widget preview */}
      <section className="px-6 pb-16 flex justify-center">
        {/* Chat window */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs overflow-hidden border border-gray-100">
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
                What&apos;s your return policy?
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
      </section>

      {/* Section nav */}
      <nav className="max-w-5xl mx-auto px-6 pb-16">
        <div className="flex flex-wrap justify-center gap-2">
          {groups.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-gray-600 border border-gray-200 rounded-full px-4 py-1.5 hover:bg-gray-50 hover:text-gray-900 transition"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Feature groups */}
      {groups.map(({ id, heading, intro, features }, i) => (
        <section
          key={id}
          id={id}
          className={`py-20 scroll-mt-8 ${i % 2 === 1 ? "bg-gray-50" : ""}`}
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-3xl font-bold mb-4">{heading}</h2>
            <p className="text-gray-500 mb-12 max-w-2xl leading-relaxed">{intro}</p>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className={`rounded-xl p-6 shadow-sm ${
                    i % 2 === 1 ? "bg-white" : "bg-white border"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Limits */}
      <section className="py-20 border-t">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">What it costs</h2>
          <p className="text-gray-500 leading-relaxed mb-8">
            Nothing. Every feature on this page is included, with 100 conversations
            per month per account. If you need a higher limit, get in touch and
            we'll sort it out.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              Start for free
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto border border-gray-200 text-gray-700 px-8 py-3.5 rounded-xl font-semibold text-base hover:bg-gray-50 transition"
            >
              Get in touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
