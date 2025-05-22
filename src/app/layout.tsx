// Dependencies
import type { Metadata } from "next";

// Styles
import "@/styles/index.scss";

export const generateMetadata = (): Metadata => {
  return {
    title: "",
    description: "",
    icons: {
      icon: "/favicon.ico",
    },
  };
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="layout layout-dark">{children}</main>
      </body>
    </html>
  );
}
