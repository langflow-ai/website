import { SerializedBlock } from "next-sanity";

export function getBodyText(body: null | string | SerializedBlock[]): string {
  if (!body) return "";
  if (typeof body === "string") return body;
  if (Array.isArray(body)) {
    return body
      .map((block) => {
        if (block && Array.isArray(block.children)) {
          return block.children.map((child) => child.text).join(" ");
        }
        return "";
      })
      .join(" ");
  }
  return "";
}
