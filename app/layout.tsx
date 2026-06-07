import type { Metadata } from "next";
import "./globals.css";
import Toaster from "@/components/ui/Toaster";

const siteUrl = "https://zebboy.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Zebboy — AI Chatbot Trained on Your Documents",
    template: "%s | Zebboy",
  },
  description:
    "Upload your PDFs and docs, customize your AI chatbot, and embed it on your website in minutes. Give customers instant, accurate answers 24/7 — no engineers needed.",
  keywords: [
    "AI chatbot",
    "document chatbot",
    "customer support AI",
    "chatbot builder",
    "embed chatbot",
    "PDF chatbot",
    "knowledge base chatbot",
    "no-code chatbot",
  ],
  authors: [{ name: "Zebboy" }],
  creator: "Zebboy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Zebboy",
    title: "Zebboy — AI Chatbot Trained on Your Documents",
    description:
      "Upload your docs, customize your bot, and embed it on your website with one line of code. Instant customer support, 24/7.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zebboy — AI Chatbot Trained on Your Documents",
    description:
      "Upload your docs, customize your bot, and embed it on your website with one line of code.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
