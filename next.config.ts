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
};

export default nextConfig;
