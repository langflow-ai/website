// Dependencies
import type { Metadata } from 'next';
import { Suspense } from 'react';

//Components
import Page from '@/components/layout/page';
import Template from '@/components/pages/EventsHub/Template';

export const generateMetadata = (): Metadata => {
  return {
    title: 'Events | Langflow',
    description: 'Langflow Events'
  };
};

const EventsPage = async () => {
  return (
    <Page className="layout " type="normal">
      <Suspense fallback={<div>Loading...</div>}>
        <Template />
      </Suspense>
    </Page>
  );
};

export default EventsPage;
