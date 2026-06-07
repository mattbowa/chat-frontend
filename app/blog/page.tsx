import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — AI Chatbot Tips & Guides",
  description:
    "Practical guides on adding AI chatbots to your website, comparing support tools, and automating customer service. Written for business owners, not developers.",
  alternates: { canonical: "https://zebboy.com/blog" },
  openGraph: {
    title: "Zebboy Blog — AI Chatbot Tips & Guides",
    description:
      "Practical guides on adding AI chatbots to your website and automating customer support.",
    url: "https://zebboy.com/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            Blog
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">
            AI Chatbot Guides
          </h1>
          <p className="text-gray-500 text-lg">
            Practical tutorials and comparisons for business owners who want smarter customer support.
          </p>
        </div>

        <div className="space-y-6">
          {getPosts().map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white border border-gray-200 rounded-2xl p-7 hover:border-blue-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  {post.category}
                </span>
                <span className="text-xs text-gray-400">{post.readingTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">
                {post.description}
              </p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t px-6 py-8 text-sm text-gray-400 mt-16">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center">
          <Link href="/" className="font-bold text-blue-600">Zebboy</Link>
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
