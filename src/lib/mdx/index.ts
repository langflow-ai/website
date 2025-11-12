import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { Event, Page } from "@/lib/types/sanity.types";
import type { BlogPost, AuthorClip } from "@/lib/types/sanity";

// Define content directories
const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const EVENTS_DIR = path.join(CONTENT_DIR, "events");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const AUTHORS_DIR = path.join(CONTENT_DIR, "authors");

// Type definitions for frontmatter (internal use)
interface BlogPostFrontmatter {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  featureImage?: string;
  author?: string; // Legacy single author
  authors?: string[];
  tags?: string[];
}

interface EventFrontmatter {
  title: string;
  slug: string;
  excerpt?: string;
  type?: "virtual" | "in-person";
  dates?: Array<{
    date: string;
    time?: string;
    timezone?: string;
  }>;
  location?: string;
  thumbnail?: string;
}

interface PageFrontmatter {
  title: string;
  slug: string;
  thumbnail?: string;
}

export interface Author {
  name: string;
  slug: string;
  bio?: string;
  avatar?: string;
  location?: string;
  social?: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    website?: string | null;
  };
}

/**
 * Get file modification time
 */
function getFileModTime(filePath: string): string {
  const stats = fs.statSync(filePath);
  return stats.mtime.toISOString();
}

/**
 * Helper to load author data
 */
async function loadAuthorClip(authorSlug: string): Promise<AuthorClip | null> {
  const author = await getAuthorBySlug(authorSlug);
  if (author) {
    return {
      name: author.name || "Unknown",
      slug: { current: author.slug },
      avatar: author.avatar,
    };
  }
  return { name: authorSlug };
}

/**
 * Get all blog posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(BLOG_DIR);
  const posts = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => {
        const filePath = path.join(BLOG_DIR, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data, content } = matter(fileContents);
        const frontmatter = data as BlogPostFrontmatter;
        const slug = frontmatter.slug || fileName.replace(/\.mdx$/, "");

        // Load author data
        let authors: AuthorClip[] = [];
        if (frontmatter.authors && Array.isArray(frontmatter.authors)) {
          authors = await Promise.all(
            frontmatter.authors.map((authorSlug) => loadAuthorClip(authorSlug))
          ).then((results) => results.filter((a): a is AuthorClip => a !== null));
        }

        // Support legacy single author field
        const authorResult = frontmatter.author
          ? await loadAuthorClip(frontmatter.author)
          : undefined;
        const author = authorResult !== null ? authorResult : undefined;

        const post: BlogPost = {
          _id: slug,
          title: frontmatter.title || "",
          slug: { current: slug },
          excerpt: frontmatter.excerpt,
          body: content,
          publishedAt: frontmatter.publishedAt || new Date().toISOString(),
          featureImage: frontmatter.featureImage || "",
          author,
          authors,
        };

        return post;
      })
  );

  // Sort by publishedAt date, newest first
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogPostFrontmatter;

  // Load author data
  let authors: AuthorClip[] = [];
  if (frontmatter.authors && Array.isArray(frontmatter.authors)) {
    authors = await Promise.all(
      frontmatter.authors.map((authorSlug) => loadAuthorClip(authorSlug))
    ).then((results) => results.filter((a): a is AuthorClip => a !== null));
  }

  // Support legacy single author field
  const authorResult = frontmatter.author
    ? await loadAuthorClip(frontmatter.author)
    : undefined;
  const author = authorResult !== null ? authorResult : undefined;

  const post: BlogPost = {
    _id: slug,
    title: frontmatter.title || "",
    slug: { current: frontmatter.slug || slug },
    excerpt: frontmatter.excerpt,
    body: content,
    publishedAt: frontmatter.publishedAt || new Date().toISOString(),
    featureImage: frontmatter.featureImage || "",
    author,
    authors,
  };

  return post;
}

/**
 * Get all events
 */
