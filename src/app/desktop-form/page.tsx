// Dependencies
import { Suspense } from "react";

// Components
import Page from "@/components/layout/page";
import Template from "@/components/pages/DesktopForm/Template";

export default function DesktopForm() {
  return (
    <Page className="layout layout-dark">
      <Suspense fallback={<div>Loading...</div>}>
        <Template />
      </Suspense>
    </Page>
  );
}
