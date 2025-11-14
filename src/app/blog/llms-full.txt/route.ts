export const dynamic = "force-static";
export const revalidate = 60 * 60; // 1 hour

import { getAllPosts } from "@/lib/mdx";
import { HOST } from "@/utils/constants";
import type { NextRequest } from "next/server";

/**
 * GET /blog/llms-full.txt – returns the full text of every blog post.
 * Useful for embedding-based retrieval pipelines that need the entire corpus.
 */
export async function GET(_req: NextRequest): Promise<Response> {
  const posts = await getAllPosts();

  const records = posts
    .map((post) => {
      const url = `${HOST}/blog/${post.slug ?? ""}`;
      const bodyText = post.body || post.excerpt || "";
      const author = post.authors?.map((a) => a.name).filter(Boolean).join(", ") || "";

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
