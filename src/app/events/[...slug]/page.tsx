// Dependencies
import { FC } from "react";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

// Backend
import { sanityFetch } from "@/lib/backend/sanity/client";
import {
  METADATA_BY_SLUG_QUERY,
  PAGE_BY_SLUG_QUERY,
  PAGES_SLUGS_QUERY,
} from "@/lib/backend/sanity/queries";

// Types
import { Seo, type Event as PageType } from "@/lib/types/sanity.types";

// Utilities
import { parseSlugToString } from "@/lib/utils/str";

// Components
import PageLayout from "@/components/layout/page";
import Template from "@/components/pages/Event/Template";

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
const DOCUMENT_TYPE = "event";

export async function generateStaticParams() {
  // Data
  const slugs = await sanityFetch<string[]>(PAGES_SLUGS_QUERY, {
    type: DOCUMENT_TYPE,
  });

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
 * Generate the Metadata settings for this pages
 */
export const generateMetadata = async ({ params: { slug } }: Props) => {
  const isDraftMode = (await draftMode()).isEnabled;
  const parsedSlug = parseSlugToString(slug);
  const metadata = await sanityFetch<Seo>(
    METADATA_BY_SLUG_QUERY,
    {
      type: DOCUMENT_TYPE,
      slugs: [parsedSlug, `/${parsedSlug}`],
    },
    isDraftMode
  );
  return {
    title: metadata?.title,
    description: metadata?.description,
    openGraph: {
      url: `https://www.langflow.org/${metadata?.slug?.current?.replace(/^\//, "")}`,
      title: metadata?.title,
      description: metadata?.description,
      siteName: "Langflow",
      images: "/images/logo.png",
    },
  };
};

const DynamicPage: FC<Props> = async ({ params: { slug } }) => {
  const isDraftMode = (await draftMode()).isEnabled;
  const parsedSlug = parseSlugToString(slug);
  const page = await sanityFetch<PageType>(
    PAGE_BY_SLUG_QUERY,
    {
      type: DOCUMENT_TYPE,
      slugs: [`events/${parsedSlug}`, `/events/${parsedSlug}`],
    },
    isDraftMode
  );

  if (!page) {
    notFound();
  }

  return (
    <PageLayout className="layout" type="normal">
      <Template event={page} />
    </PageLayout>
  );
};

export default DynamicPage;
