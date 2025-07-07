import { BlogPost } from "@/lib/types/sanity.types";
import Link from "next/link";
import Display from "../Display";
import { Byline } from "./Byline";
import Text from "../text/Text";
import Button from "../button";
import { ButtonTypes } from "../button/types";

export async function LatestPost({ post }: { post: BlogPost }) {
  return <div key={post._id}>
  <Link
    href={`/blog/${post.slug?.current}`}
    className="text-reset text-decoration-none"
  >
    <div className="card post-card p-4 d-grid gap-4 bg-black border-dark border-2 shadow text-white">
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
                {post.title}
              </Display>
              <Byline
                author={post.author}
                publishedAt={post.publishedAt}
              />
            </div>
            {
              <Text size={300} tagName="p" className="text-white">
                {post.excerpt}
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
}