import { getPostBySlug } from "@/lib/mdx";
import { Post } from "./Post";

interface PostEmbedProps {
  slug: string;
}

export const PostEmbed = async ({ slug }: PostEmbedProps) => {
  // Fetch the post data from MDX
  const post = await getPostBySlug(slug);

  if (!post) {
    // If we couldn't find the post, render nothing (or you could render a placeholder)
    return null;
  }

  return <Post post={post} />;
};

export default PostEmbed;
