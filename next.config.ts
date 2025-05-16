/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Or any other existing Next.js configurations you have
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**", // Allows any path under this hostname
      },
      // You can add other domains here if needed
      // {
      //   protocol: 'https',
      //   hostname: 'another-domain.com',
      // },
    ],
  },
  // ... any other configurations
};

module.exports = nextConfig;
