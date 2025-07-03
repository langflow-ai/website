import { BlogPost } from "@/lib/types/sanity.types";
import { getBodyText } from "@/lib/utils/getBodyText";

export interface ScoredPost {
  post: BlogPost;
  score: number;
}

/**
 * Returns posts sorted by relevance to query using same scoring as search API.
 * Optionally limit results.
 */
export function searchPosts(
  posts: BlogPost[],
  query: string,
  limit = 20
): BlogPost[] {
  const qLower = query.toLowerCase();
  const tokens = qLower.split(/\s+/).filter(Boolean);

  const scored: ScoredPost[] = posts.map((post) => {
    const lcTitle = (post.title || "").toLowerCase();
    const lcExcerpt = (post.excerpt || "").toLowerCase();
    const lcBody = getBodyText(post.body).toLowerCase();

    let score = 0;

    if (lcTitle.includes(qLower)) score += 100;
    if (lcExcerpt.includes(qLower)) score += 50;

    tokens.forEach((t) => {
      if (lcTitle.includes(t)) score += 6;
      if (lcExcerpt.includes(t)) score += 3;
      if (lcBody.includes(t)) score += 1;
    });

    return { post, score };
  });

  const filtered = scored
    .filter((s) => s.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        Date.parse(b.post.publishedAt) - Date.parse(a.post.publishedAt)
    )
    .slice(0, limit)
    .map((s) => s.post);

  return filtered;
}
