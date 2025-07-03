export function getBodyText(body: any): string {
  if (!body) return "";
  if (typeof body === "string") return body;
  if (Array.isArray(body)) {
    return body
      .map((block) => {
        if (block && Array.isArray(block.children)) {
          return block.children.map((child: any) => child.text).join(" ");
        }
        return "";
      })
      .join(" ");
  }
  return "";
}
