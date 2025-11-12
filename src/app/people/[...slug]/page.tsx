// Dependencies
import { FC } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

// Backend
import { sanityFetch, getImageUrl } from "@/lib/backend/sanity/client";
import {
  METADATA_BY_SLUG_QUERY,
  AUTHOR_BY_SLUG_QUERY,
  AUTHOR_SLUGS_QUERY,
} from "@/lib/backend/sanity/queries";

// Types
import type { Seo } from "@/lib/types/sanity";

// Utilities
import { parseSlugToString } from "@/lib/utils/str";
import { formatOpenGraphTitle } from "@/lib/utils/titles";

// Components
import PageLayout from "@/components/layout/page";
import Template from "@/components/pages/Author/Template";

// Props types
type Props = {
  params: {
    slug: string[];
  };
};

/**
 * Define the dynamic paths
 */
export const dynamic = "force-static";
export const dynamicParams = true;
const DOCUMENT_TYPE = "author";

export async function generateStaticParams() {
  // Data
  const slugs = await sanityFetch<string[]>(AUTHOR_SLUGS_QUERY);

  return (slugs || [])
    .filter((slug) => Boolean(slug))
    .map((s) => {
      const slug = s
        .split("/")
        .filter(Boolean)
        .map((s) => s.toLowerCase().trim());

      return {
        slug: slug,
      };
    });
}

/**
 * Generate the Metadata settings for this page
 */
export const generateMetadata = async ({ params: { slug } }: Props) => {
  const isDraftMode = draftMode().isEnabled;
  const parsedSlug = parseSlugToString(slug).replace(/authors\//, "");
  const metadata = await sanityFetch<Seo>(
    METADATA_BY_SLUG_QUERY,
    {
      type: DOCUMENT_TYPE,
      slugs: [parsedSlug, `authors/${parsedSlug}`, `/authors/${parsedSlug}`],
    },
    isDraftMode
  );
  
  const author = await sanityFetch<any>(
    AUTHOR_BY_SLUG_QUERY,
    {
      slugs: [parsedSlug, `authors/${parsedSlug}`, `/authors/${parsedSlug}`],
    },
    isDraftMode
  );

  const thumbnailUrl = author?.avatar ? getImageUrl(author.avatar) : undefined;

  return {
    title: metadata?.title || author?.name,
    description: metadata?.description || author?.bio,
    openGraph: {
      url: `https://www.langflow.org/authors/${parsedSlug}`,
      title: formatOpenGraphTitle(metadata?.title || author?.name),
      description: metadata?.description || author?.bio,
      siteName: "Langflow",
      images: thumbnailUrl ? [thumbnailUrl] : ["/images/logo.png"],
    },
  };
};

const DynamicPage: FC<Props> = async ({ params: { slug } }) => {
  const isDraftMode = (await draftMode()).isEnabled;
  const parsedSlug = parseSlugToString(slug).replace(/authors\//, "");
  const author = await sanityFetch<any>(
    AUTHOR_BY_SLUG_QUERY,
    {
      slugs: [parsedSlug, `authors/${parsedSlug}`, `/authors/${parsedSlug}`],
    },
    isDraftMode
  );

  if (!author) {
    notFound();
  }

  return (
    <PageLayout className="layout" type="normal">
      <Template author={author} />
    </PageLayout>
  );
};

export default DynamicPage;
