/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["*", "ayushayurved.com", "images.news18.com", "thumbs.dreamstime.com", "omstars.com", "shwetyoga.in", "cdn1.vectorstock.com", "images.bhaskarassets.com", "pocketyoga.com", "t3.ftcdn.net", "preview.free3d.com","localhost", "lh3.googleusercontent.com", "www.vinyasayogaashram.com", "www.shutterstock.com", "static.vecteezy.com", "images.unsplash.com", "tintyoga.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
