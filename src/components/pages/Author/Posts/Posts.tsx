// Dependencies
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

// Components
import Display from "@/components/ui/Display";
import Text from "@/components/ui/text";
import SanityImage from "@/components/ui/media/SanityImage";

// Styles
import styles from "./styles.module.scss";

// Props types
type Props = {
  posts: Array<{
    _id: string;
    title?: string;
    slug?: { current?: string };
    excerpt?: string;
    publishedAt?: string;
    featureImage?: any;
  }>;
};

const Posts: FC<Props> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className={styles.posts}>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <Display size={400} tagName="h2" className={styles.heading}>
              Posts ({posts.length})
            </Display>
            <div className={styles.grid}>
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/blog/${post.slug?.current}`}
                  className={styles.post}
                >
                  {post.featureImage && (
                    <SanityImage
                      image={post.featureImage}
                      alt={post.title || ""}
                      className={styles.image}
                      width={300}
                    />
                  )}
                  <div className={styles.content}>
                    <Display size={300} tagName="h3" className={styles.title}>
                      {post.title}
                    </Display>
                    {post.excerpt && (
                      <Text size={200} className={styles.excerpt}>
                        {post.excerpt}
                      </Text>
                    )}
                    {post.publishedAt && (
                      <Text size={100} className={styles.date}>
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Text>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Posts;




