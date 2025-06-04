//Components
import Page from "@/components/layout/page";
import Template from "@/components/pages/DesktopFormComplete/Template";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Desktop Form Complete | Langflow",
    description: "Langflow Desktop Form Complete",
  };
};

const DesktopFormComplete = async () => {
  return (
    <Page className="layout layout-dark">
      <Template />
    </Page>
  );
};

export default DesktopFormComplete;
