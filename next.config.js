/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    domains: ['lh3.googleusercontent.com', 'graph.facebook.com', 'platform-lookaside.fbsbx.com'],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"],
    },
  },
};

module.exports = nextConfig;