export async function getAllEvents(): Promise<Event[]> {
  const fileNames = fs.readdirSync(EVENTS_DIR);
  const events = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const filePath = path.join(EVENTS_DIR, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as EventFrontmatter;
      const slug = frontmatter.slug || fileName.replace(/\.mdx$/, "");

      // Parse dates array
      const dates = frontmatter.dates
        ? frontmatter.dates.map((d) => ({
            _key: `${d.date}-${d.time || ""}`,
            _type: "dateWithTimeField" as const,
            date: d.date,
            time: d.time,
            timezone: d.timezone,
          }))
        : [];

      const event: Event = {
        _id: slug,
        _type: "event" as const,
        _createdAt: getFileModTime(filePath),
        _updatedAt: getFileModTime(filePath),
        _rev: "",
        type: frontmatter.type || "virtual",
        title: frontmatter.title || "",
        slug: {
          current: slug,
          source: slug,
          _type: "seoSlug" as const,
        },
        thumbnail: frontmatter.thumbnail,
        excerpt: frontmatter.excerpt,
        body: content,
        dates,
        location: frontmatter.location,
      };

      return event;
    });

  // Sort by first date, newest first
  return events.sort((a, b) => {
    const dateA = a.dates?.[0]?.date || "";
    const dateB = b.dates?.[0]?.date || "";
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
}

/**
 * Get a single event by slug
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const filePath = path.join(EVENTS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as EventFrontmatter;

  // Parse dates array
  const dates = frontmatter.dates
    ? frontmatter.dates.map((d) => ({
        _key: `${d.date}-${d.time || ""}`,
        _type: "dateWithTimeField" as const,
        date: d.date,
        time: d.time,
        timezone: d.timezone,
      }))
    : [];

  const event: Event = {
    _id: slug,
    _type: "event" as const,
    _createdAt: getFileModTime(filePath),
    _updatedAt: getFileModTime(filePath),
    _rev: "",
    type: frontmatter.type || "virtual",
    title: frontmatter.title || "",
    slug: {
      current: frontmatter.slug || slug,
      source: frontmatter.slug || slug,
      _type: "seoSlug" as const,
    },
    thumbnail: frontmatter.thumbnail,
    excerpt: frontmatter.excerpt,
    body: content,
    dates,
    location: frontmatter.location,
  };

  return event;
}

/**
 * Get all pages
 */
export async function getAllPages(): Promise<Page[]> {
  const fileNames = fs.readdirSync(PAGES_DIR);
  const pages = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const filePath = path.join(PAGES_DIR, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContents);
      const frontmatter = data as PageFrontmatter;
      const slug = frontmatter.slug || fileName.replace(/\.mdx$/, "");

      const page: Page = {
        _id: slug,
        _type: "page" as const,
        _createdAt: getFileModTime(filePath),
        _updatedAt: getFileModTime(filePath),
        _rev: "",
        title: frontmatter.title || "",
        slug: {
          current: slug,
          source: slug,
          _type: "seoSlug" as const,
        },
        thumbnail: frontmatter.thumbnail,
        body: content,
      };

      return page;
    });

  return pages;
}

/**
 * Get a single page by slug
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  const filePath = path.join(PAGES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as PageFrontmatter;

  const page: Page = {
    _id: slug,
    _type: "page" as const,
    _createdAt: getFileModTime(filePath),
    _updatedAt: getFileModTime(filePath),
    _rev: "",
    title: frontmatter.title || "",
    slug: {
      current: frontmatter.slug || slug,
      source: frontmatter.slug || slug,
      _type: "seoSlug" as const,
    },
    thumbnail: frontmatter.thumbnail,
    body: content,
  };

  return page;
}

/**
 * Get all authors
 */
export async function getAllAuthors(): Promise<Author[]> {
  const fileNames = fs.readdirSync(AUTHORS_DIR);
  const authors = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(AUTHORS_DIR, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      return JSON.parse(fileContents) as Author;
    });

  return authors;
}

/**
 * Get a single author by slug
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const authors = await getAllAuthors();
  return authors.find((author) => author.slug === slug) || null;
}
