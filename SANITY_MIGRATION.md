# Complete Sanity CMS to MDX Migration Plan

## Overview
Migrate 65 blog posts, 15 events, 3 pages, and 15 authors from Sanity CMS to local MDX files with 377+ images. Maintain identical URLs and preserve all custom Markdown syntax.

---

## Phase 1: Setup & Configuration

### 1. Install @next/mdx and dependencies
```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install gray-matter reading-time
```

### 2. Configure next.config.js for MDX support

### 3. Create content directory structure
```
/content/
  ├── blog/           # 65 posts
  ├── events/         # 15 events
  ├── pages/          # 3 pages
  └── authors/        # 15 authors (JSON)
/public/content/images/
  ├── posts/
  ├── events/
  ├── pages/
  └── authors/
```

---

## Phase 2: Data Transformation Scripts

### 4. Create migration script (`scripts/migrate-from-sanity.ts`)
- Parse `data.ndjson` and filter published content only (skip drafts)
- Resolve author references (merge single `author` + `authors` array)
- Transform image references from Sanity URLs to local paths
- Convert to MDX files with frontmatter

### 5. Create asset migration script (`scripts/migrate-assets.ts`)
- Copy 377 images from export to `/public/content/images/`
- Organize by content type (posts/events/pages/authors)
- Update image references in transformed content

### 6. Create inline image updater
- Find Sanity CDN URLs in Markdown content (`https://cdn.sanity.io/...`)
- Replace with local paths (`/content/images/...`)

---

## Phase 3: Content Utilities

### 7. Create MDX content loaders (`src/lib/mdx/`)
- `getAllPosts()` - Read all blog post MDX files
- `getPostBySlug(slug)` - Get single post with compiled MDX
- `getAllEvents()` - Read all event MDX files
- `getEventBySlug(slug)` - Get single event
- `getAllPages()` - Read all page MDX files
- `getPageBySlug(slug)` - Get single page
- `getAllAuthors()` - Read author JSON files
- `getAuthorBySlug(slug)` - Get single author

### 8. Create MDX compiler utility
- Configure remark/rehype plugins (remarkGfm, remarkYouTube, rehypeHighlight, etc.)
- Preserve all custom syntax from current Markdown renderer

---

## Phase 4: Update Page Components

### 9. Update `/src/app/blog/[slug]/page.tsx`
- Replace Sanity queries with `getPostBySlug()`
- Update `generateStaticParams()` to use `getAllPosts()`
- Pass compiled MDX to template component

### 10. Update `/src/app/events/[...slug]/page.tsx`
- Replace Sanity queries with `getEventBySlug()`
- Update `generateStaticParams()` to use `getAllEvents()`

### 11. Update `/src/app/[...slug]/page.tsx`
- Replace Sanity queries with `getPageBySlug()`
- Update `generateStaticParams()` to use `getAllPages()`

### 12. Update list pages
- `/src/app/blog/page.tsx` - Use `getAllPosts()` instead of Sanity
- `/src/app/events/page.tsx` - Use `getAllEvents()` instead of Sanity

---

## Phase 5: Update API Routes

### 13. Update `/src/app/api/posts/route.ts`
- Replace Sanity queries with MDX file reads
- Maintain pagination logic

### 14. Update `/src/app/api/events/route.ts`
- Replace Sanity queries with MDX file reads
- Maintain upcoming/on-demand filtering

### 15. Update `/src/app/api/search/route.ts`
- Search MDX files instead of Sanity

### 16. Update `/src/app/blog/rss.xml/route.ts`
- Generate RSS from MDX files

### 17. Update `/src/app/sitemap.ts`
- Generate sitemap from MDX files instead of Sanity queries

---

## Phase 6: Component Updates

### 18. Create MDX wrapper component
- Wrap existing Markdown renderer to work with compiled MDX
- Ensure all custom components work (YouTube embeds, buttons, etc.)

### 19. Update author display components
- Modify Byline component to work with author JSON data
- Update author references in templates

### 20. Test all custom syntax
- `{%youtube VIDEO_ID %}` embeds
- `<button href="/url" variant="BORDER">Text</button>`
- Code blocks with syntax highlighting
- Tables, images with captions

---

## Phase 7: Cleanup & Validation

### 21. Remove Sanity dependencies
- Remove `@sanity/client`, `@sanity/image-url`, `next-sanity`, `next-sanity-image`
- Remove `/src/lib/backend/sanity/` directory
- Remove `sanity.cli.js`

### 22. Validate migration
- Compare production URLs with local dev URLs
- Verify all 65 blog posts render correctly
- Verify all 15 events render correctly
- Verify all 3 pages render correctly
- Check all images load properly
- Test RSS feed, sitemap, API routes

### 23. Update environment variables
- Remove Sanity-related env vars from `.env`

---

## File Counts
- **Blog posts**: 65 MDX files
- **Events**: 15 MDX files
- **Pages**: 3 MDX files
- **Authors**: 15 JSON files
- **Images**: 377 files to migrate
- **Custom components**: 0 new (reuse existing Markdown renderer)

## URL Structure (Preserved)
- Blog: `/blog/[slug]` (65 URLs)
- Events: `/events/[slug]` (15 URLs)
- Pages: `/[slug]` (3 URLs: `/podcast`, etc.)

## Dependencies Added
- `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`
- `gray-matter`, `reading-time`

## Dependencies Removed
- `@sanity/client`, `@sanity/image-url`, `@sanity/cli`
- `next-sanity`, `next-sanity-image`

---

## Migration Decisions

Based on user requirements:
- **Published content only** - Draft documents will be excluded
- **No tag/author pages** - Only migrating existing pages (can add later)
- **API routes preserved** - Will be updated to read from MDX instead of Sanity
- **Talks skipped** - The 7 talk documents won't be migrated (not displayed on site)

## Content Structure Examples

### Blog Post MDX Format
```mdx
---
title: "Langflow 1.6 released"
slug: "langflow-1-6"
excerpt: "Langflow 1.6 is out with OAuth..."
publishedAt: "2025-10-02T01:27:00.000Z"
featureImage: "/content/images/posts/langflow-1-6-hero.jpg"
authors:
  - tejas
  - phil-norton
tags:
  - news
  - releases
---

Content here with all custom syntax preserved...
```

### Event MDX Format
```mdx
---
title: "OpenRAG Summit"
slug: "openrag-summit"
excerpt: "The OpenRAG Summit is a virtual..."
type: "virtual"
dates:
  - date: "2025-11-13"
    time: "09:00"
location: "Online"
thumbnail: "/content/images/events/openrag-summit.jpg"
---

Event content here...
```

### Page MDX Format
```mdx
---
title: "Podcast"
slug: "podcast"
thumbnail: "/content/images/pages/podcast.jpg"
---

Page content here...
```

### Author JSON Format
```json
{
  "name": "Tejas Kumar",
  "slug": "tejas",
  "bio": "Tejas Kumar has been with Langflow...",
  "avatar": "/content/images/authors/tejas.jpg",
  "social": {
    "github": "tejasq",
    "linkedin": "https://linkedin.com/in/tejasq",
    "twitter": "tejaskumar_",
    "website": "https://tej.as"
  },
  "location": "Berlin, Germany"
}
```
