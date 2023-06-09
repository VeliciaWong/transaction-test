/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: false,
    swcMinify: true,
    experimental: {
      images: {
        unoptimized: true
      }
    },
  }
  
  module.exports = nextConfig
  