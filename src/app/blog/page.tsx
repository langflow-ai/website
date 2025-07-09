import { draftMode } from "next/headers";

// Backend
import { sanityFetch } from "@/lib/backend/sanity/client";
import { BLOG_POSTS_PAGINATED_QUERY } from "@/lib/backend/sanity/queries";

// Components
import PageLayout from "@/components/layout/page";
import Display from "@/components/ui/Display";
import { generateBlogExcerpt } from "@/lib/utils/generateBlogExcerpt";
import LinesOverlay from "@/components/ui/Blog/LinesOverlay";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { Metadata, NextPage } from "next";
import { BlogPost } from "@/lib/types/sanity";
import PostsFeed from "@/components/ui/Blog/PostsFeed";
import SearchAskField from "@/components/ui/Blog/SearchAskField";
import { LatestPost } from "@/components/ui/Blog/LatestPost";

export const dynamic = "force-static";

const BlogIndex: NextPage = async () => {
  // Check for draft mode to fetch preview content
  const isDraftMode = draftMode().isEnabled;

  // Pagination settings
  const LIMIT = 7;

  // Fetch first batch of posts
  const posts = await sanityFetch<BlogPost[]>(
    BLOG_POSTS_PAGINATED_QUERY,
    { start: 0, end: LIMIT },
    isDraftMode
  );

  // Generate excerpts
  const postsWithExcerpts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      excerpt:
        post.excerpt ?? (await generateBlogExcerpt(post.body)) ?? undefined,
    }))
  );

  const latestPost = postsWithExcerpts[0];
  const initialOtherPosts = postsWithExcerpts.slice(1);

  return (
    <PageLayout className="layout" type="normal">
      <BackgroundGradient />
      <section className="container py-4">
        <div className="row">
          <div className="col d-grid gap-4">
            <Display size={700} tagName="h1">
              Blog
            </Display>
            <SearchAskField className="position-relative z-3" />
          </div>
        </div>
      </section>

      {latestPost && (
        <section className="container">
          <div className="row">
            <div className="col">
              <div className="d-grid gap-4 position-relative" id="blog-section">
                <LatestPost post={latestPost} />
                <Display
                  size={400}
                  style={{ paddingLeft: 11, paddingTop: "1rem" }}
                >
                  Older Posts
                </Display>
                <PostsFeed
                  initialPosts={initialOtherPosts}
                  initialOffset={postsWithExcerpts.length}
                  limit={LIMIT}
                />
                <LinesOverlay />
              </div>
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export const metadata: Metadata = {
  title: "Blog | Langflow - The fastest way to build AI Agents",
  openGraph: {
    url: "https://langflow.org/blog",
    siteName: "Langflow",
    images: [
      {
        url: "/images/blog-og-image.png",
        width: 1200,
        height: 630,
        alt: "Langflow - Low-code AI builder",
      },
    ],
  },
  description:
    "Explore the latest news, updates, and insights from the Langflow team. Learn about the latest features, best practices, and how to get the most out of Langflow.",
};

export default BlogIndex;
