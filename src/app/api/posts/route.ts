import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "7", 10);

  const start = offset;
  const end = offset + limit;

  // Get all posts from MDX files
  const allPosts = await getAllPosts();

  // Apply pagination
  const posts = allPosts.slice(start, end);

  // Transform to match the expected API response format
  const postsWithExcerpts = posts.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || post.body.substring(0, 200) + "...",
    publishedAt: post.publishedAt,
    featureImage: post.featureImage,
    authors: post.authors,
    author: post.author,
    _id: post._id,
  }));

  return NextResponse.json(postsWithExcerpts);
}
