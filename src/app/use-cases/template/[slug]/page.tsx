import TemplateDetailTemplate from "@/components/pages/UseCases/TemplateDetail/Template";
import { getTemplate } from "@/data/templates";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface TemplateDetailPageProps {
  params: {
    slug: string;
  };
}

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  // Note: this route relies on data/templates.getTemplate which returns the normalized Template type
  // with title, summary and thumbnailUrl used across the Use Cases pages
  // We purposefully do a synchronous call pattern here because generateMetadata handles async
  // and runtime rendering will fetch again as needed.
  const template = require("@/data/templates").getTemplate(params.slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetailTemplate template={template} />;
}

export async function generateMetadata({ params }: TemplateDetailPageProps): Promise<Metadata> {
  const template = await getTemplate(params.slug);

  if (!template) {
    return {
      title: "Use Case Not Found",
      description: "The requested use case could not be found.",
    };
  }

  const title = template.title;
  const description = template.summary;
  const image = template.thumbnailUrl || "/images/og-image.png";
  const url = `https://www.langflow.org/use-cases/template/${params.slug}`;

  return {
    title,
    description,
    openGraph: {
      url,
      siteName: "Langflow",
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

