// Dependencies
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Backend
import { sanityFetch } from "@/lib/backend/sanity/client";

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

    if (!body?.slug) {
      const message = "Bad Request";
      return new Response(JSON.stringify({ message, body }), { status: 400 });
    }

    const { slug } = body;
    await revalidatePath(slug);
    return NextResponse.json({ slug });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}

export const OPTIONS = async () => {
  return NextResponse.json({});
};
