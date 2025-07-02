export const dynamic = "force-static";
export const revalidate = 60 * 60; // 1 hour

import { sanityFetch } from "@/lib/backend/sanity/client";
import { BLOG_POSTS_QUERY } from "@/lib/backend/sanity/queries";
import type { NextRequest } from "next/server";

interface Post {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  body: {
    _id: string;
    _type: string;
    children: { _type: string; text: string }[];
  }[];
  publishedAt: string;
  author: {
    name?: string;
  };
}

function portableTextToPlainText(body: Post["body"]): string {
  if (!body) return "";
  return body
    .map((block) => {
      if (block._type !== "block" || !Array.isArray(block.children)) return "";
      return block.children.map((child) => child.text).join("");
    })
    .join("\n");
}

/**
 * GET /blog/llms-full.txt – returns the full text of every blog post.
 * Useful for embedding-based retrieval pipelines that need the entire corpus.
 */
export async function GET(_req: NextRequest): Promise<Response> {
  const posts = await sanityFetch<Post[]>(BLOG_POSTS_QUERY);

  const host = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "https://langflow.org";

  const records = posts
    .map((post) => {
      const url = `${host}/blog/${post.slug?.current ?? ""}`;
      const bodyText = portableTextToPlainText(post.body);

      return (
        `TITLE: ${post.title ?? "Untitled"}` +
        `\nURL: ${url}` +
        `\nPUBLISHED AT: ${post.publishedAt}` +
        (post.author?.name ? `\nAUTHOR: ${post.author.name}` : "") +
        `\nCONTENT:\n${bodyText}` +
        `\n\n===` // delimiter between records
      );
    })
    .join("\n\n");

  const header = `# Langflow Blog
    
Here's all the contents of the Langflow blog that teaches developers how to build AI agents safely and effectively using great technology.

`;

  const content = header + records + "\n";

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
