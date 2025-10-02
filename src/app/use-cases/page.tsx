import Page from "@/components/layout/page";
import Template from "@/components/pages/UseCases/Template";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Use Cases",
    description: "Discover AI workflows and templates for every use case. Browse our collection of ready-to-use Langflow templates for customer support, content generation, data analysis, and more.",
    openGraph: {
      url: "https://langflow.org/use-cases",
      siteName: "Langflow",
      images: [
        {
          url: "/images/use-cases-og-image.png",
          width: 1200,
          height: 630,
          alt: "Langflow Use Cases - AI Workflow Templates",
        },
      ],
    },
  };
};

export default function UseCases() {
  return (
    <Page className="layout" type="normal">
      <Template />
    </Page>
  );
}
