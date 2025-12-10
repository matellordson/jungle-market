/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // This is the key change:
    serverComponentsExternalPackages: [
      "@walletconnect/universal-provider", // Add this if you use WalletConnect
      "@walletconnect/ethereum-provider", // Add this if you use WalletConnect
      "thread-stream", // Add thread-stream
      "pino", // Add pino
      // ... potentially other packages exhibiting this issue
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
