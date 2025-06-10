"use client";

import { useEffect, useMemo, useState } from "react";
import urlFormatter, { type UrlObject } from "url";

const __getQueryParams = (regex?: RegExp): URLSearchParams => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = new URLSearchParams();

  Object.keys(Object.fromEntries(searchParams.entries()))
    .filter((key) => (regex ? key.toLowerCase().match(regex) : true))
    .forEach((key) => {
      const value = searchParams.get(key);
      if (value || value === "") {
        params.append(key, value);
      }
    });

  return params;
};

const __decorateUrl = (url: string, params: URLSearchParams): URL => {
  const base = new URL(url, window.location.origin);
  const currentParams = new URLSearchParams(base.searchParams.toString());

  Object.keys(Object.fromEntries(params.entries()))
    .filter((key) => !currentParams.has(key))
    .forEach((key) => {
      const value = params.get(key);

      if (value) {
        base.searchParams.append(key, value);
      }
    });

  return base;
};

const useDecoratedUrl = (href: string | UrlObject, regex: RegExp): string => {
  const [decoratedUrl, setDecoratedUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState<boolean>(false);

  const url = useMemo(() => {
    const url =
      typeof href === "object" ? urlFormatter.format(href)?.trim() : href;

    if (isClient) {
      const queryParams = __getQueryParams();
      const decorated = __decorateUrl(url, queryParams);

      return decorated.toString();
    }

    return url;
  }, [href, isClient]);

  useEffect(() => {
    if (window) {
      setIsClient(true);
    }

    return () => {
      setIsClient(false);
    };
  }, []);

  return decoratedUrl || url;
};

export default useDecoratedUrl;
