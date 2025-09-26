export const DEFAULT_TAGLINE = "Low-code AI builder for agentic and RAG applications";
export const SITE_NAME = "Langflow";

// Only used for OpenGraph titles since they don't use Next.js template system
export function formatOpenGraphTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return `${SITE_NAME} | ${DEFAULT_TAGLINE}`;
  }

  return `${pageTitle} | ${SITE_NAME} | ${DEFAULT_TAGLINE}`;
}
