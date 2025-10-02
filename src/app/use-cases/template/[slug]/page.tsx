import TemplateDetailTemplate from "@/components/pages/UseCases/TemplateDetail/Template";
import { getTemplateBySlug } from "@/lib/use-cases/mock-data";
import { notFound } from "next/navigation";

interface TemplateDetailPageProps {
  params: {
    slug: string;
  };
}

export default function TemplateDetailPage({ params }: TemplateDetailPageProps) {
  const template = getTemplateBySlug(params.slug);

  if (!template) {
    notFound();
  }

  return <TemplateDetailTemplate template={template} />;
}

