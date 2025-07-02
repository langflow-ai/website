import OpenAI from "openai";

export const generateBlogExcerpt = async (
  postBody: {
    _id: string;
    _type: string;
    children: {
      _type: string;
      text: string;
    }[];
  }[]
) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const text = postBody.reduce((acc: string, curr) => {
    if (curr._type === "block") {
      return (
        acc +
        curr.children.reduce((acc: string, curr) => {
          return acc + curr.text;
        }, "")
      );
    }
    return acc;
  }, "");

  const response = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      {
        role: "system",
        content: `You just generate excerpts from blog posts. NO EXTRA TEXT.`,
      },
      {
        role: "user",
        content: `Generate a short excerpt from the following text: ${text.slice(0, 1000)}`,
      },
    ],
  });

  const excerpt = response.choices[0].message.content;
  return excerpt;
};
