import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ['./src/styles'],
    prependData: `@use "sass:math";`,
  },
};

export default nextConfig;
