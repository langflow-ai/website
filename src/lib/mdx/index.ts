import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Event, Page } from "@/lib/types/sanity.types";
import type { BlogPost, AuthorClip } from "@/lib/types/sanity";

// Define content directories
const CONTENT_DIR = path.join(process.cwd(), "content");
const BLOG_DIR = path.join(CONTENT_DIR, "blog");
const EVENTS_DIR = path.join(CONTENT_DIR, "events");
const PAGES_DIR = path.join(CONTENT_DIR, "pages");
const PEOPLE_DIR = path.join(CONTENT_DIR, "people");
const TALKS_DIR = path.join(CONTENT_DIR, "talks");

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
  talks?: string[];
}

interface PageFrontmatter {
  title: string;
  slug: string;
  thumbnail?: string;
}

export interface Talk {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  date?: string;
  time?: string;
  duration?: number;
  location?: string;
  body?: string;
  slides?: string;
  recording?: string;
  resources?: Array<{
    title?: string;
    url?: string;
  }>;
  speakers?: Array<{
    _id: string;
    name: string;
    slug?: { current: string };
    avatar?: string;
  }>;
  event?: {
    _id: string;
    title?: string;
    slug?: { current: string };
    type?: "virtual" | "in-person";
    dates?: any[];
    location?: string;
  };
  thumbnail?: any;
}

export interface Author {
  _id: string;
  name: string;
  slug: { current: string };
  bio?: string;
  avatar?: string;
  location?: string;
  social?: {
    github?: string | null;
    linkedin?: string | null;
    twitter?: string | null;
    website?: string | null;
  };
  talks?: Talk[];
  events?: Event[];
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
function loadAuthorClip(authorSlug: string): AuthorClip | null {
  const author = getAuthorBySlugBasic(authorSlug);
  if (author) {
    return {
      name: author.name || "Unknown",
      slug: author.slug,
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
          authors = frontmatter.authors
            .map((authorSlug) => loadAuthorClip(authorSlug))
            .filter((a): a is AuthorClip => a !== null);
        }

        // Support legacy single author field
        const authorResult = frontmatter.author
          ? loadAuthorClip(frontmatter.author)
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
    authors = frontmatter.authors
      .map((authorSlug) => loadAuthorClip(authorSlug))
      .filter((a): a is AuthorClip => a !== null);
  }

  // Support legacy single author field
  const authorResult = frontmatter.author
    ? loadAuthorClip(frontmatter.author)
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

  // Load talks if specified
  let talks: Talk[] = [];
  if (frontmatter.talks && Array.isArray(frontmatter.talks)) {
    talks = await Promise.all(
      frontmatter.talks.map((talkSlug) => getTalkBySlug(talkSlug))
    ).then((results) => results.filter((t): t is Talk => t !== null));
  }

  const event: Event & { talks?: Talk[] } = {
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
    talks: talks.length > 0 ? talks : undefined,
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
 * Get all authors (basic info only, no talks/events)
 */
function getAllAuthorsBasic(): Author[] {
  const fileNames = fs.readdirSync(PEOPLE_DIR);
  const authors = fileNames
    .filter((fileName) => fileName.endsWith(".json"))
    .map((fileName) => {
      const filePath = path.join(PEOPLE_DIR, fileName);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const authorData = JSON.parse(fileContents) as {
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
      };
      return {
        _id: authorData.slug,
        name: authorData.name,
        slug: { current: authorData.slug },
        bio: authorData.bio,
        avatar: authorData.avatar,
        location: authorData.location,
        social: authorData.social,
      };
    });

  return authors;
}

/**
 * Get all authors
 */
export async function getAllAuthors(): Promise<Author[]> {
  return getAllAuthorsBasic();
}

/**
 * Get a single author by slug (basic info only, no talks/events)
 */
function getAuthorBySlugBasic(slug: string): Author | null {
  const authors = getAllAuthorsBasic();
  return authors.find((author) => author.slug.current === slug) || null;
}

/**
 * Get a single author by slug (with talks and events)
 */
export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const author = getAuthorBySlugBasic(slug);

  if (!author) {
    return null;
  }

  // Find all talks where this author is a speaker
  const allTalks = await getAllTalks();
  let authorTalks = allTalks.filter((talk) =>
    talk.speakers?.some((speaker) => speaker.slug?.current === slug)
  );

  // Find events where this author's talks are featured
  const allEvents = await getAllEvents();
  const authorEventSlugs = new Set(
    authorTalks
      .map((talk) => talk.event?.slug?.current)
      .filter((slug): slug is string => !!slug)
  );

  const authorEvents = allEvents.filter((event) =>
    authorEventSlugs.has(event.slug?.current || "")
  );

  // Enrich talks with full event data
  authorTalks = authorTalks.map((talk) => {
    if (talk.event?.slug?.current) {
      const fullEvent = authorEvents.find(
        (e) => e.slug?.current === talk.event?.slug?.current
      );
      if (fullEvent && fullEvent.slug?.current) {
        return {
          ...talk,
          event: {
            _id: fullEvent._id,
            title: fullEvent.title,
            slug: { current: fullEvent.slug.current },
            type: fullEvent.type,
            dates: fullEvent.dates,
            location: fullEvent.location,
          },
        };
      }
    }
    return talk;
  });

  return {
    ...author,
    talks: authorTalks,
    events: authorEvents,
  } as any;
}

/**
 * Talk-related types and functions
 */
interface TalkFrontmatter {
  title: string;
  slug: string;
  description?: string;
  date?: string;
  time?: string;
  duration?: number;
  location?: string;
  speakers?: string[];
  event?: string;
  thumbnail?: string;
  slides?: string;
  recording?: string;
  resources?: Array<{
    title?: string;
    url?: string;
  }>;
}

/**
 * Get all talks
 */
export async function getAllTalks(): Promise<Talk[]> {
  if (!fs.existsSync(TALKS_DIR)) {
    return [];
  }

  const fileNames = fs.readdirSync(TALKS_DIR);
  const talks = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.mdx$/, "");
        return getTalkBySlug(slug);
      })
  );

  return talks.filter((talk): talk is Talk => talk !== null);
}

