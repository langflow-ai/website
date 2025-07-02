import { defineQuery } from "next-sanity";

/**
 * Get a single page by its slug and based on single type.
 *
 */
export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == $type && defined(seo.slug.current) && seo.slug.current in $slugs][0] {
    _id,
    seo,
    sections,
    ...,
  }
`);

/**
 * Get the metadata for a single page type based on its slug and type.
 *
 */
export const METADATA_BY_SLUG_QUERY = defineQuery(`
  *[_type == $type && defined(seo.slug.current) && seo.slug.current in $slugs][0].seo
`);

/**
 * check if page exists based on its slug
 */
export const VALIDATE_DOCUMENT_BY_SLUG_QUERY = defineQuery(`
  count(*[
    _type in ["page", "event"]
    && defined(seo.slug.current) && seo.slug.current in $slugs
  ])
`);

/**
 * Get all the slugs of pages based on type
 *
 */
export const PAGES_SLUGS_QUERY = defineQuery(`
  *[
    _type == $type
    && defined(seo.slug.current)
    && !(_id in path("drafts.**"))
  ].seo.slug.current
`);

/**
 * Get upcoming paginated events based on query params.
 */
export const API_GET_UPCOMING_EVENTS_QUERY = defineQuery(`
  {
    "count": count(*[ _type == "event" && !(_id in path("drafts.**")) && count((dates[].date)[@ >= now()]) > 0 ]),
    "results": *[
      _type == "event"
      && !(_id in path("drafts.**"))
      && count((dates[].date)[@ >= now()]) > 0
    ] | order(dates[0].date asc, seo.title asc) [$start...$end] {
      "dates": dates,
      "description": preview.description,
      "slug": seo.slug.current,
      "thumbnail": preview.thumbnail,
      "title": coalesce(preview.title, title, seo.title),
      "type": type,
    }
  }
`);

/**
 * Get on demand paginated events based on query params.
 */
export const API_GET_ON_DEMAND_EVENTS_QUERY = defineQuery(`
  {
    "count": count(*[ _type == "event" && !(_id in path("drafts.**")) && count((dates[].date)[@ <= now()]) > 0 ]),
    "results": *[
      _type == "event"
      && !(_id in path("drafts.**"))
      && count((dates[].date)[@ <= now()]) > 0
    ] | order(dates[0].date asc, seo.title asc) [$start...$end] {
      "dates": dates,
      "description": coalesce(preview.description, introduction),
      "slug": seo.slug.current,
      "thumbnail": preview.thumbnail.asset->url,
      "title": coalesce(preview.title, title, seo.title),
      "type": type,
    }
  }
`);
