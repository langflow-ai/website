//Components
import Page from "@/components/layout/page";
import Template from "@/components/pages/Preferences/Template";
import type { Metadata } from "next";
import { Suspense } from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Cookie Preferences",
    description: "Manage your cookie preferences for the Langflow website",
  };
};

const Desktop = async () => {
  return (
    <Page className="layout " type="desktop">
      <Suspense fallback={<div>Loading...</div>}>
        <Template />
      </Suspense>
    </Page>
  );
};

export default Desktop;
