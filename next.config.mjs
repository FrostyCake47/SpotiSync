/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    /*images: {
        domains: ["i.scdn.co", "image-cdn-ak.spotifycdn.com", "mosaic.scdn.co"],
    },*/
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
    },
};

export default nextConfig;
