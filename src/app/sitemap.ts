import { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/backend/sanity/client";
import { BlogPost } from "@/lib/types/sanity";
import {
  BLOG_POSTS_QUERY,
  API_GET_UPCOMING_EVENTS_QUERY,
  API_GET_ON_DEMAND_EVENTS_QUERY,
} from "@/lib/backend/sanity/queries";
import { Event } from "@/lib/types/sanity.types";

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

  const blogPosts = await sanityFetch<BlogPost[]>(BLOG_POSTS_QUERY);
  const blogPostsUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: post.publishedAt,
    changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
    priority: 0.7,
  }));

  const upcomingEvents = await sanityFetch<Event[]>(
    API_GET_UPCOMING_EVENTS_QUERY
  );
  const pastEvents = await sanityFetch<Event[]>(API_GET_ON_DEMAND_EVENTS_QUERY);
  const eventUrls = [...upcomingEvents, ...pastEvents].map((event) => ({
    url: `${baseUrl}/events/${event.slug?.current}`,
    lastModified: event._updatedAt,
    changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
    priority: 0.7,
  }));

  // Combine all URLs
  return [...staticPages, ...blogPostsUrls, ...eventUrls];
}
