const PREFIXES: Record<string, string | null> = {
  page: null,
  event: "events/",
  post: "blog/",
  talk: "talks/",
  author: "authors/",
};

// Helper function to generate the correct path based on slug & page type
export const buildPath = (slug: string, type: string) => {
  const prefix = PREFIXES[type];
  let path = slug.replace(/^\//, "");

  if (prefix) {
    path = `${prefix.replace(/\/$/, "")}/${path.replace(prefix, "")}`; // ensure the prefix is valid
  }

  // Ensure the path includes the initial slash
  return `/${path}`;
};
