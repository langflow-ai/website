import { defineQuery } from "next-sanity";

/**
 * Get a single page by its slug and based on single type.
 *
 */
export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == $type && defined(slug.current) && slug.current in $slugs][0] {
    _id,
    ...,
  }
`);

/**
 * Get the metadata for a single page type based on its slug and type.
 *
 */
export const METADATA_BY_SLUG_QUERY = defineQuery(`
  *[_type == $type && defined(slug.current) && slug.current in $slugs][0] {
    title,
    slug,
    "thumbnail": thumbnail.asset->url
  }
`);

/**
 * check if page exists based on its slug
 */
export const VALIDATE_DOCUMENT_BY_SLUG_QUERY = defineQuery(`
  count(*[
    _type in ["page", "event", "post", "talk", "author"] // Doing this to avoid timeout errors
    && defined(slug.current) && slug.current in $slugs
  ])
`);

/**
 * Get all the slugs of pages based on type
 *
 */
export const PAGES_SLUGS_QUERY = defineQuery(`
  *[
    _type == $type
    && defined(slug.current)
    && !(_id in path("drafts.**"))
  ].slug.current
`);

/**
 * Get upcoming paginated events based on query params.
 */
export const API_GET_UPCOMING_EVENTS_QUERY = defineQuery(`
  {
    "count": count(*[ _type == "event" && !(_id in path("drafts.**")) && count((dates[].date)[@ >= $from]) > 0 ]),
    "results": *[
      _type == "event"
      && !(_id in path("drafts.**"))
      && count((dates[].date)[@ >= $from]) > 0
    ] | order(dates[0].date asc, seo.title asc) [$start...$end] {
      "dates": dates,
      "description": excerpt,
      "body": body,
      "slug": slug.current,
      "thumbnail": thumbnail,
      "title": title,
      "type": type,
    }
  }
`);

/**
 * Get on demand paginated events based on query params.
 */
export const API_GET_ON_DEMAND_EVENTS_QUERY = defineQuery(`
  {
    "count": count(*[ _type == "event" && !(_id in path("drafts.**")) && count((dates[].date)[@ <= $from]) > 0 ]),
    "results": *[
      _type == "event"
      && !(_id in path("drafts.**"))
      && count((dates[].date)[@ <= $from]) > 0
    ] | order(dates[0].date desc, seo.title asc) [$start...$end] {
      "dates": dates,
      "description": excerpt,
      "body": body,
      "slug": slug.current,
      "thumbnail": thumbnail,
      "title": title,
      "type": type,
    }
  }
`);

/**
 * Fetch all published events with their slug and updated date
 */
export const PUBLISHED_EVENTS_QUERY = defineQuery(`
  *[_type == "event" && defined(slug.current) && !(_id in path("drafts.**"))] {
    _id,
    "slug": slug.current,
    _updatedAt
  }
`);

// BLOG: Fetch all posts with necessary fields ordered by published date
export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    featureImage,
    "author": author-> {
      name,
      slug,
      avatar
    },
    authors[]-> {
      name,
      slug,
      avatar
    }
  }
`);

// BLOG: Fetch all post slugs for static generation
export const BLOG_POSTS_SLUGS_QUERY = defineQuery(`
  *[
    _type == "post" && defined(slug.current) && !(_id in path("drafts.**"))
  ].slug.current
`);

// BLOG: Fetch a single post by slug
export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    featureImage,
    "author": author-> {
      name,
      slug,
      avatar
    },
    authors[]-> {
      name,
      slug,
      avatar
    }
  }
`);

// BLOG: Fetch published blog posts with their slug and updated date
export const PUBLISHED_BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    "slug": slug.current,
    _updatedAt
  }
`);

export const BLOG_POSTS_PAGINATED_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[$start...$end] {
    _id,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    featureImage,
    "author": author-> {
      name,
      slug,
      avatar
    },
    authors[]-> {
      name,
      slug,
      avatar
    }
  }
