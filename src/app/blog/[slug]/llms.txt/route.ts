export const dynamic = "force-static";
export const revalidate = 60 * 60; // 1 hour

import { getPostBySlug } from "@/lib/mdx";
import { HOST } from "@/utils/constants";
import type { NextRequest } from "next/server";

/**
 * GET /blog/[slug]/llms.txt – returns a short plain-text summary of a single post.
 * The response is intentionally minimal so that LLMs can ingest it without extra parsing.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<Response> {
  // Fetch the post
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const url = `${HOST}/blog/${post.slug ?? params.slug}`;

  const content =
    `Post title: ${post.title ?? "Untitled"}` +
    `\nRead it at: ${url}` +
    `\nSummary: ${post.excerpt || post.body || ""}\n`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
