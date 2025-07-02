import { FC } from "react";
import { draftMode } from "next/headers";

// Backend
import { sanityFetch } from "@/lib/backend/sanity/client";
import { BLOG_POSTS_QUERY } from "@/lib/backend/sanity/queries";

// Components
import PageLayout from "@/components/layout/page";
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import Link from "@/components/ui/Link";
import SanityImage from "@/components/ui/media/SanityImage";
import { generateBlogExcerpt } from "@/lib/utils/generateBlogExcerpt";
import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import { Byline } from "@/components/ui/Blog/Byline";
import { Metadata } from "next";

type Post = {
  _id: string;
  title?: string;
  slug?: { current?: string };
  excerpt?: string;
  body: {
    _id: string;
    _type: string;
    children: {
      _type: string;
      text: string;
    }[];
  }[];
  publishedAt: string;
  featureImage?: any;
  author: {
    name?: string;
    slug?: { current?: string };
    avatar?: any;
  };
};

export const dynamic = "force-static";

const BlogIndex: FC = async () => {
  // Check for draft mode to fetch preview content
  const isDraftMode = draftMode().isEnabled;

  // Fetch posts
  const posts = await sanityFetch<Post[]>(BLOG_POSTS_QUERY, {}, isDraftMode);

  // Generate excerpts
  const postsWithExcerpts = await Promise.all(
    posts.map(async (post) => ({
      ...post,
      excerpt: post.excerpt || (await generateBlogExcerpt(post.body)),
    }))
  );

  const latestPost = postsWithExcerpts[0];
  const otherPosts = postsWithExcerpts.slice(1);

  return (
    <PageLayout className="layout" type="normal">
      <section className="container d-grid gap-2 p-4">
        <Display size={700} tagName="h1">
          Blog
        </Display>

        {latestPost && (
          <div key={latestPost._id}>
            <Link
              href={`/blog/${latestPost.slug?.current}`}
              className="text-reset text-decoration-none"
            >
              <div className="card p-4 d-grid gap-4 bg-dark shadow border-0 text-white">
                <div className="card-body d-flex flex-column justify-content-between gap-4 p-0">
                  <div className="d-flex flex-row gap-4">
                    <Display size={200} className="text-white">
                      Latest Post
                    </Display>
                  </div>
                  <div className="d-flex flex-row gap-4">
                    <div className="d-flex flex-column gap-4">
                      <div className="d-flex flex-column gap-4">
                        <Display
                          size={400}
                          tagName="h2"
                          className="w-75"
                          style={{ textWrap: "balance" }}
                        >
                          {latestPost.title}
                        </Display>
                        <Byline
                          author={latestPost.author}
                          publishedAt={latestPost.publishedAt}
                        />
                      </div>
                      {
                        <Text size={300} tagName="p" className="text-white">
                          {latestPost.excerpt}
                        </Text>
                      }
                    </div>
                  </div>
                </div>
                <div className="flex-row" style={{ justifyItems: "stretch" }}>
                  <Button variant={ButtonTypes.FILLED}>Read more &rarr;</Button>
                </div>
              </div>
            </Link>
          </div>
        )}

        <Display size={200} className="pt-4">
          Other Posts
        </Display>

        {/** @todo Add a Search/Ask */}
        {/** @todo add pagination */}

        <div className="row">
          {otherPosts.map((post) => (
            <div key={post._id} className="p-2 col-md-6">
              <Link
                href={`/blog/${post.slug?.current}`}
                className="text-reset text-decoration-none"
              >
                <div className="card p-4 d-grid gap-4 bg-dark text-white shadow border-0">
                  {post.featureImage && (
                    <SanityImage
                      image={post.featureImage}
                      alt={post.title || ""}
                      className="card-img-top w-100 h-auto"
                    />
                  )}
                  <div className="card-body d-flex flex-column justify-content-between gap-4 p-0">
                    <Display
                      size={400}
                      tagName="h2"
                      className="w-75"
                      style={{ textWrap: "balance" }}
                    >
                      {post.title}
                    </Display>
                    <Byline
                      author={post.author}
                      publishedAt={post.publishedAt}
                    />
                    {
                      <Text size={300} tagName="p" className="text-white">
                        {post.excerpt}
                      </Text>
                    }
                  </div>
                  <div className="flex-row" style={{ justifyItems: "end" }}>
                    <Button variant={ButtonTypes.BORDER}>
                      Read more &rarr;
                    </Button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export const metadata: Metadata = {
  title: "Blog | Langflow - The fastest way to build AI Agents",
  description:
    "Explore the latest news, updates, and insights from the Langflow team. Learn about the latest features, best practices, and how to get the most out of Langflow.",
};

export default BlogIndex;
