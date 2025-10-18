import { AuthorClip, BlogPost } from "../types/sanity";
import { HOST } from "@/utils/constants";

export const blogPostSchema = (post: BlogPost) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "@id": `${HOST}/blog/${post.slug.current}`,
  url: `${HOST}/blog/${post.slug.current}`,
  headline: post.title,
  datePublished: post.publishedAt,
  description: post.excerpt,
  image: {
    "@type": "ImageObject",
    "@id": post.featureImage,
    url: post.featureImage,
  },
  articleBody: post.body,
  isPartOf: {
    "@type": "Blog",
    "@id": `${HOST}/blog/`,
    name: "Langflow Blog",
  },
  author: post.authors?.map(authorSchema),
  publisher: publisherSchema,
});

export const authorSchema = (author: AuthorClip) => ({
  "@type": "Person",
  name: author.name,
  worksFor: "Langflow",
  image: author.avatar,
});

export const publisherSchema = {
  "@type": "Organization",
  "@id": HOST,
  name: "Langflow",
  logo: {
    "@type": "ImageObject",
    "@id": "https://www.langflow.org/images/logo.png",
    url: "https://www.langflow.org/images/logo.png",
    width: "491",
    height: "96",
  },
};
