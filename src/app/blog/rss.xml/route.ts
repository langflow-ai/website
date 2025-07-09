import { NextResponse } from "next/server";
import { BLOG_POSTS_QUERY } from "@/lib/backend/sanity/queries";
import { sanityFetch, getImageUrl } from "@/lib/backend/sanity/client";
import { BlogPost } from "@/lib/types/sanity";
import { generateBlogExcerpt } from "@/lib/utils/generateBlogExcerpt";
import { getBodyText } from "@/lib/utils/getBodyText";

export async function GET() {
  try {
    // Fetch all blog posts
    const posts = await sanityFetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, false);

    // Generate excerpts for posts that don't have them
    const postsWithExcerpts = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        excerpt: post.excerpt ?? (await generateBlogExcerpt(post.body)) ?? "",
      }))
    );

    // Generate RSS XML
    const rssItems = postsWithExcerpts
      .map((post) => {
        const postUrl = `https://langflow.org/blog/${post.slug.current}`;
        const pubDate = new Date(post.publishedAt).toUTCString();
        const imageUrl = getImageUrl(post.featureImage);
        const description = post.excerpt || getBodyText(post.body).substring(0, 200) + "...";
        
        return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${description}]]></description>
      <author>${post.author.name}</author>
      ${imageUrl ? `<enclosure url="${imageUrl}" length="0" type="image/jpeg" />` : ""}
    </item>`;
      })
      .join("");

    const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Langflow Blog</title>
    <description>Explore the latest news, updates, and insights from the Langflow team. Learn about the latest features, best practices, and how to get the most out of Langflow.</description>
    <link>https://www.langflow.org/blog</link>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://www.langflow.org/blog/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>https://langflow.org/images/logo.png</url>
      <title>Langflow Blog</title>
      <link>https://www.langflow.org/blog</link>
    </image>${rssItems}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/rss+xml; charset=utf-8",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new NextResponse("Error generating RSS feed", { status: 500 });
  }
}