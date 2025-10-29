import Page from "@/components/layout/page";
import CategoryTemplate from "@/components/pages/UseCases/Category/Template";
import { getCategoryBySlug } from "@/lib/use-cases/mock-data";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  
  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} Templates`,
    description: category.description,
    openGraph: {
      url: `https://langflow.org/use-cases/category/${params.slug}`,
      siteName: "Langflow",
      images: [
        {
          url: `/images/use-cases-${params.slug}-og-image.png`,
          width: 1200,
          height: 630,
          alt: `Langflow ${category.name} Templates - AI Workflow Templates`,
        },
      ],
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Page className="layout" type="normal">
      <CategoryTemplate slug={params.slug} />
    </Page>
  );
}
