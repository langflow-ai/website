// Dependencies
import { FC } from "react";
import { notFound } from "next/navigation";

// Backend
import { getAllPages, getPageBySlug } from "@/lib/mdx";

// Types
import { Page as PageType } from "@/lib/types/sanity.types";

// Utilities
import { parseSlugToString } from "@/lib/utils/str";
import { formatOpenGraphTitle } from "@/lib/utils/titles";

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
 * Define the dynamic paths
 */
export const dynamic = "force-static";
export const dynamicParams = true;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page) => {
    const slugParts = page.slug?.current
      ? page.slug.current.split("/").filter(Boolean)
      : [page._id];

    return {
      slug: slugParts,
    };
  });
}

/**
 * Generate the Metadata settings for this pages
 */
export const generateMetadata = async ({ params: { slug } }: Props) => {
  const parsedSlug = parseSlugToString(slug);
  const page = await getPageBySlug(parsedSlug);

  if (!page) {
    return {
      title: "Page Not Found",
      description: "",
    };
  }

  // For MDX, thumbnail is already a string URL
  const thumbnailUrl = page.thumbnail ? (page.thumbnail as any) : "/images/logo.png";

  return {
    title: page.title,
    description: "",
    openGraph: {
      url: `https://www.langflow.org/${page.slug?.current?.replace(/^\//, "")}`,
      title: formatOpenGraphTitle(page.title),
      description: "",
      siteName: "Langflow",
      images: [thumbnailUrl],
    },
  };
};

const DynamicPage: FC<Props> = async ({ params: { slug } }) => {
  const parsedSlug = parseSlugToString(slug);
  const page = await getPageBySlug(parsedSlug);

  if (!page) {
    notFound();
  }

  return (
    <PageLayout className="layout" type="normal">
      <Template page={page} />
    </PageLayout>
  );
};

export default DynamicPage;
