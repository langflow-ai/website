import { NextResponse } from "next/server";
import { sanityFetch } from "@/lib/backend/sanity/client";
import { BlogPost } from "@/lib/types/sanity.types";
import OpenAI from "openai";
import { BLOG_POSTS_QUERY } from "@/lib/backend/sanity/queries";
import { getBodyText } from "@/lib/utils/getBodyText";
import { searchPosts } from "@/lib/utils/searchPosts";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    // Fetch all posts (we'll score client-side)
    const allPosts = await sanityFetch<BlogPost[]>(BLOG_POSTS_QUERY, {}, false);

    const topPosts = searchPosts(allPosts, question, 3);

    const contextText = topPosts
      .map((p) => {
        const bodyText = getBodyText(p.body);
        const excerpt = p.excerpt ?? bodyText.slice(0, 400);
        return `Title: ${p.title}\nExcerpt: ${excerpt}`;
      })
      .join("\n---\n");

    // If no relevant posts, fall back gracefully
    const posts = topPosts;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant answering questions about Langflow and its blog content. Use the provided context to answer the user's question. If the context is insufficient, reply that you don't know and encourage searching instead.",
        },
        {
          role: "user",
          content: `Context:\n${contextText}\n\nQuestion: ${question}`,
        },
      ],
      stream: true,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller: ReadableStreamDefaultController) {
        for await (const chunk of completion) {
          const token = chunk.choices[0]?.delta?.content || "";
          controller.enqueue(encoder.encode(token));
        }

        // After streaming tokens, send sentinel with references JSON
        const referencedPosts = posts.map((p) => ({
          _id: p._id,
          title: p.title,
          slug: p.slug?.current,
        }));

        const payload = `###REFS###${JSON.stringify(referencedPosts)}`;
        controller.enqueue(encoder.encode(payload));
        controller.close();
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error: any) {
    console.error("/api/ask error", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
