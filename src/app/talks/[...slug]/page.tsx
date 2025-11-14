// Dependencies
import { FC } from "react";
import { notFound } from "next/navigation";

// Backend
import { getAllTalks, getTalkBySlug, getEventBySlug } from "@/lib/mdx";

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

export async function generateStaticParams() {
  const talks = await getAllTalks();

  return talks.map((talk) => ({
    slug: [talk.slug.current],
  }));
}

/**
 * Generate the Metadata settings for this page
 */
export const generateMetadata = async ({ params: { slug } }: Props) => {
  const parsedSlug = parseSlugToString(slug).replace(/^talks\//, "");
  const talk = await getTalkBySlug(parsedSlug);

  if (!talk) {
    return {
      title: "Talk Not Found",
      description: "",
    };
  }

  const thumbnailUrl = talk.thumbnail || "/images/logo.png";

  return {
    title: talk.title,
    description: talk.description,
    openGraph: {
      url: `https://www.langflow.org/talks/${parsedSlug}`,
      title: formatOpenGraphTitle(talk.title),
      description: talk.description,
      siteName: "Langflow",
      images: [thumbnailUrl],
    },
  };
};

const DynamicPage: FC<Props> = async ({ params: { slug } }) => {
  const parsedSlug = parseSlugToString(slug).replace(/^talks\//, "");
  const talk = await getTalkBySlug(parsedSlug);

  if (!talk) {
    notFound();
  }

  // Load full event data if event reference exists
  let enrichedTalk = talk;
  if (talk.event?.slug?.current) {
    const fullEvent = await getEventBySlug(talk.event.slug.current);
    if (fullEvent && fullEvent.slug?.current) {
      enrichedTalk = {
        ...talk,
        event: {
          _id: fullEvent._id,
          title: fullEvent.title,
          slug: { current: fullEvent.slug.current },
          type: fullEvent.type,
          dates: fullEvent.dates,
          location: fullEvent.location,
        },
      };
    }
  }

  return (
    <PageLayout className="layout" type="normal">
      <Template talk={enrichedTalk} />
    </PageLayout>
  );
};

export default DynamicPage;


