import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getAllSlugs } from "@/lib/blog";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowLeft, Clock, Tag } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `https://zebboy.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "Zebboy" },
    publisher: {
      "@type": "Organization",
      name: "Zebboy",
      url: "https://zebboy.com",
    },
    mainEntityOfPage: `https://zebboy.com/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-10 transition-colors"
        >
          <ArrowLeft size={14} /> All articles
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
              <Tag size={10} /> {post.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              <Clock size={10} /> {post.readingTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            {post.description}
          </p>
          <div className="mt-4 text-xs text-gray-400">
            Published{" "}
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </header>

        <hr className="border-gray-100 mb-10" />

        {/* Body */}
        <article className="prose prose-gray prose-lg max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-gray-600 prose-p:leading-relaxed
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-li:text-gray-600
          prose-blockquote:border-blue-300 prose-blockquote:text-gray-500
          prose-code:bg-gray-100 prose-code:text-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
          prose-pre:bg-gray-900 prose-pre:rounded-xl
          prose-hr:border-gray-200
          prose-table:text-sm
          prose-th:text-gray-700 prose-th:font-semibold
          prose-td:text-gray-600
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </article>

        {/* CTA */}
        <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to add an AI chatbot to your website?</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Upload your documents, customize your bot, and embed it in minutes. Free to start.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-blue-700 transition shadow-md shadow-blue-200"
          >
            Get started free →
          </Link>
        </div>
      </main>

      <Footer className="mt-16" />
    </div>
  );
}
