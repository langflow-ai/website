"use client";

// Dependencies
import React from "react";
import { usePathname } from "next/navigation";

// Types
// import { SEO } from "@/lib/types/sanity";

// Utilities
// import { getLocale } from "@/lib/utils/intl";

// Components
// import Eyebrow from "@/components/2023/typography/Eyebrow";

// Stypes
import styles from "./styles.module.scss";
import { trackEvent } from "@/lib/utils/tracking";
import Display from "@/components/ui/Display";

// Props types
interface Props {
  className?: string;
  title: string;
}

function SocialShare({ className, title }: Props): JSX.Element {
  const pathname = usePathname();

  // Variables
  const url = `https://www.langflow.org${pathname}`;

  return (
    <div className={`${styles.share} ${className}`}>
      <Display size={100} tagName="h5">
        Share
      </Display>

      <div>
        <a
          href={`https://www.facebook.com/sharer.php?u=${url}&p[title]=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <span role="img" aria-label="Share on Facebook">
            <svg fill="currentColor">
              <use xlinkHref={`/svgs/social-icons-sprite.svg#facebook`} />
            </svg>
          </span>
        </a>

        <a
          href={`https://twitter.com/share?text=${title}&url=${url}`}
          target="_blank"
          rel="noreferrer"
        >
          <span role="img" aria-label="Share on X">
            <svg fill="currentColor">
              <use xlinkHref={`/svgs/social-icons-sprite.svg#twitter`} />
            </svg>
          </span>
        </a>

        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
          target="_blank"
          rel="noreferrer"
        >
          <span role="img" aria-label="Share on LinkedIn">
            <svg fill="currentColor">
              <use xlinkHref={`/svgs/social-icons-sprite.svg#linkedin`} />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}

export default SocialShare;
