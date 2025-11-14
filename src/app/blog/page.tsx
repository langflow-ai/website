// Backend
import { getAllPosts } from "@/lib/mdx";

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
  // Pagination settings
  const LIMIT = 7;

  // Fetch all posts from MDX
  const allPosts = await getAllPosts();

  // Take first batch for initial render
  const posts = allPosts.slice(0, LIMIT);

  // Generate excerpts if missing
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

      <section className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-4 position-relative" id="blog-section">
              {latestPost && <LatestPost post={latestPost} />}
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
