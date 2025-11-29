/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allows all HTTPS hosts
      },
      {
        protocol: "http",
        hostname: "**", // allows all HTTP hosts (optional)
      },
    ],
  },
};

export default nextConfig;
