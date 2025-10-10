import Page from "@/components/layout/page";
import CategoriesTemplate from "@/components/pages/UseCases/Categories/Template";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Use Cases by Category",
    description: "Browse AI workflow templates organized by category. Find the perfect template for customer support, content generation, data analysis, RAG systems, and more.",
    openGraph: {
      url: "https://langflow.org/use-cases/categories",
      siteName: "Langflow",
      images: [
        {
          url: "/images/use-cases-categories-og-image.png",
          width: 1200,
          height: 630,
          alt: "Langflow Use Cases by Category - AI Workflow Templates",
        },
      ],
    },
  };
};

export default function Categories() {
  return (
    <Page className="layout" type="normal">
      <CategoriesTemplate />
    </Page>
  );
}
