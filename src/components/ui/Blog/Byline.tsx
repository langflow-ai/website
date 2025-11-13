import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { AuthorClip } from "@/lib/types/sanity";
import SanityImage from "../media/SanityImage";
import Text from "../text";

import styles from "./Byline.module.scss";
import NextLink from "next/link";

type BylineProps = {
  authors: AuthorClip[];
  publishedAt: string;
};

export function Byline({ authors, publishedAt }: BylineProps) {
  return (
    <div className="d-flex flex-row items-center gap-2">
      {authors && (
        <div className={styles.avatars}>
          {authors
            ?.filter((author) => !!author.avatar)
            .map((author, index) => (
              <NextLink href={`/people/${author.slug?.current}`} key={author.slug?.current || index}>
                <SanityImage
                image={author.avatar}
                alt={author.name}
                width={32}
                height={32}
                className="rounded-circle"
                key={author.slug?.current || index}
                title={author.name}
              />
              </NextLink>
            ))}
        </div>
      )}
      <div className="d-flex flex-column">
        <Text
          size={200}
          tagName="p"
          className="text-white"
          style={{ lineHeight: 1.2 }}
        >
          Written by{" "}
          {authors?.map((author, index) => {
            const isLast = index === authors.length - 1;
            const isSecondToLast = index === authors.length - 2;
            
            return (
              <span key={author.slug?.current || index}>
                <NextLink href={`/people/${author.slug?.current}`}>
                  {author.name}
                </NextLink>
                {!isLast && !isSecondToLast && ", "}
                {isSecondToLast && authors.length > 1 && " and "}
              </span>
            );
          })}
        </Text>
        <Text
          size={200}
          tagName="p"
          className="text-secondary"
          style={{ lineHeight: 1.2, color: "#8F969E" }}
        >
          {Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date(publishedAt))}
        </Text>
      </div>
    </div>
  );
}
