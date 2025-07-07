import { NextResponse } from "next/server";
import { sanityFetch } from "@/lib/backend/sanity/client";
import { BlogPost } from "@/lib/types/sanity.types";
import { generateBlogExcerpt } from "@/lib/utils/generateBlogExcerpt";
import { BLOG_POSTS_QUERY } from "@/lib/backend/sanity/queries";
import { getBodyText } from "@/lib/utils/getBodyText";
import { searchPosts } from "@/lib/utils/searchPosts";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim();

  if (!q) {
    return NextResponse.json({ posts: [] });
  }

  // Fetch posts and reuse shared searchPosts util
  const posts = await sanityFetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, false);

  const limited = searchPosts(posts, q, 5);

  // Ensure excerpts exist
  const postsWithExcerpts = await Promise.all(
    limited.map(async (post) => {
      if (post.excerpt) return post;
      const bodyText = getBodyText(post.body);
      const excerpt =
        typeof post.body === "string"
          ? bodyText.slice(0, 200)
          : await generateBlogExcerpt(post.body);
      return { ...post, excerpt };
    })
  );

  return NextResponse.json({ posts: postsWithExcerpts });
}
