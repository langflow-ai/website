//Components
import Page from "@/components/layout/page";
import Template from "@/components/pages/Updated/Template/Template";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Desktop | Langflow",
    description: "Langflow Desktop Application",
  };
};

const Desktop = async () => {
  return (
    <Page className="layout " type="desktop">
      <Template />
    </Page>
  );
};

export default Desktop;
