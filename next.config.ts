import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Pin the HTML document to always revalidate, so a browser can never keep
  // reusing a document from an older deployment whose hashed /_next/static
  // chunks have since been removed.
  //
  // Scoped to "/" deliberately: hashed assets already get
  // "public, max-age=31536000, immutable" from Next.js/Vercel, and Next.js
  // warns against overriding Cache-Control on /_next/static. A catch-all rule
  // here would match those assets too and clobber that header.
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
