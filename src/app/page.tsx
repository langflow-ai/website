import Page from "@/components/layout/page";
import Template from "@/components/pages/Home/Template";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    description: "Welcome to Langflow - Build AI applications with ease",
  };
};

export default function Home() {
  return (
    <Page className="layout "  type="home">
      <Template />
    </Page>
  );
}
