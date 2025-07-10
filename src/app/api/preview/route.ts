// Dependencies
import { NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Backend
import { sanityFetch } from "@/lib/backend/sanity/client";

// Queries
import { VALIDATE_DOCUMENT_BY_SLUG_QUERY } from "@/lib/backend/sanity/queries";
import { buildPath } from "@/lib/backend/sanity/utils";

// Constants
const SECRET = process.env.NEXT_SANITY_PREVIEW_SECRET;

/**
 * Handle Preview mode feature to enable the usage of preview features
 *
 * @param {Request} request
 * @return {Response}
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");
  const type = searchParams.get("type");

  if (secret !== SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  if (!slug || !type) {
    return new Response("Invalid payload", { status: 401 });
  }

  const _slug = slug?.replace(/^\//, "");
  const document = await sanityFetch<number | null>(
    VALIDATE_DOCUMENT_BY_SLUG_QUERY,
    {
      slugs: [_slug, `/${_slug}`],
    },
    true
  );

  if (!document) {
    return new Response("Could not find the document", { status: 401 });
  }

  // Enable draft mode
  draftMode().enable();

  // Redirect to the current preview page
  const path = buildPath(slug, type);
  redirect(path);
}

export const OPTIONS = async () => {
  return NextResponse.json({});
};
