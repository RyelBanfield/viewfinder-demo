/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'lh3.googleusercontent.com',
      'avatars.dicebear.com',
      'firebasestorage.googleapis.com',
      'ik.imagekit.io',
    ],
  },
};

export default nextConfig;