import Link from "next/link";
import SanityImage from "../media/SanityImage";
import Display from "@/components/ui/Display";
import { Byline } from "@/components/ui/Blog/Byline";
import Text from "@/components/ui/text";
import Button from "@/components/ui/button";
import { ButtonTypes } from "@/components/ui/button/types";
import { BlogPost } from "@/lib/types/sanity";

export function Post({ post }: { post: BlogPost }) {
  const authors = [
    ...(post.author ? [post.author] : []),
    ...(post.authors || []),
  ];

  if (authors.length === 0) {
    authors.push({ name: "Unknown" });
  }

  return (
    <Link
      href={`/blog/${post.slug?.current}`}
      className="text-reset text-decoration-none"
    >
      <div className="card post-card p-4 d-grid gap-4 bg-black text-white shadow border-2 border-dark">
        {post.featureImage && (
          <SanityImage
            image={post.featureImage}
            alt={post.title || ""}
            className="card-img-top w-100 h-auto rounded-3"
            width={300}
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
          <Byline authors={authors} publishedAt={post.publishedAt} />
          <Text size={300} tagName="p" className="text-white">
            {post.excerpt}
          </Text>
        </div>
        <div className="flex-row" style={{ justifyItems: "end" }}>
          <Button variant={ButtonTypes.BORDER}>Read more &rarr;</Button>
        </div>
      </div>
    </Link>
  );
}
