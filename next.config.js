/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'avatars.dicebear.com',
      'firebasestorage.googleapis.com',
      'ik.imagekit.io',
    ],
  },
};

module.exports = nextConfig;
