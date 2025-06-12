import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/docs",
        destination: "https://docs.langflow.org",
        permanent: false,
      },
      {
        source: "/blog",
        destination: "https://blog.langflow.org",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
