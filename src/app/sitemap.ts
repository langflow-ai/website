import { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/backend/sanity/client";
import { PageForSiteMap } from "@/lib/types/sanity";
import {
  PUBLISHED_BLOG_POSTS_QUERY,
  PUBLISHED_EVENTS_QUERY,
  PUBLISHED_PAGES_QUERY,
} from "@/lib/backend/sanity/queries";

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

  const pages = await sanityFetch<PageForSiteMap[]>(PUBLISHED_PAGES_QUERY);
  const pageUrls = pages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: page._updatedAt,
    changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
    priority: 0.6,
  }));

  // Combine all URLs
  return [...staticPages, ...blogPostsUrls, ...eventUrls, ...pageUrls];
}
