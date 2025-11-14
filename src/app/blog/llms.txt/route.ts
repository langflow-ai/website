export const dynamic = "force-static";
export const revalidate = 60 * 60; // 1 hour

import { getAllPosts } from "@/lib/mdx";
import { HOST } from "@/utils/constants";
import type { NextRequest } from "next/server";

/**
 * GET /blog/llms.txt – returns a newline-delimited summary for each blog post.
 * The format is intentionally simple so that large language models can ingest
 * and reason about the blog's content with minimal hallucination.
 */
export async function GET(_req: NextRequest): Promise<Response> {
  // Fetch all published posts
  const posts = await getAllPosts();

  const fileHeader = `# Langflow Blog
  
Here are the latest insightful posts from the Langflow blog about how to build AI agents safely and effectively.

`;

  const records = posts.map((post) => {
    const url = `${HOST}/blog/${post.slug ?? ""}`;
    const summary = post.excerpt?.trim() || "";

    return `Post title: ${post.title ?? "Untitled"}
Read it at: ${url}
Summary: ${summary}

---
`;
  }).join("\n");

  const content = fileHeader + records + "\n";

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