`);

// Fetch published pages with their slug and updated date for sitemap
export const PUBLISHED_PAGES_QUERY = defineQuery(`
  *[_type == "page" && defined(slug.current) && !(_id in path("drafts.**"))] {
    _id,
    "slug": slug.current,
    _updatedAt
  }
`);

// TALK: Fetch all talk slugs for static generation
export const TALK_SLUGS_QUERY = defineQuery(`
  *[
    _type == "talk" && defined(slug.current) && !(_id in path("drafts.**"))
  ].slug.current
`);

// TALK: Fetch a single talk by slug
export const TALK_BY_SLUG_QUERY = defineQuery(`
  *[_type == "talk" && slug.current in $slugs][0] {
    _id,
    title,
    slug,
    description,
    body,
    date,
    duration,
    location,
    "slides": slides.asset->url,
    recording,
    thumbnail,
    resources[] {
      _key,
      _type,
      label,
      url
    },
    "speakers": speakers[]-> {
      _id,
      name,
      slug,
      avatar,
      bio
    },
    "event": event-> {
      _id,
      title,
      slug,
      type,
      dates,
      location
    },
    tags[]-> {
      _id,
      title,
      slug
    },
    seo
  }
`);

// TALK: Fetch published talks with their slug and updated date
export const PUBLISHED_TALKS_QUERY = defineQuery(`
  *[_type == "talk" && defined(slug.current) && !(_id in path("drafts.**"))] {
    _id,
    "slug": slug.current,
    _updatedAt
  }
`);

// EVENT: Fetch event with talks
export const EVENT_WITH_TALKS_QUERY = defineQuery(`
  *[_type == "event" && slug.current in $slugs][0] {
    _id,
    ...,
    "talks": *[_type == "talk" && references(^._id)] | order(date asc) {
      _id,
      title,
      slug,
      description,
      date,
      duration,
      location,
      thumbnail,
      "speakers": speakers[]-> {
        _id,
        name,
        slug,
        avatar
      }
    }
  }
`);

// AUTHOR: Fetch author by slug with posts, talks, and events
export const AUTHOR_BY_SLUG_QUERY = defineQuery(`
  *[_type == "author" && slug.current in $slugs][0] {
    _id,
    name,
    slug,
    bio,
    avatar,
    location,
    twitter,
    linkedin,
    github,
    website,
    "posts": *[_type == "post" && (author._ref == ^._id || ^._id in authors[]._ref)] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
      featureImage
    },
    "talks": *[_type == "talk" && ^._id in speakers[]._ref] | order(date desc) {
      _id,
      title,
      slug,
      description,
      date,
      duration,
      location,
      thumbnail,
      "event": event-> {
        _id,
        title,
        slug,
        type
      }
    },
    "events": *[_type == "event" && ^._id in *[_type == "talk" && references(^._id)].speakers[]._ref] | order(dates[0].date desc) {
      _id,
      title,
      slug,
      type,
      dates,
      location,
      thumbnail
    }
  }
`);

// AUTHOR: Fetch all author slugs for static generation
export const AUTHOR_SLUGS_QUERY = defineQuery(`
  *[
    _type == "author" && defined(slug.current) && !(_id in path("drafts.**"))
  ].slug.current
`);

// REVALIDATION: Fetch talk slugs for an event by event slug
export const TALK_SLUGS_BY_EVENT_QUERY = defineQuery(`
  *[_type == "event" && slug.current in $slugs][0] {
    "talkSlugs": *[_type == "talk" && references(^._id) && defined(slug.current) && !(_id in path("drafts.**"))].slug.current | filter(!isNull(@))
  }
`);

// REVALIDATION: Fetch author slugs for a talk by talk slug
export const AUTHOR_SLUGS_BY_TALK_QUERY = defineQuery(`
  *[_type == "talk" && slug.current in $slugs][0] {
    "authorSlugs": speakers[]->[defined(slug.current) && !(_id in path("drafts.**"))].slug.current | filter(!isNull(@))
  }
`);
