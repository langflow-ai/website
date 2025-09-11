import { sanityFetch } from "@/lib/backend/sanity/client";
import {
    PUBLISHED_BLOG_POSTS_QUERY,
    PUBLISHED_EVENTS_QUERY,
} from "@/lib/backend/sanity/queries";
import { PageForSiteMap } from "@/lib/types/sanity";
import { MetadataRoute } from "next";

const CHANGE_FREQUENCIES = {
  ALWAYS: "always",
  HOURLY: "hourly",
  DAILY: "daily",
  WEEKLY: "weekly",
  MONTHLY: "monthly",
  YEARLY: "yearly",
  NEVER: "never",
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.langflow.org";

  // Current date for lastModified
  const date = new Date();

  const staticPages = [
    {
      url: baseUrl,
      lastModified: date,
      changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/desktop`,
      lastModified: date,
      changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: date,
      changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: date,
      changeFrequency: CHANGE_FREQUENCIES.WEEKLY,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: date,
      changeFrequency: CHANGE_FREQUENCIES.WEEKLY,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: date,
      changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
      priority: 0.6,
    },
  ];

  const blogPosts = await sanityFetch<PageForSiteMap[]>(
    PUBLISHED_BLOG_POSTS_QUERY
  );
  const blogPostsUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post._updatedAt,
    changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
    priority: 0.7,
  }));

  const events = await sanityFetch<PageForSiteMap[]>(PUBLISHED_EVENTS_QUERY);
  const eventUrls = events.map((event) => ({
    url: `${baseUrl}${event.slug}`,
    lastModified: event._updatedAt,
    changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
    priority: 0.7,
  }));

  // Combine all URLs
  return [...staticPages, ...blogPostsUrls, ...eventUrls];
}
