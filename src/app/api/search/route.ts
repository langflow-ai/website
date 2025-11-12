import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  if (!q) {
    return NextResponse.json({ posts: [] });
  }

  // Get all posts from MDX files
  const allPosts = await getAllPosts();

  // Search through posts - check title, excerpt, and body
  const matchedPosts = allPosts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(q);
    const excerptMatch = post.excerpt?.toLowerCase().includes(q);
    const contentMatch = post.body.toLowerCase().includes(q);

    return titleMatch || excerptMatch || contentMatch;
  });

  // Limit to 5 results
  const limited = matchedPosts.slice(0, 5);

  // Transform to match the expected API response format
  const posts = limited.map((post) => ({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || post.body.substring(0, 200) + "...",
    publishedAt: post.publishedAt,
    featureImage: post.featureImage,
    authors: post.authors,
    author: post.author,
    _id: post._id,
  }));

  return NextResponse.json({ posts });
}
