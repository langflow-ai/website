import { SerializedBlock } from "next-sanity";

/**
 * Convert body text to plain text for ICS files, preserving links
 * Removes markdown formatting but keeps links in readable format
 */
export function getBodyTextForICS(body: null | string | SerializedBlock[]): string {
  if (!body) return "";
  
  // If it's a string (markdown), convert markdown links to plain text format
  if (typeof body === "string") {
    return convertMarkdownToPlainText(body);
  }
  
  // If it's an array of blocks (Portable Text), extract text and links
  if (Array.isArray(body)) {
    return body
      .map((block: any) => {
        if (!block) return "";
        
        // Handle different block types
        if (block._type === "block" && Array.isArray(block.children)) {
          // Get markDefs for this block (contains link URLs)
          const markDefs = block.markDefs || [];
          const markDefMap = new Map(
            markDefs.map((def: any) => [def._key, def])
          );
          
          return block.children
            .map((child: any) => {
              if (child._type === "span") {
                let text = child.text || "";
                
                // If there are marks (like links, bold, etc.), handle them
                if (child.marks && Array.isArray(child.marks)) {
                  // Check if any mark is a link
                  for (const markKey of child.marks) {
                    const markDef = markDefMap.get(markKey) as any;
                    if (markDef && typeof markDef === "object" && markDef._type === "link" && markDef.href) {
                      const url = markDef.href;
                      // Append URL if it's not already in the text
                      if (!text.includes(url)) {
                        text = `${text} (${url})`;
                      }
                      break; // Only add URL once
                    }
                  }
                  // Other marks (bold, italic, etc.) are just ignored - text stays
                }
                
                return text;
              }
              return "";
            })
            .join("");
        }
        
        // Handle other block types (like code blocks, etc.)
        if (block._type === "code" && block.code) {
          return block.code;
        }
        
        return "";
      })
      .filter(Boolean)
      .join("\n\n");
  }
  
  return "";
}

/**
 * Convert markdown string to plain text, preserving links
 */
function convertMarkdownToPlainText(markdown: string): string {
  let text = markdown;

  // Extract href from HTML anchor tags and button tags before removing them
  // Convert <a href="url">text</a> to "text (url)"
  text = text.replace(/<a\s+[^>]*href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi, (match, url, linkText) => {
    return linkText ? `${linkText} (${url})` : url;
  });

  // Convert <button href="url">text</button> to "text (url)"
  text = text.replace(/<button\s+[^>]*href=["']([^"']+)["'][^>]*>([^<]*)<\/button>/gi, (match, url, linkText) => {
    return linkText ? `${linkText} (${url})` : url;
  });

  // Convert markdown links [text](url) to "text (url)"
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, linkText, url) => {
    return `${linkText} (${url})`;
  });

  // Remove all other HTML tags (including <br>, <br/>, etc.)
  // Replace <br> and <br/> with newlines first
  text = text.replace(/<br\s*\/?>/gi, "\n");

  // Remove all remaining HTML tags
  text = text.replace(/<[^>]+>/g, "");

  // Remove markdown formatting but keep the text
  // Remove bold **text** or __text__
  text = text.replace(/\*\*([^*]+)\*\*/g, "$1");
  text = text.replace(/__([^_]+)__/g, "$1");

  // Remove italic *text* or _text_ (but be careful not to break links we just converted)
  text = text.replace(/(?<!\()\*([^*]+)\*(?!\))/g, "$1");
  text = text.replace(/(?<!\()_([^_]+)_(?!\))/g, "$1");

  // Remove code blocks ```code```
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove inline code `code`
  text = text.replace(/`([^`]+)`/g, "$1");

  // Remove headers # ## ###
  text = text.replace(/^#{1,6}\s+(.+)$/gm, "$1");

  // Remove list markers - * - etc.
  text = text.replace(/^[\*\-\+]\s+/gm, "");
  text = text.replace(/^\d+\.\s+/gm, "");

  // Remove blockquotes >
  text = text.replace(/^>\s+/gm, "");

  // Clean up multiple newlines
  text = text.replace(/\n{3,}/g, "\n\n");

  // Trim whitespace
  text = text.trim();

  return text;
}

