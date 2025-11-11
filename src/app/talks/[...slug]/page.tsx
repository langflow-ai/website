// Dependencies
import { FC } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

// Backend
import { sanityFetch, getImageUrl } from "@/lib/backend/sanity/client";
import {
  METADATA_BY_SLUG_QUERY,
  TALK_BY_SLUG_QUERY,
  TALK_SLUGS_QUERY,
} from "@/lib/backend/sanity/queries";

// Types
import type { Seo } from "@/lib/types/sanity";

// Utilities
import { parseSlugToString } from "@/lib/utils/str";
import { formatOpenGraphTitle } from "@/lib/utils/titles";

// Components
import PageLayout from "@/components/layout/page";
import Template from "@/components/pages/Talk/Template";

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
const DOCUMENT_TYPE = "talk";

export async function generateStaticParams() {
  // Data
  const slugs = await sanityFetch<string[]>(TALK_SLUGS_QUERY);

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
  const parsedSlug = parseSlugToString(slug).replace(/talks\//, "");
  const metadata = await sanityFetch<Seo>(
    METADATA_BY_SLUG_QUERY,
    {
      type: DOCUMENT_TYPE,
      slugs: [parsedSlug, `talks/${parsedSlug}`, `/talks/${parsedSlug}`],
    },
    isDraftMode
  );
  
  const talk = await sanityFetch<any>(
    TALK_BY_SLUG_QUERY,
    {
      slugs: [parsedSlug, `talks/${parsedSlug}`, `/talks/${parsedSlug}`],
    },
    isDraftMode
  );

  const thumbnailUrl = talk?.thumbnail ? getImageUrl(talk.thumbnail) : undefined;

  return {
    title: metadata?.title || talk?.title,
    description: metadata?.description || talk?.description,
    openGraph: {
      url: `https://www.langflow.org/talks/${parsedSlug}`,
      title: formatOpenGraphTitle(metadata?.title || talk?.title),
      description: metadata?.description || talk?.description,
      siteName: "Langflow",
      images: thumbnailUrl ? [thumbnailUrl] : ["/images/logo.png"],
    },
  };
};

const DynamicPage: FC<Props> = async ({ params: { slug } }) => {
  const isDraftMode = (await draftMode()).isEnabled;
  const parsedSlug = parseSlugToString(slug).replace(/talks\//, "");
  const talk = await sanityFetch<any>(
    TALK_BY_SLUG_QUERY,
    {
      slugs: [parsedSlug, `talks/${parsedSlug}`, `/talks/${parsedSlug}`],
    },
    isDraftMode
  );

  if (!talk) {
    notFound();
  }

  return (
    <PageLayout className="layout" type="normal">
      <Template talk={talk} />
    </PageLayout>
  );
};

export default DynamicPage;


