import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    // ✅ This is what makes `babel-plugin-istanbul` actually run
    legacyBabelTransform: true,
  },
};

export default nextConfig;
