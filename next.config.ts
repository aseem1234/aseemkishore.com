import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/projects/positiontracker",
        destination: "/projects/position-tracker",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // Apple fetches this extensionless path and requires application/json.
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "public, max-age=3600" },
        ],
      },
    ];
  },
};

export default nextConfig;
