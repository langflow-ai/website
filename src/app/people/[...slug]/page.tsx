// Dependencies
import { FC } from "react";
import { notFound } from "next/navigation";

// Backend
import { getAllAuthors, getAuthorBySlug } from "@/lib/mdx";

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

export async function generateStaticParams() {
  const authors = await getAllAuthors();

  return authors.map((author) => ({
    slug: [author.slug.current],
  }));
}

/**
 * Generate the Metadata settings for this page
 */
export const generateMetadata = async ({ params: { slug } }: Props) => {
  const parsedSlug = parseSlugToString(slug).replace(/^people\//, "");
  const author = await getAuthorBySlug(parsedSlug);

  if (!author) {
    return {
      title: "Person Not Found",
      description: "",
    };
  }

  const thumbnailUrl = author.avatar || "/images/logo.png";

  return {
    title: author.name,
    description: author.bio,
    openGraph: {
      url: `https://www.langflow.org/people/${parsedSlug}`,
      title: formatOpenGraphTitle(author.name),
      description: author.bio,
      siteName: "Langflow",
      images: [thumbnailUrl],
    },
  };
};

const DynamicPage: FC<Props> = async ({ params: { slug } }) => {
  const parsedSlug = parseSlugToString(slug).replace(/^people\//, "");
  const author = await getAuthorBySlug(parsedSlug);

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
