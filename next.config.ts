import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: "/experiences",
        destination: "/programe",
        permanent: true,
      },
      {
        source: "/retreats",
        destination: "/programe",
        permanent: true,
      },
      {
        source: "/retreats/busola-interioara",
        destination: "/programe/busola-deciziilor",
        permanent: true,
      },
      {
        source: "/programe/busola-interioara",
        destination: "/programe/busola-deciziilor",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
