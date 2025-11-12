import { AuthorClip } from "@/lib/types/sanity";
import Text from "../text";
import Image from "next/image";

import styles from "./Byline.module.scss";
import NextLink from "next/link";

type JSONAuthor = {
  name: string;
  slug?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  social?: Record<string, string | null>;
};

type BylineProps = {
  authors: (AuthorClip | JSONAuthor)[];
  publishedAt: string;
};

export function Byline({ authors, publishedAt }: BylineProps) {
  return (
    <div className="d-flex flex-row items-center gap-2">
      {authors && (
        <div className={styles.avatars}>
          {authors
            ?.filter((author) => !!author.avatar)
            .map((author, index) => {
              const authorSlug = (author as any).slug;
              const slugKey = typeof authorSlug === "string"
                ? authorSlug
                : authorSlug?.current || index;

              // Handle slug for link
              const slugForLink = typeof authorSlug === "string"
                ? authorSlug
                : authorSlug?.current;

              // Now all avatars are string paths
              const avatarPath = typeof author.avatar === "string"
                ? author.avatar
                : "/images/default-avatar.png";

              return (
                <NextLink href={`/people/${slugForLink}`} key={slugKey}>
                  <Image
                    src={avatarPath}
                    alt={author.name}
                    width={32}
                    height={32}
                    className="rounded-circle"
                    title={author.name}
                    style={{ borderRadius: "50%" }}
                  />
                </NextLink>
              );
            })}
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

            const authorSlug = (author as any).slug;
            const slugForLink = typeof authorSlug === "string"
              ? authorSlug
              : authorSlug?.current;

            return (
              <span key={slugForLink || index}>
                <NextLink href={`/people/${slugForLink}`}>
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
