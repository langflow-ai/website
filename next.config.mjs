/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  redirects: async () => {
    return [
      {
        source: "/discord",
        destination: "https://discord.com/invite/EqksyE2EX9",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/langflow-ai/langflow",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: "https://x.com/langflow_ai",
        permanent: false,
      },
      {
        source: "/youtube",
        destination: "https://www.youtube.com/@langflow",
        permanent: false,
      },
      {
        source: "/x",
        destination: "https://x.com/langflow_ai",
        permanent: false,
      },
      {
        source: "/docs",
        destination: "https://docs.langflow.org",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
