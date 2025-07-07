import { sanityFetch } from "@/lib/backend/sanity/client";
import { POST_BY_SLUG_QUERY } from "@/lib/backend/sanity/queries";
import { BlogPost } from "@/lib/types/sanity";
import { Post } from "./Post";

interface PostEmbedProps {
  slug: string;
}

export const PostEmbed = async ({ slug }: PostEmbedProps) => {
  // Fetch the post data directly from Sanity
  const post = await sanityFetch<BlogPost | null>(POST_BY_SLUG_QUERY, {
    slug,
  });

  if (!post) {
    // If we couldn't find the post, render nothing (or you could render a placeholder)
    return null;
  }

  return <Post post={post} />;
};

export default PostEmbed;
