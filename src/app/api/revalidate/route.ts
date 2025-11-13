// Dependencies
import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Backend
import { buildPath } from "@/lib/backend/sanity/utils";
import { sanityFetch } from "@/lib/backend/sanity/client";
import {
  TALK_SLUGS_BY_EVENT_QUERY,
  AUTHOR_SLUGS_BY_TALK_QUERY,
} from "@/lib/backend/sanity/queries";

// Constants
const SECRET = process.env.NEXT_SANITY_REVALIDATE_SECRET;

type WebhookPayload = {
  type: string;
  slug?: string;
  lang?: string;
};

export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      SECRET
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    if (!body?.slug || !body?.type) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    const { slug, type } = body;
    const revalidatedPaths: string[] = [];
    const path = buildPath(slug, type);
    revalidatePath(path);
    revalidatedPaths.push(path);

    // Additionally revalidate the index pages when content changes
    if (type === "post") {
      revalidatePath("/blog");
      revalidatedPaths.push("/blog");
    } else if (type === "event") {
      revalidatePath("/events");
      revalidatedPaths.push("/events");

      // Revalidate all talks associated with this event
      try {
        const normalizedSlug = slug.replace(/^\/?events\//, "").replace(/^\//, "");
        const eventData = await sanityFetch<{ talkSlugs?: string[] }>(
          TALK_SLUGS_BY_EVENT_QUERY,
          { slugs: [normalizedSlug, `events/${normalizedSlug}`, `/events/${normalizedSlug}`] }
        );

        if (eventData?.talkSlugs) {
          for (const talkSlug of eventData.talkSlugs) {
            const talkPath = buildPath(talkSlug, "talk");
            revalidatePath(talkPath);
            revalidatedPaths.push(talkPath);
          }
        }
      } catch (error) {
        console.error("Error revalidating talks for event:", error);
      }
    } else if (type === "talk") {
      revalidatePath("/talks");
      revalidatedPaths.push("/talks");

      // Revalidate all authors (speakers) associated with this talk
      try {
        const normalizedSlug = slug.replace(/^\/?talks\//, "").replace(/^\//, "");
        const talkData = await sanityFetch<{ authorSlugs?: string[] }>(
          AUTHOR_SLUGS_BY_TALK_QUERY,
          { slugs: [normalizedSlug, `talks/${normalizedSlug}`, `/talks/${normalizedSlug}`] }
        );

        if (talkData?.authorSlugs) {
          for (const authorSlug of talkData.authorSlugs) {
            const authorPath = buildPath(authorSlug, "author");
            revalidatePath(authorPath);
            revalidatedPaths.push(authorPath);
          }
        }
      } catch (error) {
        console.error("Error revalidating authors for talk:", error);
      }
    } else if (type === "author") {
      revalidatePath("/authors");
      revalidatedPaths.push("/authors");
    }

    return NextResponse.json({ paths: revalidatedPaths });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}

export const OPTIONS = async () => {
  return NextResponse.json({});
};
