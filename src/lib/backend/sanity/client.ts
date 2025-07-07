// Dependencies
import { createClient, QueryParams, type SanityClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

// Config
import { config, PREVIEW_READ_API_KEY_TOKEN } from "./config";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Client
export const client: SanityClient = createClient(config);

const builder = imageUrlBuilder(client);
export const getImageUrl = (source: SanityImageSource): string => builder.image(source).url();

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
