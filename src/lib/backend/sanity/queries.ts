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

export const VALIDATE_DOCUMENT_BY_SLUG_QUERY = defineQuery(`
  count(*[_type == "page" && defined(seo.slug.current) && seo.slug.current in $slugs])
`);

export const PAGES_SLUGS_QUERY = defineQuery(`
  *[
    _type == "page"
    && defined(seo.slug.current)
    && !(_id in path("drafts.**"))
  ].seo.slug.current
  `);
