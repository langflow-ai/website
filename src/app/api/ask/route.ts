import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/mdx";
import OpenAI from "openai";
import { searchPosts } from "@/lib/utils/searchPosts";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function POST(request: Request) {
  try {
    const { question } = await request.json();

    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    if (!openai) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 503 }
      );
    }

    // Fetch all posts from MDX
    const allPosts = await getAllPosts();

    const topPosts = searchPosts(allPosts, question, 3);

    const contextText = topPosts
      .map((p) => {
        const excerpt = p.excerpt ?? "";
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
            "You are a helpful assistant answering questions about Langflow and its blog content. Use the provided context to answer the user's question. If the context is insufficient, reply that you don't know and encourage searching instead. DO NOT respond in Markdown, but instead just regular plain text.",
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
          id: p.slug,
          title: p.title,
          slug: p.slug,
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
