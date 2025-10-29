export const dynamic = "force-static";
export const revalidate = 60 * 60; // 1 hour

import { sanityFetch } from "@/lib/backend/sanity/client";
import { BLOG_POSTS_QUERY } from "@/lib/backend/sanity/queries";
import { HOST } from "@/utils/constants";
import type { NextRequest } from "next/server";

interface Post {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  body: string;
  publishedAt: string;
  author?: {
    name?: string;
  };
  authors?: {
    name?: string;
  }[];
}

/**
 * GET /blog/llms-full.txt – returns the full text of every blog post.
 * Useful for embedding-based retrieval pipelines that need the entire corpus.
 */
export async function GET(_req: NextRequest): Promise<Response> {
  const posts = await sanityFetch<Post[]>(BLOG_POSTS_QUERY);

  const records = posts
    .map((post) => {
      const url = `${HOST}/blog/${post.slug?.current ?? ""}`;
      const bodyText = post.body;
      const author = [
        post.author ? post.author.name : null,
        ...(post.authors ? post.authors?.map((author) => author.name) : []),
        null,
      ]
        .filter(Boolean)
        .join(",");

      return (
        `TITLE: ${post.title ?? "Untitled"}` +
        `\nURL: ${url}` +
        `\nPUBLISHED AT: ${post.publishedAt}` +
        (author ? `\nAUTHOR: ${author}` : "") +
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
