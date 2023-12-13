/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL_DEV: process.env.NEXT_PUBLIC_API_URL_DEV,
    API_URL_PROD: process.env.NEXT_PUBLIC_API_URL_PROD,
  },
};

module.exports = nextConfig;
