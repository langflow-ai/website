import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { NextPage } from "next";

import { sanityFetch, getImageUrl } from "@/lib/backend/sanity/client";
import {
  BLOG_POSTS_SLUGS_QUERY,
  POST_BY_SLUG_QUERY,
  BLOG_POSTS_QUERY,
} from "@/lib/backend/sanity/queries";

import PageLayout from "@/components/layout/page";
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import { Byline } from "@/components/ui/Blog/Byline";
import { Post } from "@/components/ui/Blog/Post";
import { BlogPost } from "@/lib/types/sanity";
import { Markdown } from "@/components/ui/Blog/Markdown";
import { BackgroundGradient } from "@/components/BackgroundGradient";

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(BLOG_POSTS_SLUGS_QUERY);
  return (slugs || [])
    .filter((slug) => Boolean(slug))
    .map((slug) => ({ slug }));
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const isDraftMode = draftMode().isEnabled;
  const post = await sanityFetch<BlogPost>(
    POST_BY_SLUG_QUERY,
    { slug: params.slug },
    isDraftMode
  );

  if (!post) {
    notFound();
  }

  const featureImageUrl = getImageUrl(post.featureImage);

  return {
    title: `${post.title} | Langflow - The AI Agent Builder`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: featureImageUrl ? [featureImageUrl] : undefined,
    },
  };
};

const BlogPostPage: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const isDraftMode = draftMode().isEnabled;
  const [post, otherPosts] = await Promise.all([
    sanityFetch<BlogPost>(
      POST_BY_SLUG_QUERY,
      { slug: params.slug },
      isDraftMode
    ),
    (await sanityFetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, isDraftMode))
      .filter(
        (otherPost) =>
          otherPost.excerpt && otherPost.slug?.current !== params.slug
      )
      .slice(0, 4),
  ]);

  if (!post) {
    notFound();
  }

  const authors = [
    ...(post.author ? [post.author] : []),
    ...(post.authors || []),
  ];

  if (authors.length === 0) {
    authors.push({ name: "Unknown" });
  }

  return (
    <PageLayout className="layout" type="normal">
      <BackgroundGradient />
      <header className="container">
        <div className="row">
          <div className="col d-flex flex-column gap-4 py-4">
            <ol className="list-unstyled p-0 d-flex gap-2 text-white w-100 m-0">
              <li>
                <Text size={100}>
                  <a href="/">Home</a>&nbsp;&nbsp;/
                </Text>
              </li>
              <li>
                <Text size={100}>
                  <a href="/blog">Blog</a>&nbsp;&nbsp;/
                </Text>
              </li>
              <li className="active text-white" aria-current="page">
                <Text size={100}>{post.title}</Text>
              </li>
            </ol>
            <Display size={700} tagName="h1" className="m-0">
              {post.title}
            </Display>
            <Byline
              authors={authors}
              publishedAt={post.publishedAt || ""}
            />
          </div>
        </div>
      </header>

      <article className="container blog-article">
        <div className="row">
          <Text
            size={300}
            tagName="div"
            className="col d-flex flex-column gap-4"
          >
            <Markdown>{post.body}</Markdown>
          </Text>
        </div>
      </article>

      {otherPosts && (
        <section className="container">
          <div className="row my-4">
            <div className="col`">
              <hr className="my-4 border-top border-light" />

              <Display size={600} tagName="h2" className="m-0">
                Similar Posts
              </Display>
            </div>
          </div>
          <div className="row">
            <div className="col other-posts">
              {otherPosts.map((post) => (
                <div key={post._id}>
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* <article className="d-flex flex-column gap-4 p-4 blog-article">
        
        
      </article> */}
    </PageLayout>
  );
};

export default BlogPostPage;

export const dynamic = "force-static";
