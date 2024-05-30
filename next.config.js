
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true
    },
    images: {
        domains: ["res.cloudinary.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            }
        ]
    },
    // images: {
    //     domains: ["res.cloudinary.com"]
    // },
};

module.exports = nextConfig