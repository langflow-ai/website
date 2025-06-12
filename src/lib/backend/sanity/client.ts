// Dependencies
import { createClient, QueryParams, type SanityClient } from "next-sanity";

// Config
import { config, PREVIEW_READ_API_KEY_TOKEN } from "./config";

// Client
export const client: SanityClient = createClient(config);

export const sanityFetch = async <QueryResponse>(
  query: string,
  params: QueryParams = {},
  isDraftMode = false
) => {
  return await client.fetch<QueryResponse>(
    query,
    params,
    isDraftMode
      ? {
          token: PREVIEW_READ_API_KEY_TOKEN,
          perspective: "previewDrafts",
          useCdn: false,
          cache: "no-cache",
        }
      : undefined
  );
};
