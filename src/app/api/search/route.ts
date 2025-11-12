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

  // Search through posts with relevance scoring
  const scoredPosts = allPosts
    .map((post) => {
      const titleMatch = post.title.toLowerCase().includes(q);
      const excerptMatch = post.excerpt?.toLowerCase().includes(q);
      const contentMatch = post.body.toLowerCase().includes(q);

      // Calculate relevance score (higher = more relevant)
      let score = 0;
      if (titleMatch) score += 100; // Title match is most important
      if (excerptMatch) score += 10; // Excerpt match is moderately important
      if (contentMatch) score += 1;  // Body match is least important

      return { post, score };
    })
    .filter(({ score }) => score > 0) // Only include posts with matches
    .sort((a, b) => {
      // Sort by score first (descending), then by date (descending)
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
    });

  // Limit to 5 results
  const limited = scoredPosts.slice(0, 5).map(({ post }) => post);

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
