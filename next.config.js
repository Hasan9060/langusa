/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'graph.facebook.com' },
      { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
      { protocol: 'https', hostname: 'img.freepik.com' },
      { protocol: 'https', hostname: 'randomuser.me' },
      { protocol: 'https', hostname: 'miro.medium.com' },
      { protocol: 'https', hostname: 'comicbook.com' },
      { protocol: 'https', hostname: 'th.bing.com' },
      { protocol: 'https', hostname: 'www.aceshowbiz.com' },
      { protocol: 'https', hostname: '3.bp.blogspot.com' },
      { protocol: 'https', hostname: 'ichef.bbci.co.uk' },
      { protocol: 'https', hostname: 'images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com' },
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'tse1.mm.bing.net' },
      { protocol: 'https', hostname: 'tse2.mm.bing.net' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["*"],
    },
  },
  // Optimize production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  poweredByHeader: false,
};

module.exports = nextConfig;
