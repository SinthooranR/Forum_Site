/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL_DEV: process.env.NEXT_PUBLIC_API_URL_DEV,
    API_URL_PROD: process.env.NEXT_PUBLIC_API_URL_PROD,
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value:
              process.env.NODE_ENV === "development"
                ? "*"
                : process.env.NEXT_PUBLIC_API_URL_PROD,
          },
          { key: "Access-Control-Allow-Headers", value: "*" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
