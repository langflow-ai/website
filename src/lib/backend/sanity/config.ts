import { ClientConfig } from "next-sanity";

export const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2025-06-02", // https://www.sanity.io/docs/api-versioning
  useCdn: true,
  perspective: "published",
  stega: false,
};
