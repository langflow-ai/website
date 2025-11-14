// Dependencies
import { FC } from "react";
import { notFound } from "next/navigation";

// Backend
import { getAllEvents, getEventBySlug } from "@/lib/mdx";

// Types
import type { Event as PageType } from "@/lib/types/sanity.types";

// Utilities
import { parseSlugToString } from "@/lib/utils/str";
import { formatOpenGraphTitle } from "@/lib/utils/titles";

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

export async function generateStaticParams() {
  const events = await getAllEvents();

  return events.map((event) => {
    const slugParts = event.slug?.current
      ? event.slug.current.split("/").filter(Boolean)
      : [event._id];

    return {
      slug: slugParts,
    };
  });
}

/**
 * Generate the Metadata settings for this pages
 */
export const generateMetadata = async ({ params: { slug } }: Props) => {
  const parsedSlug = parseSlugToString(slug).replace(/^events\//, "");
  const event = await getEventBySlug(parsedSlug);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "",
    };
  }

  // For MDX, thumbnail is already a string URL
  const thumbnailUrl = event.thumbnail ? (event.thumbnail as any) : "/images/logo.png";

  return {
    title: event.title,
    description: event.excerpt,
    openGraph: {
      url: `https://www.langflow.org/events/${event.slug?.current?.replace(/^\//, "")}`,
      title: formatOpenGraphTitle(event.title),
      description: event.excerpt,
      siteName: "Langflow",
      images: [thumbnailUrl],
    },
  };
};

const DynamicPage: FC<Props> = async ({ params: { slug } }) => {
  const parsedSlug = parseSlugToString(slug).replace(/^events\//, "");
  const page = await getEventBySlug(parsedSlug);

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
