# Talk and Author Implementation

This document outlines the implementation of Talk documents and expanded Author pages for the Langflow website.

## Overview

- **Talk Documents**: A new document type that can be attached to Events, allowing multiple talks per event (e.g., 6 talks for OpenRAG summit)
- **Author Pages**: Expanded author profiles showing posts, talks, events, bio, and social links
- **Event Integration**: Events now display all associated talks

## Sanity Schema Changes

### 1. Talk Document Schema

Add the Talk schema to your Sanity Studio. The schema file is located at:
- `sanity-schemas/talk.ts`

This schema includes:
- Title, slug, description, body
- Speakers (references to Author documents)
- Event reference (optional, for standalone talks)
- Date, duration, location
- Thumbnail image
- Slides and recording URLs
- Tags
- SEO fields

### 2. Author Schema Updates

Add the following fields to your existing Author schema (see `sanity-schemas/author-updates.ts`):
- `twitter` (string) - Twitter/X handle
- `linkedin` (url) - LinkedIn URL
- `github` (string) - GitHub username
- `website` (url) - Personal website URL

The existing Author schema should already have:
- name, slug, bio, avatar, location

## Implementation Details

### Routes Created

1. **Talk Pages**: `/talks/[...slug]`
   - Displays individual talk details
   - Shows speakers, event (if attached), date, duration, location
   - Links to slides and recordings if available

2. **Author Pages**: `/authors/[...slug]`
   - Displays author profile with bio and social links
   - Shows all posts by the author
   - Shows all talks by the author
   - Shows all events the author has spoken at

### Queries Added

All queries are in `src/lib/backend/sanity/queries.ts`:

- `TALK_SLUGS_QUERY` - Get all talk slugs for static generation
- `TALK_BY_SLUG_QUERY` - Get a single talk with all related data
- `PUBLISHED_TALKS_QUERY` - Get published talks for sitemap
- `EVENT_WITH_TALKS_QUERY` - Get event with all associated talks
- `AUTHOR_BY_SLUG_QUERY` - Get author with posts, talks, and events
- `AUTHOR_SLUGS_QUERY` - Get all author slugs for static generation

### Components Created

#### Talk Components
- `src/components/pages/Talk/Template` - Main talk page template
- `src/components/pages/Talk/Hero` - Talk hero section
- `src/components/pages/Talk/Speakers` - Speakers list
- `src/components/pages/Talk/Content` - Talk body content
- `src/components/pages/Talk/Links` - Slides and recording links

#### Author Components
- `src/components/pages/Author/Template` - Main author page template
- `src/components/pages/Author/Hero` - Author profile header
- `src/components/pages/Author/Posts` - Author's blog posts
- `src/components/pages/Author/Talks` - Author's talks
- `src/components/pages/Author/Events` - Events author has spoken at

#### Event Components
- `src/components/pages/Event/Talks` - Talks associated with an event

## Next Steps

1. **Add Schemas to Sanity Studio**
   - Import `talk.ts` schema into your Sanity Studio
   - Add the social fields to your Author schema

2. **Generate Types**
   - Run `sanity typegen generate` to update TypeScript types

3. **Create Content**
   - Create Talk documents in Sanity
   - Attach talks to Events
   - Add social links to Author documents

4. **Test**
   - Verify talk pages render correctly
   - Verify author pages show all related content
   - Verify event pages display talks

## Usage Examples

### Creating a Talk for an Event

1. Create a Talk document in Sanity
2. Add speakers (reference Author documents)
3. Reference the Event document
4. Add date, duration, location, and other details
5. The talk will automatically appear on the event page

### Creating a Standalone Talk

1. Create a Talk document
2. Leave the Event field empty
3. Add all other details
4. The talk will be accessible at `/talks/[slug]`

### Author Discovery

Users can now:
- Click on an author name from a blog post
- See all posts, talks, and events by that author
- Follow social links to connect with the author

## URL Structure

- Talks: `/talks/[slug]`
- Authors: `/authors/[slug]`
- Events: `/events/[slug]` (now includes talks section)

## Notes

- Talks can exist without an event (for third-party events)
- Authors are automatically linked through reverse references
- Event pages show all talks when available
- All pages are statically generated for performance


