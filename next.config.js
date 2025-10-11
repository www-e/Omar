const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      }
    ],
    formats: ['image/avif', 'image/webp'],
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  experimental: {
    optimizePackageImports: ['@mui/icons-material', 'lucide-react', 'react-icons'],
    serverComponentsExternalPackages: ['sharp'],
  },
  
  // Additional performance optimizations
  swcMinify: true,
  optimizeFonts: true,
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
      skipDefaultConversion: true,
    },
  },
};

module.exports = withBundleAnalyzer(nextConfig); 