// Dependencies
import { FC } from "react";
import { notFound } from "next/navigation";

// Backend
import { sanityFetch } from "@/lib/backend/sanity/client";
import {
  METADATA_BY_SLUG_QUERY,
  PAGE_BY_SLUG_QUERY,
} from "@/lib/backend/sanity/queries";

// Types
import { Seo, type Page as PageType } from "@/lib/types/sanity.types";

// Utilities
import { parseSlugToString } from "@/lib/utils/str";

// Components
import PageLayout from "@/components/layout/page";
import Template from "@/components/pages/Page/Template";

// Props types
type Props = {
  params: {
    slug: string[];
  };
};

/**
 * Generate the Metadata settings for this pages
 */
export const generateMetadata = async ({ params: { slug } }: Props) => {
  const parsedSlug = parseSlugToString(slug);
  const metadata = await sanityFetch<Seo>(METADATA_BY_SLUG_QUERY, {
    slugs: [parsedSlug, `/${parsedSlug}`],
  });

  return {
    title: metadata.title,
    description: metadata?.description,
    openGraph: {
      url: `https://www.langflow.org/${metadata.slug?.current?.replace(/^\//, "")}`,
      title: metadata.title,
      description: metadata?.description,
      siteName: "Langflow",
      images: "/images/logo.png",
    },
  };
};

const DynamicPage: FC<Props> = async ({ params: { slug } }) => {
  const parsedSlug = parseSlugToString(slug);
  const page = await sanityFetch<PageType>(PAGE_BY_SLUG_QUERY, {
    slugs: [parsedSlug, `/${parsedSlug}`],
  });

  if (!page) {
    notFound();
  }

  return (
    <PageLayout className="layout" type="normal">
      <Template sections={page.sections} />
    </PageLayout>
  );
};

export default DynamicPage;
