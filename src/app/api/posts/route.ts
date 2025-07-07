import { NextResponse } from "next/server";
import { BLOG_POSTS_PAGINATED_QUERY } from "@/lib/backend/sanity/queries";
import { sanityFetch } from "@/lib/backend/sanity/client";
import { BlogPost } from "@/lib/types/sanity";
import { generateBlogExcerpt } from "@/lib/utils/generateBlogExcerpt";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = parseInt(searchParams.get("limit") ?? "7", 10);

  const start = offset;
  const end = offset + limit;

  const posts = await sanityFetch<BlogPost[]>(
    BLOG_POSTS_PAGINATED_QUERY,
    { start, end },
    false
  );

  // Ensure each post has an excerpt
  const postsWithExcerpts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      excerpt:
        post.excerpt ?? (await generateBlogExcerpt(post.body)) ?? undefined,
    }))
  );

  return NextResponse.json(postsWithExcerpts);
}
