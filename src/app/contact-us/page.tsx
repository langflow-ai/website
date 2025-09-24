//Components
import Page from '@/components/layout/page';
import Template from '@/components/pages/ContactUs/Template/Template';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Contact Us | Langflow',
    description: 'Langflow Desktop Application'
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
