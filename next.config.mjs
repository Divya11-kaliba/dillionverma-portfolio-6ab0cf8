/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "pub-83c5db439b40468498f97946200806f7.r2.dev",
      },
    ],
  },
};

export default nextConfig;