/**
 * Get a single talk by slug
 */
export async function getTalkBySlug(slug: string): Promise<Talk | null> {
  const filePath = path.join(TALKS_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const frontmatter = data as TalkFrontmatter;

  // Load speaker data
  let speakers: Array<{
    _id: string;
    name: string;
    slug?: { current: string };
    avatar?: string;
  }> = [];

  if (frontmatter.speakers && Array.isArray(frontmatter.speakers)) {
    speakers = frontmatter.speakers.map((speakerSlug) => {
      const author = getAuthorBySlugBasic(speakerSlug);
      if (author) {
        return {
          _id: author.slug.current || speakerSlug,
          name: author.name || "Unknown",
          slug: author.slug,
          avatar: author.avatar,
        };
      }
      return {
        _id: speakerSlug,
        name: speakerSlug,
        slug: { current: speakerSlug },
      };
    });
  }

  // Store event slug reference (don't load full event to avoid circular dependency)
  let event: Talk["event"] = undefined;
  if (frontmatter.event) {
    // Just store a minimal reference - the full event can be loaded on the page if needed
    event = {
      _id: frontmatter.event,
      slug: { current: frontmatter.event },
    };
  }

  // Combine date and time into a single datetime string
  let combinedDate = frontmatter.date;
  if (frontmatter.date && frontmatter.time) {
    // Combine date (YYYY-MM-DD) with time (HH:MM) in Pacific timezone
    combinedDate = `${frontmatter.date}T${frontmatter.time}:00-08:00`;
  }

  const talk: Talk = {
    _id: slug,
    title: frontmatter.title || "",
    slug: { current: frontmatter.slug || slug },
    description: frontmatter.description,
    date: combinedDate,
    time: frontmatter.time,
    duration: frontmatter.duration,
    location: frontmatter.location,
    body: content,
    slides: frontmatter.slides,
    recording: frontmatter.recording,
    resources: frontmatter.resources,
    speakers,
    event,
    thumbnail: frontmatter.thumbnail,
  };

  return talk;
}
