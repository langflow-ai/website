export const dynamic = "force-static";
export const revalidate = 60 * 60; // 1 hour

import { sanityFetch } from "@/lib/backend/sanity/client";
import { POST_BY_SLUG_QUERY } from "@/lib/backend/sanity/queries";
import { HOST } from "@/utils/constants";
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
  publishedAt?: string;
  author?: { name?: string };
}

/**
 * GET /blog/[slug]/llms.txt – returns a short plain-text summary of a single post.
 * The response is intentionally minimal so that LLMs can ingest it without extra parsing.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
): Promise<Response> {
  // Fetch the post, excluding drafts.
  const post = await sanityFetch<Post | null>(POST_BY_SLUG_QUERY, {
    slug: params.slug,
  });

  if (!post) {
    return new Response("Post not found", { status: 404 });
  }

  const url = `${HOST}/blog/${post.slug?.current ?? params.slug}`;

  const content =
    `Post title: ${post.title ?? "Untitled"}` +
    `\nRead it at: ${url}` +
    `\nSummary: ${post.body}\n`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
