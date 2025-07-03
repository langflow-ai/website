import { visit } from "unist-util-visit";
import type { Root, Text, Html } from "mdast";

export function remarkYouTube() {
  return (tree: Root) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;

      const regex = /\{%youtube\s+([^\s}]+)\s*%\}/g;
      const text = node.value;
      let match;
      const parts = [];
      let lastIndex = 0;

      while ((match = regex.exec(text)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            value: text.slice(lastIndex, match.index),
          } as Text);
        }

        // Add the YouTube component as a div with data attributes
        parts.push({
          type: "html",
          value: `<div data-youtube-embed="${match[1]}"></div>`,
        } as Html);

        lastIndex = match.index + match[0].length;
      }

      // Add remaining text after the last match
      if (lastIndex < text.length) {
        parts.push({
          type: "text",
          value: text.slice(lastIndex),
        } as Text);
      }

      // If we found matches, replace the node
      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
      }
    });
  };
}
