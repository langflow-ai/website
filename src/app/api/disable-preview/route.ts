// Dependencies
import { NextResponse } from "next/server";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Handle Preview mode feature disable
 *
 * @param {Request} request
 * @return {Response}
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.has("slug")
    ? searchParams.get("slug")?.replace(/^\//, "")
    : "/";
  // Disable draft mode
  draftMode().disable();

  // Redirect to the current preview page
  redirect(`/${slug}`);
}

export const OPTIONS = async () => {
  return NextResponse.json({});
};
