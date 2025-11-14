import { MetadataRoute } from "next";
import { getAllPosts, getAllEvents, getAllPages } from "@/lib/mdx";

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

  // Get blog posts from MDX files
  const blogPosts = await getAllPosts();
  const blogPostsUrls = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
    priority: 0.7,
  }));

  // Get events from MDX files
  const events = await getAllEvents();
  const eventUrls = events.map((event) => ({
    url: `${baseUrl}/events/${event.slug?.current || event._id}`,
    lastModified: new Date(event._updatedAt),
    changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
    priority: 0.7,
  }));

  // Get pages from MDX files
  const pages = await getAllPages();
  const pageUrls = pages.map((page) => ({
    // Add leading slash if not present
    url: `${baseUrl}${page.slug?.current?.startsWith("/") ? "" : "/"}${page.slug?.current || page._id}`,
    lastModified: new Date(page._updatedAt),
    changeFrequency: CHANGE_FREQUENCIES.MONTHLY,
    priority: 0.6,
  }));

  // Combine all URLs
  return [...staticPages, ...blogPostsUrls, ...eventUrls, ...pageUrls];
}
