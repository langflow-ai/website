import ReactMarkdown from "react-markdown";
import clsx from "clsx";
import remarkGfm from "remark-gfm";
import { remarkYouTube } from "@/lib/utils/remarkYouTube";
import rehypeRaw from "rehype-raw";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import python from "highlight.js/lib/languages/python";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github-dark-dimmed.css"; // theme
import rehypeHighlight from "rehype-highlight";

import { YouTubeEmbed } from "./YouTubeEmbed";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkYouTube]}
      components={{
        table: ({ node, ...props }) => {
          return <table className="table">{props.children}</table>;
        },
        th: ({ node, ...props }) => {
          return <th className="table-dark">{props.children}</th>;
        },
        td: ({ node, ...props }) => {
          return <td className="table-dark">{props.children}</td>;
        },
        code: ({ node, ...props }) => {
          return (
            <pre
              style={{
                fontSize: "1rem",
              }}
              className={clsx(
                !props.children!.toString().includes("\n")
                  ? "d-inline p-1"
                  : "p-4",
                "border border-dark text-white rounded-2"
              )}
            >
              <code className="">{props.children}</code>
            </pre>
          );
        },
        img: ({ src, node, ...props }) => {
          return (
            <figure className="my-4 d-flex flex-column align-items-center">
              <img
                src={src}
                alt={props.alt ?? ""}
                className="w-100 h-auto rounded-2 my-4"
              />
              <figcaption
                className="text-secondary"
                style={{ fontSize: "0.9rem" }}
              >
                {props.alt}
              </figcaption>
            </figure>
          );
        },
        // Handle YouTube embeds as divs with data attributes
        div: ({ node, ...props }: any) => {
          // Check if this div has a data-youtube-embed attribute
          if (props["data-youtube-embed"]) {
            return <YouTubeEmbed url={props["data-youtube-embed"] as string} />;
          }
          return <div {...props}>{props.children}</div>;
        },
      }}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {children}
    </ReactMarkdown>
  );
};
