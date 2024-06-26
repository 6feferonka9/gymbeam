/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gymbeam.sk',
        port: '',
        pathname: '/media/**',
      },
    ],
  },
}

export default nextConfig;
