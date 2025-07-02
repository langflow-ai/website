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
    }
  }
`);
