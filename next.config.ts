import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: `@use "sass:math";`,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

export default nextConfig;
