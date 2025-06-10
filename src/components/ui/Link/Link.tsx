"use client";

// Dependencies
import BaseLink from "next/link";
import { forwardRef, type ComponentProps, type PropsWithChildren } from "react";

// Hooks
import useDecoratedUrl from "@/hooks/useDecoratedUrl";

// Props types
type Props = PropsWithChildren<
  ComponentProps<typeof BaseLink> & {
    // Any other property goes here
  }
>;

const Link = forwardRef<HTMLAnchorElement, Props>(
  ({ children, href, ...props }, ref): JSX.Element => {
    // Hooks
    const url = useDecoratedUrl(href, /^(utm_)/);

    if (!url) {
      return <>{children}</>;
    }

    return (
      <BaseLink href={url} {...props} ref={ref}>
        {children}
      </BaseLink>
    );
  }
);

Link.displayName = "Link";

export default Link;
