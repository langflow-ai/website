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
import { remarkPostEmbed } from "@/lib/utils/remarkPostEmbed";
import { remarkSequel } from "@/lib/utils/remarkSequel";

import Button, { ButtonTypes } from "@/components/ui/button";
import Link from "@/components/ui/Link";

import { YouTubeEmbed } from "./YouTubeEmbed";
import { PostEmbed } from "./PostEmbed";
import { SequelEmbed } from "./SequelEmbed";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);

export const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkYouTube, remarkPostEmbed, remarkSequel]}
      components={{
        a: ({ node, ...props }) => {
          if (!props.href) return <span>{props.children}</span>;

          return <Link href={props.href}>{props.children}</Link>;
        },
        button: ({ node, ...props }) => {
          const { href, variant } = props as any;
          const variantType: keyof typeof ButtonTypes = variant;
          const variantName = ButtonTypes[variantType || "FILLED"];

          return (
            <Button
              variant={variantName}
              href={href}
              style={{ display: "inline-block" }}
            >
              {props.children}
            </Button>
          );
        },
        table: ({ node, ...props }) => {
          return <table className="table">{props.children}</table>;
        },
        th: ({ node, ...props }) => (
          <th {...props} className={clsx("table-dark", props.className)} />
        ),
        td: ({ node, ...props }) => (
          <td
            {...props}
            style={{ verticalAlign: "middle", ...props.style }}
            className={clsx("table-dark", props.className)}
          />
        ),
        code: ({ node, ...props }) => {
          return (
            <pre
              style={{
                fontSize: "inherit",
                maxWidth: "calc(100vw - 4rem)",
                verticalAlign: "middle",
              }}
              className={clsx(
                !props.children!.toString().includes("\n")
                  ? "d-inline-block m-0 p-1"
                  : "d-block p-4",
                "border overflow-x-auto text-overflow-ellipsis border-dark text-white rounded-2"
              )}
            >
              <code>
                {typeof props.children === "string"
                  ? props.children.replaceAll("\\```", "```")
                  : props.children}
              </code>
            </pre>
          );
        },
        img: ({ src, node, ...props }) => {
          return (
            <figure className="my-4 d-flex flex-column align-items-center">
              <img
                src={src}
                alt={props.alt ?? ""}
                className="max-w-100 h-auto rounded-2 my-4 mx-auto"
              />
              <figcaption
                className="text-center text-secondary"
                style={{ fontSize: "0.9rem" }}
              >
                {props.alt}
              </figcaption>
            </figure>
          );
        },
        // Handle YouTube embeds as divs with data attributes
        div: ({ node, ...props }) => {
          // Handle YouTube embeds
          if ("data-youtube-embed" in props) {
            return <YouTubeEmbed url={props["data-youtube-embed"] as string} />;
          }
          // Handle Sanity post embeds
          if ("data-post-embed" in props) {
            return <PostEmbed slug={props["data-post-embed"] as string} />;
          }
          if ("data-sequel-embed" in props) {
            return <SequelEmbed id={props["data-sequel-embed"] as string} />;
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
