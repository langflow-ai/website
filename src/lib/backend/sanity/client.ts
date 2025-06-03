// Dependencies
import { createClient, QueryParams, type SanityClient } from "next-sanity";

// Config
import { config } from "./config";

// Client
export const client: SanityClient = createClient(config);

export const sanityFetch = async <QueryResponse>(
  query: string,
  params: QueryParams = {}
) => {
  return await client.fetch<QueryResponse>(query, params);
};
