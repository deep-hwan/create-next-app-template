/** @type {import('next').NextConfig} */

// PWA
const prod = process.env.NODE_ENV === 'production';
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [/middleware-manifest\.json$/],
});

// Bundle Analyzer
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  devIndicators: false,
  // output: 'export',
  // images: { unoptimized: true },

  onRecoverableError: (error, errorInfo) => {
    console.warn('Recoverable error:', error, errorInfo);
  },

  images: {
    // unoptimized: false,
    domains: ['imagedelivery.net', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [428, 600, 768, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

  async headers() {
    return [
      {
        // Matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  experimental: {
    scrollRestoration: false,
  },

  compiler: {
    emotion: true,
  },
};

// Combine withBundleAnalyzer and withPWA
module.exports = withBundleAnalyzer(withPWA(nextConfig));
