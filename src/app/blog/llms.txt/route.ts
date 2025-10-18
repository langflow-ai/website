export const dynamic = "force-static";
export const revalidate = 60 * 60; // 1 hour

import { sanityFetch } from "@/lib/backend/sanity/client";
import { BLOG_POSTS_QUERY } from "@/lib/backend/sanity/queries";
import { BlogPost } from "@/lib/types/sanity";
import { generateBlogExcerpt } from "@/lib/utils/generateBlogExcerpt";
import { HOST } from "@/utils/constants";
import type { NextRequest } from "next/server";

/**
 * GET /blog/llms.txt – returns a newline-delimited summary for each blog post.
 * The format is intentionally simple so that large language models can ingest
 * and reason about the blog's content with minimal hallucination.
 */
export async function GET(_req: NextRequest): Promise<Response> {
  // We always fetch the published content here – draft posts are excluded.
  const posts = await sanityFetch<BlogPost[]>(BLOG_POSTS_QUERY);

  const fileHeader = `# Langflow Blog
  
Here are the latest insightful posts from the Langflow blog about how to build AI agents safely and effectively.

`;

  const records = (
    await Promise.all(
      posts.map(async (post) => {
        const url = `${HOST}/blog/${post.slug?.current ?? ""}`;

        const summary =
          post.excerpt?.trim() ||
          (await generateBlogExcerpt(post.body))!.trim();

        return `Post title: ${post.title ?? "Untitled"}
Read it at: ${url}
Summary: ${summary}

---
`;
      })
    )
  ).join("\n");

  const content = fileHeader + records + "\n";

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
