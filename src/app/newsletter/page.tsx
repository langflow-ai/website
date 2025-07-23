//Components
import Page from "@/components/layout/page";
import Template from "@/components/pages/Newsletter/Template/Template";
import type { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "AI++ Newsletter | Langflow",
    description:
      "Sign up for the AI++ Newsletter to stay updated with the latest in AI, Agents and MCP.",
  };
};

const Desktop = async () => {
  return (
    <Page className="layout" type="desktop">
      <Template />
    </Page>
  );
};

export default Desktop;
