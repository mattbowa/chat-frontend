import fs from "fs";
import path from "path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  content: string;
}

const contentDir = path.join(process.cwd(), "content", "blog");

const postMeta: Omit<BlogPost, "content">[] = [
  {
    slug: "how-to-add-ai-chatbot-to-shopify-store",
    title: "How to Add an AI Chatbot to Your Shopify Store (No Code Required)",
    description:
      "Learn how to add a trained AI chatbot to your Shopify store in under 10 minutes — no developers, no monthly Shopify app fees. Instantly answer customer questions 24/7.",
    publishedAt: "2025-06-01",
    readingTime: "7 min read",
    category: "Tutorials",
  },
  {
    slug: "chatgpt-vs-trained-chatbots-customer-support",
    title: "ChatGPT vs Trained Chatbots for Customer Support: Which One Actually Works?",
    description:
      "ChatGPT is powerful, but is it the right tool for customer support? We compare generic AI like ChatGPT to custom-trained chatbots and explain which one actually reduces support tickets.",
    publishedAt: "2025-06-05",
    readingTime: "9 min read",
    category: "Guides",
  },
];

function loadContent(slug: string): string {
  const filePath = path.join(contentDir, `${slug}.md`);
  return fs.readFileSync(filePath, "utf-8");
}

export function getPosts(): BlogPost[] {
  return postMeta.map((meta) => ({
    ...meta,
    content: loadContent(meta.slug),
  }));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const meta = postMeta.find((p) => p.slug === slug);
  if (!meta) return undefined;
  return { ...meta, content: loadContent(meta.slug) };
}

export function getAllSlugs(): string[] {
  return postMeta.map((p) => p.slug);
}
