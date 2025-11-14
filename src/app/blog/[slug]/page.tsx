import { notFound } from "next/navigation";
import { NextPage } from "next";

import { getAllPosts, getPostBySlug } from "@/lib/mdx";

import PageLayout from "@/components/layout/page";
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import { Byline } from "@/components/ui/Blog/Byline";
import { Post } from "@/components/ui/Blog/Post";
import { BlogPost } from "@/lib/types/sanity";
import { Markdown } from "@/components/ui/Blog/Markdown";
import { BackgroundGradient } from "@/components/BackgroundGradient";
import { formatOpenGraphTitle } from "@/lib/utils/titles";
import { blogPostSchema } from "@/lib/utils/schemas";
import { HOST } from "@/utils/constants";
import { KitForm } from "@/components/pages/Newsletter/KitForm/KitForm";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // For MDX, featureImage is already a string URL
  const featureImageUrl = post.featureImage;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: formatOpenGraphTitle(post.title),
      description: post.excerpt,
      images: featureImageUrl ? [featureImageUrl] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: formatOpenGraphTitle(post.title),
      description: post.excerpt,
      images: featureImageUrl ? [featureImageUrl] : undefined,
    },
  };
};

const BlogPostPage: NextPage<{ params: { slug: string } }> = async ({
  params,
}) => {
  const [post, allPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getAllPosts(),
  ]);

  if (!post) {
    notFound();
  }

  // Get other posts for "Similar Posts" section
  const otherPosts = allPosts
    .filter(
      (otherPost) =>
        otherPost.excerpt && otherPost.slug?.current !== params.slug
    )
    .slice(0, 4);

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
            <Byline authors={authors} publishedAt={post.publishedAt || ""} />
          </div>
        </div>
      </header>

      <div className="container blog-article-container">
        <article className="blog-article">
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

        <aside>
          <KitForm newsletterBlurb="Keep up with the latest in AI, Agents, and MCP with the AI++ newsletter." />
        </aside>
      </div>

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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                blogPostSchema(post),
                {
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      item: {
                        "@type": "Organization",
                        "@id": HOST,
                        url: HOST,
                        name: "Langflow",
                      },
                    },
                    {
                      "@type": "ListItem",
                      position: 2,
                      item: {
                        "@type": "Blog",
                        "@id": `${HOST}/blog/`,
                        url: `${HOST}/blog/`,
                        name: "Langflow Blog",
                      },
                    },
                    {
                      "@type": "ListItem",
                      position: 3,
                      item: {
                        "@type": "BlogPosting",
                        "@id": `${HOST}/blog/${post.slug.current}`,
                        url: `${HOST}/blog/${post.slug.current}`,
                        name: post.title,
                      },
                    },
                  ],
                },
              ]),
            }}
          ></script>
        </section>
      )}
    </PageLayout>
  );
};

export default BlogPostPage;

export const dynamic = "force-static";
