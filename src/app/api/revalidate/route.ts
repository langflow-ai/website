// Dependencies
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Backend
import { buildPath } from "@/lib/backend/sanity/utils";

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
    const path = buildPath(slug, type);
    await revalidatePath(path);
    return NextResponse.json({ path });
  } catch (err: any) {
    console.error(err);
    return new Response(err.message, { status: 500 });
  }
}

export const OPTIONS = async () => {
  return NextResponse.json({});
};
