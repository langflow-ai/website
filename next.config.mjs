import { withSentryConfig } from "@sentry/nextjs";
/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  // Basic image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year
  },
  // Compression
  compress: true,
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

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "langflow-e2",
  project: "website",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
