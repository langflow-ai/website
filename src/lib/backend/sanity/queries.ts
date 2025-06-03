import { defineQuery } from "next-sanity";

export const ALL_PAGES_QUERY = defineQuery(`
*[_type == "page" && defined(seo.slug.current)]{
  _id, 
  seo {
    title,
    slug,
  },
}
`);

export const PAGE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && defined(seo.slug.current) && seo.slug.current in $slugs][0] {
    _id,
    seo,
    sections,
  }
`);

export const METADATA_BY_SLUG_QUERY = defineQuery(`
  *[_type == "page" && defined(seo.slug.current) && seo.slug.current in $slugs][0].seo
`);