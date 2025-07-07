import { visit } from "unist-util-visit";
import type { Root, Text, Html, Link } from "mdast";

// remark plugin that converts the syntax @[](slug) into a div placeholder
// The resulting HTML will be: <div data-post-embed="slug"></div>
export function remarkPostEmbed() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      // Regex to match @[](some-slug)
      const regex = /@\[\]\(([^)]+)\)/g;
      const text = node.value;
      let match;
      const parts: (Text | Html)[] = [];
      let lastIndex = 0;

      while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          } as Text);
        }

        // The slug captured inside parentheses
        const slug = match[1].trim();

        // Add the placeholder div that React will convert later
        parts.push({
          type: "html",
          value: `<div data-post-embed="${slug}"></div>`,
        } as Html);

        lastIndex = match.index + match[0].length;
      }

      // Add any remaining text after last match
      if (lastIndex < text.length) {
        parts.push({
          type: "text",
          value: text.slice(lastIndex),
        } as Text);
      }

      // If any matches were found, replace the node with the new parts
      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
      }
    });

    visit(tree, "link", (node: Link, index, parent) => {
      if (!parent || index === undefined) return;

      // Expect pattern: Text node ending with "@" immediately before this link
      const prev = parent.children[index - 1];
      if (!prev || prev.type !== "text") return;

      const prevText = (prev as Text).value;
      if (!prevText.endsWith("@")) return;

      // Remove trailing "@" from previous text node
      const updatedPrevText = prevText.slice(0, -1);
      if (updatedPrevText.length > 0) {
        // Keep the previous text node but update its value
        (prev as Text).value = updatedPrevText;
      } else {
        // Remove the previous text node entirely if empty
        parent.children.splice(index - 1, 1);
        // Adjust current index because we removed one element before it
        index -= 1;
      }

      // Build replacement html node for the embed
      const slug = (node.url || "").trim();
      const htmlNode: Html = {
        type: "html",
        value: `<div data-post-embed="${slug}"></div>`,
      };

      // Replace the link node with our html node
      parent.children.splice(index, 1, htmlNode);
    });
  };
}
