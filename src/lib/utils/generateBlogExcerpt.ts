import OpenAI from "openai";

export const generateBlogExcerpt = async (
  postBody: string
) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      {
        role: "system",
        content: `You just generate excerpts from blog posts. NO EXTRA TEXT.`,
      },
      {
        role: "user",
        content: `Generate a short excerpt from the following text: ${postBody.slice(0, 1000)}`,
      },
    ],
  });

  const excerpt = response.choices[0].message.content;
  return excerpt;
};
