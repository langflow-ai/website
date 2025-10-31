// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://420e92d803f6ae806a98ae82f3a3a1e5@o4509649083891712.ingest.us.sentry.io/4509649085988864",

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  // Prevent wrapping of EventTarget listeners which can cause
  // removeChild errors in some Next.js versions during head link cleanup
  integrations: (defaultIntegrations) =>
    defaultIntegrations.map((integration: any) => {
      if (integration && integration.name === "TryCatch") {
        try {
          // Recreate TryCatch disabling eventTarget wrapping only
          // Other wrappers remain enabled (setTimeout, XHR, etc.)
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const { TryCatch } = require("@sentry/browser").Integrations || {};
          if (TryCatch) {
            return new TryCatch({
              setTimeout: true,
              setInterval: true,
              requestAnimationFrame: true,
              XMLHttpRequest: true,
              eventTarget: false,
            });
          }
        } catch (_e) {
          // fallback to original integration if dynamic require fails
        }
      }
      return integration;
    }),
  ignoreErrors: [
    // As a last resort, silence noisy browser-specific DOM detach errors
    /Cannot read properties of null \(reading 'removeChild'\)/,
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
